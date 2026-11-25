(() => {
  "use strict";

  const VENDOR_DIR = "/vendor/tasks-vision/";
  const BUNDLE_URL = `${VENDOR_DIR}vision_bundle.mjs`;
  const WASM_DIR = `${VENDOR_DIR}wasm`;
  const MODEL_URL = `${VENDOR_DIR}selfie_segmenter.tflite`;
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

  async function getSegmenter() {
    if (segmenter) return segmenter;
    if (segmenterPromise) return segmenterPromise;

    segmenterPromise = (async () => {
      setLoading(true);
      setStatus("Loading local segmentation model…");

      const module = await import(/* @vite-ignore */ BUNDLE_URL);
      const FilesetResolver = module.FilesetResolver;
      const ImageSegmenter = module.ImageSegmenter;
      if (!FilesetResolver || !ImageSegmenter) {
        throw new Error("Segmentation model is unavailable");
      }

      const vision = await FilesetResolver.forVisionTasks(WASM_DIR);
      const options = {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "GPU",
        },
        runningMode: "IMAGE",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      };

      try {
        segmenter = await ImageSegmenter.createFromOptions(vision, options);
      } catch (gpuError) {
        options.baseOptions.delegate = "CPU";
        segmenter = await ImageSegmenter.createFromOptions(vision, options);
      }

      return segmenter;
    })();

    try {
      return await segmenterPromise;
    } catch (error) {
      segmenterPromise = null;
      throw error;
    } finally {
      segmenterPromise = null;
    }
  }

  function renderResult(mask) {
    const width = resultCanvas.width;
    const height = resultCanvas.height;
    if (!width || !height) return;

    const ctx = resultCanvas.getContext("2d", { willReadFrequently: true });
    const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
    const sourceData = sourceCtx.getImageData(0, 0, width, height);
    const resultData = ctx.createImageData(width, height);

    if (mask) {
      const maskWidth = mask.width;
      const maskHeight = mask.height;
      const maskData = mask.getAsUint8Array();

      for (let y = 0; y < height; y += 1) {
        const my = Math.min(maskHeight - 1, Math.floor((y / height) * maskHeight));
        for (let x = 0; x < width; x += 1) {
          const mx = Math.min(maskWidth - 1, Math.floor((x / width) * maskWidth));
          const srcIndex = (y * width + x) * 4;
          const maskValue = maskData[my * maskWidth + mx];

          resultData.data[srcIndex] = sourceData.data[srcIndex];
          resultData.data[srcIndex + 1] = sourceData.data[srcIndex + 1];
          resultData.data[srcIndex + 2] = sourceData.data[srcIndex + 2];
          resultData.data[srcIndex + 3] = maskValue > 0 ? 255 : 0;
        }
      }
      ctx.putImageData(resultData, 0, 0);
      mask.close();
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
        setStatus("Processing in your browser…");
        model.segment(sourceCanvas, (result) => {
          const mask = result.categoryMask;
          if (mask) {
            renderResult(mask);
          } else {
            setLoading(false);
            setStatus("No subject mask was produced. Try a clearer portrait.");
          }
        });
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
