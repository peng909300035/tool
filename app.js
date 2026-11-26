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
  const invertToggle = document.getElementById("invertMask");
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
        outputConfidenceMasks: true,
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

  function softmax(value, low, high) {
    if (value <= low) return 0;
    if (value >= high) return 1;
    return (value - low) / (high - low);
  }

  function buildPersonAlpha(result, width, height) {
    const closeFns = [];
    let maskWidth = 0;
    let maskHeight = 0;
    let sample;

    const conf = result && result.confidenceMasks;
    if (conf && conf.length >= 2) {
      const arrays = [];
      for (let i = 0; i < conf.length; i += 1) {
        const image = conf[i];
        const arr = image.getAsFloat32Array();
        arrays.push(arr);
        closeFns.push(() => {
          try { image.close(); } catch (_) { /* noop */ }
        });
      }
      maskWidth = conf[0].width;
      maskHeight = conf[0].height;

      const corners = [
        0,
        maskWidth - 1,
        (maskHeight - 1) * maskWidth,
        maskHeight * maskWidth - 1,
      ];
      let sumFirst = 0;
      let sumSecond = 0;
      for (const index of corners) {
        sumFirst += arrays[0][index] || 0;
        sumSecond += arrays[1][index] || 0;
      }
      const personArray = sumFirst > sumSecond ? arrays[1] : arrays[0];
      sample = (mx, my) => personArray[my * maskWidth + mx] || 0;
    } else if (result && result.categoryMask) {
      const mask = result.categoryMask;
      const data = mask.getAsUint8Array();
      maskWidth = mask.width;
      maskHeight = mask.height;
      closeFns.push(() => {
        try { mask.close(); } catch (_) { /* noop */ }
      });

      const corners = [
        0,
        maskWidth - 1,
        (maskHeight - 1) * maskWidth,
        maskHeight * maskWidth - 1,
      ];
      let bgVotes = 0;
      for (const index of corners) bgVotes += data[index] || 0;
      const backgroundValue = bgVotes > corners.length * 127 ? 1 : 0;
      sample = (mx, my) => (data[my * maskWidth + mx] === backgroundValue ? 0 : 1);
    }

    if (!sample) {
      closeFns.forEach((fn) => fn());
      return null;
    }

    const alpha = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) {
      const my = Math.min(maskHeight - 1, Math.floor((y / height) * maskHeight));
      for (let x = 0; x < width; x += 1) {
        const mx = Math.min(maskWidth - 1, Math.floor((x / width) * maskWidth));
        const probability = sample(mx, my);
        alpha[y * width + x] = Math.round(softmax(probability, 0.28, 0.72) * 255);
      }
    }

    closeFns.forEach((fn) => fn());
    return alpha;
  }

  function renderResult(result) {
    const width = resultCanvas.width;
    const height = resultCanvas.height;
    if (!width || !height) return;

    const ctx = resultCanvas.getContext("2d", { willReadFrequently: true });
    const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
    const sourceData = sourceCtx.getImageData(0, 0, width, height);
    const resultData = ctx.createImageData(width, height);

    const alpha = buildPersonAlpha(result, width, height);
    const invert = invertToggle ? invertToggle.checked : false;

    if (alpha) {
      for (let i = 0; i < alpha.length; i += 1) {
        const srcIndex = i * 4;
        resultData.data[srcIndex] = sourceData.data[srcIndex];
        resultData.data[srcIndex + 1] = sourceData.data[srcIndex + 1];
        resultData.data[srcIndex + 2] = sourceData.data[srcIndex + 2];
        resultData.data[srcIndex + 3] = invert ? 255 - alpha[i] : alpha[i];
      }
    } else {
      resultData.data.set(sourceData.data);
    }
    ctx.putImageData(resultData, 0, 0);

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
          if (result && (result.confidenceMasks || result.categoryMask)) {
            renderResult(result);
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

  if (invertToggle) {
    invertToggle.addEventListener("change", () => {
      if (resultReady && originalImage) {
        setStatus("Mask inverted. Run the tool again to apply, or download the current result.");
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
