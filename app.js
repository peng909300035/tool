(() => {
  "use strict";

  const MODEL_DIR = "/vendor/mediapipe/";
  const MODEL_SCRIPT = `${MODEL_DIR}selfie_segmentation.js`;
  const MAX_SIDE = 1024;

  const uploadInput = document.getElementById("imageUpload");
  const dropZone = document.getElementById("dropZone");
  const segmentBtn = document.getElementById("segmentBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const clearBtn = document.getElementById("clearBtn");
  const backgroundMode = document.getElementById("backgroundMode");
  const backgroundColor = document.getElementById("backgroundColor");
  const accuracyMode = document.getElementById("accuracyMode");
  const statusEl = document.getElementById("status");
  const loader = document.getElementById("loader");
  const sourceCanvas = document.getElementById("sourceCanvas");
  const resultCanvas = document.getElementById("resultCanvas");

  if (!uploadInput || !sourceCanvas || !resultCanvas) return;

  let originalImage = null;
  let objectUrl = null;
  let segmenter = null;
  let segmenterPromise = null;
  let resultReady = false;
  let currentFileName = "background-removed.png";

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
  }

  function setLoading(isLoading) {
    if (loader) loader.hidden = !isLoading;
    if (segmentBtn) segmentBtn.disabled = isLoading || !originalImage;
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Model script failed to load")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", () => reject(new Error("Model script failed to load")), { once: true });
      document.head.appendChild(script);
    });
  }

  async function getSegmenter() {
    if (segmenter) return segmenter;
    if (segmenterPromise) return segmenterPromise;

    segmenterPromise = (async () => {
      setLoading(true);
      setStatus("Loading local segmentation model…");
      await loadScriptOnce(MODEL_SCRIPT);

      const SelfieSegmentation = window.SelfieSegmentation;
      if (!SelfieSegmentation) throw new Error("Segmentation model is unavailable");

      segmenter = new SelfieSegmentation({
        locateFile: (file) => `${MODEL_DIR}${file}`,
      });

      segmenter.onResults(renderResult);
      return segmenter;
    })();

    try {
      return await segmenterPromise;
    } finally {
      segmenterPromise = null;
    }
  }

  function configureSegmenter() {
    if (!segmenter) return;
    const modelSelection = accuracyMode && accuracyMode.value === "fast" ? 1 : 0;
    segmenter.setOptions({ modelSelection });
  }

  function renderResult(results) {
    const width = resultCanvas.width;
    const height = resultCanvas.height;
    if (!width || !height) return;

    const ctx = resultCanvas.getContext("2d", { willReadFrequently: true });
    const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
    const sourceData = sourceCtx.getImageData(0, 0, width, height);
    const resultData = ctx.createImageData(width, height);

    if (results.segmentationMask) {
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      maskCtx.drawImage(results.segmentationMask, 0, 0, width, height);
      const maskData = maskCtx.getImageData(0, 0, width, height);

      for (let i = 0; i < sourceData.data.length; i += 4) {
        resultData.data[i] = sourceData.data[i];
        resultData.data[i + 1] = sourceData.data[i + 1];
        resultData.data[i + 2] = sourceData.data[i + 2];

        const maskValue = maskData.data[i];
        if (accuracyMode && accuracyMode.value === "fast") {
          resultData.data[i + 3] = maskValue > 128 ? 255 : 0;
        } else {
          resultData.data[i + 3] = Math.round((maskValue / 255) * 255);
        }
      }
      ctx.putImageData(resultData, 0, 0);
    } else {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(sourceCanvas, 0, 0, width, height);
    }

    if (backgroundMode && backgroundMode.value === "solid") {
      const color = backgroundColor ? backgroundColor.value : "#2563eb";
      const flatCanvas = document.createElement("canvas");
      flatCanvas.width = width;
      flatCanvas.height = height;
      const flatCtx = flatCanvas.getContext("2d");
      flatCtx.fillStyle = color;
      flatCtx.fillRect(0, 0, width, height);
      flatCtx.drawImage(resultCanvas, 0, 0, width, height);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(flatCanvas, 0, 0);
    }

    resultReady = true;
    if (downloadBtn) downloadBtn.disabled = false;
    setStatus("Done. Your cutout is ready to download.");
    setLoading(false);
  }

  function resetResult() {
    resultReady = false;
    if (downloadBtn) downloadBtn.disabled = true;
    resultCanvas.getContext("2d").clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  }

  function displayImage(file) {
    if (!file || !file.type.startsWith("image/")) {
      setStatus("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    currentFileName = `${file.name.replace(/\.[^.]+$/, "")}-cutout.png`;

    const img = new Image();
    img.onload = () => {
      originalImage = img;
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      sourceCanvas.width = width;
      sourceCanvas.height = height;
      resultCanvas.width = width;
      resultCanvas.height = height;

      sourceCanvas.getContext("2d").drawImage(img, 0, 0, width, height);
      resetResult();
      if (segmentBtn) segmentBtn.disabled = false;
      setStatus("Image loaded locally. Ready to remove the background.");
    };
    img.onerror = () => {
      setStatus("That file could not be read. Please try another image.");
    };
    img.src = objectUrl;
  }

  if (uploadInput) {
    uploadInput.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) displayImage(file);
      event.target.value = "";
    });
  }

  if (dropZone) {
    dropZone.addEventListener("click", () => uploadInput && uploadInput.click());
    dropZone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (uploadInput) uploadInput.click();
      }
    });
    ["dragenter", "dragover"].forEach((type) => {
      dropZone.addEventListener(type, (event) => {
        event.preventDefault();
        dropZone.classList.add("is-dragging");
      });
    });
    ["dragleave", "drop"].forEach((type) => {
      dropZone.addEventListener(type, (event) => {
        event.preventDefault();
        dropZone.classList.remove("is-dragging");
      });
    });
    dropZone.addEventListener("drop", (event) => {
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) displayImage(file);
    });
  }

  document.addEventListener("paste", (event) => {
    const items = event.clipboardData && event.clipboardData.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          displayImage(file);
          break;
        }
      }
    }
  });

  if (segmentBtn) {
    segmentBtn.addEventListener("click", async () => {
      if (!originalImage) {
        setStatus("Choose a portrait first.");
        return;
      }

      setLoading(true);
      resultReady = false;
      if (downloadBtn) downloadBtn.disabled = true;
      setStatus("Preparing local model…");

      try {
        const model = await getSegmenter();
        configureSegmenter();
        setStatus("Processing in your browser…");
        await model.send({ image: sourceCanvas });
      } catch (error) {
        setLoading(false);
        setStatus(`Processing failed: ${error.message || "Please try another image."}`);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (!resultReady) return;
      const link = document.createElement("a");
      link.download = currentFileName;
      link.href = resultCanvas.toDataURL("image/png");
      link.click();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = null;
      originalImage = null;
      resultReady = false;
      if (uploadInput) uploadInput.value = "";
      if (segmentBtn) segmentBtn.disabled = true;
      if (downloadBtn) downloadBtn.disabled = true;
      sourceCanvas.getContext("2d").clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
      resultCanvas.getContext("2d").clearRect(0, 0, resultCanvas.width, resultCanvas.height);
      setStatus("Cleared. Choose a portrait to start.");
    });
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    });
  }
})();
