(() => {
  "use strict";

  const tool = document.body.dataset.tool;
  if (!tool) return;

  const uploadInput = document.getElementById("imageUpload");
  const dropZone = document.getElementById("dropZone");
  const processBtn = document.getElementById("processBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const clearBtn = document.getElementById("clearBtn");
  const statusEl = document.getElementById("status");
  const sourceCanvas = document.getElementById("sourceCanvas");
  const resultCanvas = document.getElementById("resultCanvas");
  const originalSizeEl = document.getElementById("originalSize");
  const resultSizeEl = document.getElementById("resultSize");
  const savingEl = document.getElementById("saving");

  if (!uploadInput || !sourceCanvas || !resultCanvas) return;

  const FORMATS = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };

  const SUFFIX = {
    compress: "compressed",
    convert: "converted",
    resize: "resized",
    exif: "clean",
  };

  let sourceImage = null;
  let sourceFile = null;
  let objectUrl = null;
  let resultUrl = null;
  let resultExtension = "png";
  let resultReady = false;

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
  }

  function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function valueOf(id, fallback = "") {
    const element = document.getElementById(id);
    return element ? element.value : fallback;
  }

  function numberValue(id, fallback = 0) {
    const parsed = Number.parseInt(valueOf(id, ""), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  }

  function outputSpec() {
    let mime = valueOf("outputFormat", "image/png");
    if (!FORMATS[mime]) mime = "image/png";

    let quality = 0.82;
    const qualityInput = document.getElementById("qualityRange");
    if (qualityInput) quality = Number.parseInt(qualityInput.value, 10) / 100;
    if (!Number.isFinite(quality) || quality <= 0 || quality > 1) quality = 0.82;

    let width = sourceCanvas.width;
    let height = sourceCanvas.height;

    if (tool === "resize") {
      const preset = valueOf("sizePreset", "custom");
      const matched = /^(\d+)x(\d+)$/.exec(preset);
      if (matched) {
        width = Number.parseInt(matched[1], 10);
        height = Number.parseInt(matched[2], 10);
      } else {
        const targetWidth = numberValue("targetWidth", 0);
        const targetHeight = numberValue("targetHeight", 0);
        if (targetWidth && targetHeight) {
          width = targetWidth;
          height = targetHeight;
        } else if (targetWidth) {
          width = targetWidth;
          height = Math.max(1, Math.round((sourceCanvas.height * targetWidth) / sourceCanvas.width));
        } else if (targetHeight) {
          height = targetHeight;
          width = Math.max(1, Math.round((sourceCanvas.width * targetHeight) / sourceCanvas.height));
        } else {
          const scale = Number.parseFloat(valueOf("scalePreset", "1")) || 1;
          width = Math.max(1, Math.round(sourceCanvas.width * scale));
          height = Math.max(1, Math.round(sourceCanvas.height * scale));
        }
      }
    }

    return {
      mime,
      quality: mime === "image/png" ? undefined : quality,
      extension: FORMATS[mime],
      width,
      height,
    };
  }

  function resetResult() {
    resultReady = false;
    if (downloadBtn) downloadBtn.disabled = true;
    if (resultSizeEl) resultSizeEl.textContent = "—";
    if (savingEl) savingEl.textContent = "";
    const ctx = resultCanvas.getContext("2d");
    ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  }

  function displayImage(file) {
    if (!file || !file.type.startsWith("image/")) {
      setStatus("Please choose a PNG, JPG, or WebP image.");
      return;
    }

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    objectUrl = URL.createObjectURL(file);
    resultUrl = null;
    sourceFile = file;

    const img = new Image();
    img.onload = () => {
      sourceImage = img;
      sourceCanvas.width = img.naturalWidth;
      sourceCanvas.height = img.naturalHeight;
      resultCanvas.width = img.naturalWidth;
      resultCanvas.height = img.naturalHeight;
      sourceCanvas.getContext("2d").drawImage(img, 0, 0);
      if (originalSizeEl) originalSizeEl.textContent = formatBytes(file.size);
      resetResult();
      if (processBtn) processBtn.disabled = false;
      setStatus("Image loaded in your browser. Ready to process.");
    };
    img.onerror = () => {
      setStatus("That file could not be read. Please try another image.");
    };
    img.src = objectUrl;
  }

  function processImage() {
    if (!sourceImage) {
      setStatus("Choose an image first.");
      return;
    }

    const spec = outputSpec();
    setStatus("Processing locally in your browser…");

    const output = document.createElement("canvas");
    output.width = spec.width;
    output.height = spec.height;
    const ctx = output.getContext("2d");

    if (spec.mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, spec.width, spec.height);
    }
    ctx.drawImage(sourceImage, 0, 0, spec.width, spec.height);

    output.toBlob(
      (blob) => {
        if (!blob) {
          setStatus("The browser could not create the output file. Try a smaller image.");
          return;
        }

        if (resultUrl) URL.revokeObjectURL(resultUrl);
        resultUrl = URL.createObjectURL(blob);
        resultExtension = spec.extension;
        resultCanvas.width = spec.width;
        resultCanvas.height = spec.height;
        resultCanvas.getContext("2d").drawImage(output, 0, 0);

        if (resultSizeEl) resultSizeEl.textContent = formatBytes(blob.size);
        if (savingEl && sourceFile) {
          const original = sourceFile.size;
          const saving = original > 0 ? Math.round((1 - blob.size / original) * 100) : 0;
          savingEl.textContent = saving > 0 ? `${saving}% smaller` : saving < 0 ? `${Math.abs(saving)}% larger` : "same size";
        }

        resultReady = true;
        if (downloadBtn) downloadBtn.disabled = false;
        setStatus("Done. Your file is ready to download.");
      },
      spec.mime,
      spec.quality
    );
  }

  function clearAll() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    objectUrl = null;
    resultUrl = null;
    sourceImage = null;
    sourceFile = null;
    if (uploadInput) uploadInput.value = "";
    if (processBtn) processBtn.disabled = true;
    if (originalSizeEl) originalSizeEl.textContent = "—";
    const ctx = sourceCanvas.getContext("2d");
    ctx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
    resetResult();
    setStatus("Cleared. Choose an image to start.");
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

  if (processBtn) processBtn.addEventListener("click", processImage);
  if (clearBtn) clearBtn.addEventListener("click", clearAll);

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (!resultReady || !resultUrl) return;
      const base = sourceFile ? sourceFile.name.replace(/\.[^.]+$/, "") : "image";
      const link = document.createElement("a");
      link.download = `${base}-${SUFFIX[tool] || "output"}.${resultExtension}`;
      link.href = resultUrl;
      link.click();
    });
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    });
  }
})();
