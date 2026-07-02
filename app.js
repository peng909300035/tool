const imageUpload = document.getElementById('imageUpload');
const segmentBtn = document.getElementById('segmentBtn');
const downloadBtn = document.getElementById('downloadBtn');
const backgroundMode = document.getElementById('backgroundMode');
const accuracyMode = document.getElementById('accuracyMode');
const statusEl = document.getElementById('status');
const sourceCanvas = document.getElementById('sourceCanvas');
const resultCanvas = document.getElementById('resultCanvas');

let originalImage = null;
let segmentedImage = null;
let currentFileName = 'segmented.png';

function setStatus(message) {
  statusEl.textContent = message;
}

function loadImageToCanvas(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      const maxWidth = 640;
      const scale = Math.min(1, maxWidth / img.width);
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);
      sourceCanvas.width = width;
      sourceCanvas.height = height;
      resultCanvas.width = width;
      resultCanvas.height = height;
      const ctx = sourceCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      setStatus('图片已加载，准备开始抠图。');
      segmentBtn.disabled = false;
      downloadBtn.disabled = true;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  currentFileName = file.name.replace(/\.[^.]+$/, '') + '.png';
  setStatus('正在读取图片...');
  loadImageToCanvas(file);
});

segmentBtn.addEventListener('click', async () => {
  if (!originalImage) {
    setStatus('请先上传图片。');
    return;
  }

  segmentBtn.disabled = true;
  setStatus('正在使用轻量级分割模型处理图片...');

  try {
    const { SelfieSegmentation } = window;
    if (!SelfieSegmentation) {
      throw new Error('分割模型加载失败');
    }

    const segmentation = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    });

    const modelSelection = accuracyMode.value === 'accurate' ? 0 : 1;
    segmentation.setOptions({ modelSelection });

    segmentation.onResults((results) => {
      const width = resultCanvas.width;
      const height = resultCanvas.height;
      const ctx = resultCanvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);

      // 先获取原图的像素数据
      const srcCtx = sourceCanvas.getContext('2d');
      const srcImageData = srcCtx.getImageData(0, 0, width, height);
      const resultImageData = ctx.createImageData(width, height);

      if (results.segmentationMask) {
        // 创建临时canvas来读取掩码数据
        const maskTempCanvas = document.createElement('canvas');
        maskTempCanvas.width = width;
        maskTempCanvas.height = height;
        const maskTempCtx = maskTempCanvas.getContext('2d');
        maskTempCtx.drawImage(results.segmentationMask, 0, 0, width, height);
        const maskImageData = maskTempCtx.getImageData(0, 0, width, height);

        // 根据掩码应用到原图
        for (let i = 0; i < srcImageData.data.length; i += 4) {
          // 复制RGB
          resultImageData.data[i] = srcImageData.data[i];
          resultImageData.data[i + 1] = srcImageData.data[i + 1];
          resultImageData.data[i + 2] = srcImageData.data[i + 2];
          
          // 掩码的亮度代表人物区域
          // 使用红通道作为掩码值（MediaPipe分割掩码通常使用单通道）
          const maskValue = maskImageData.data[i]; // 红通道
          
          if (accuracyMode.value === 'accurate') {
            // 高精度：保留半透明边缘，进行平滑处理
            const maskAlpha = maskValue / 255;
            resultImageData.data[i + 3] = Math.round(maskAlpha * 255);
          } else {
            // 快速：二值化处理
            resultImageData.data[i + 3] = maskValue > 128 ? 255 : 0;
          }
        }
        ctx.putImageData(resultImageData, 0, 0);
      } else {
        // 无掩码时直接显示原图
        ctx.drawImage(sourceCanvas, 0, 0, width, height);
      }

      if (backgroundMode.value === 'solid') {
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = width;
        bgCanvas.height = height;
        const bgCtx = bgCanvas.getContext('2d');
        bgCtx.fillStyle = '#4ec5ff';
        bgCtx.fillRect(0, 0, width, height);
        bgCtx.drawImage(resultCanvas, 0, 0, width, height);
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bgCanvas, 0, 0, width, height);
      }

      segmentedImage = new Image();
      segmentedImage.src = resultCanvas.toDataURL('image/png');
      setStatus(accuracyMode.value === 'accurate' ? '高精度抠图已完成，可直接下载。' : '快速抠图已完成，可直接下载。');
      downloadBtn.disabled = false;
      segmentBtn.disabled = false;
    });

    await segmentation.send({ image: sourceCanvas });
  } catch (error) {
    console.error(error);
    setStatus(`处理失败：${error.message || '请换一张图片或稍后重试。'}`);
    segmentBtn.disabled = false;
  }
});

downloadBtn.addEventListener('click', () => {
  if (!segmentedImage) return;
  const link = document.createElement('a');
  link.download = currentFileName;
  link.href = resultCanvas.toDataURL('image/png');
  link.click();
});

segmentBtn.disabled = true;
setStatus('请先上传一张图片。');
