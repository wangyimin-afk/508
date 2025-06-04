let floor = 1;
let maxFloor = 10;

function updateFloor() {
  document.getElementById('floor').textContent = floor;
  floor = floor < maxFloor ? floor + 1 : 1;
}

function fetchWeather() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=39.90&longitude=116.40&current_weather=true';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather ? `${data.current_weather.temperature}°C` : '无法获取天气';
      document.getElementById('weather').textContent = weather;
    })
    .catch(() => {
      document.getElementById('weather').textContent = '无法获取天气';
    });
}

setInterval(updateFloor, 3000); // 模拟楼层变化
fetchWeather();

// 人脸识别逻辑
const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');
const statusEl = document.getElementById('face-status');
let detector;
let detectInterval;

function startFaceRecognition() {
  if (!('FaceDetector' in window)) {
    statusEl.textContent = '浏览器不支持人脸识别';
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        overlay.width = video.videoWidth;
        overlay.height = video.videoHeight;
        detector = new FaceDetector();
        detectInterval = setInterval(detectFaces, 500);
        statusEl.textContent = '摄像头已启动';
      };
    })
    .catch(() => {
      statusEl.textContent = '无法访问摄像头';
    });
}

function detectFaces() {
  detector.detect(video)
    .then(faces => {
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      faces.forEach(face => {
        const { width, height, top, left } = face.boundingBox;
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, top, width, height);
      });
      statusEl.textContent = faces.length ? `识别到 ${faces.length} 张脸` : '未识别到人脸';
    })
    .catch(() => {
      statusEl.textContent = '检测失败';
    });
}

document.getElementById('start-button').addEventListener('click', startFaceRecognition);
