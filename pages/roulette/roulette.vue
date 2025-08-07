<template>
  <view class="container">
    <view class="title">有答案喵</view>

    <textarea
      v-model="inputText"
      placeholder="请输入选项（每行一个）"
      class="textarea"
    />

    <button @click="generateOptions" class="spin-btn">🎡命运的齿轮</button>

    <view class="canvas-wrapper">
      <canvas
        canvas-id="wheel"
        class="wheel-canvas"
        width="300"
        height="300"
      />
      <view v-if="options.length > 1" class="arrow"></view>
    </view>

    <view v-if="result" class="result-box">
      <image class="emoji" src="/static/icons/cat-emoji.png" mode="aspectFit" />
      <text class="result-text">推荐：{{ result }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      options: [],
      result: '',
      ctx: null,
      angle: 0,
      spinning: false,
      pastelColors: [
        '#FFDDEE', '#FFEBCC', '#FFF4A3', '#E0FFD6',
        '#D1EEFF', '#CCE5FF', '#E9D1FF', '#FFC8DD',
        '#D0F4DE', '#FFF1F3', '#FAF3DD', '#F0EFF4'
      ],
    };
  },
  onReady() {
    this.ctx = uni.createCanvasContext('wheel', this);
  },
  methods: {
    generateOptions() {
      this.options = this.inputText.split('\n').map(s => s.trim()).filter(Boolean);
      if (this.options.length < 2) {
        uni.showToast({ title: '请输入至少两个选项', icon: 'none' });
        return;
      }
      this.result = '';
      this.drawWheel();
      this.startSpin();
    },

    drawWheel() {
      const ctx = this.ctx;
      const num = this.options.length;
      const anglePer = 2 * Math.PI / num;
      const r = 130;

      ctx.clearRect(0, 0, 300, 300);
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.translate(-150, -150);

      for (let i = 0; i < num; i++) {
        const start = i * anglePer;
        const end = start + anglePer;

        const color = this.pastelColors[i % this.pastelColors.length];

        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, r, start, end);
        ctx.closePath();
        ctx.setFillStyle(color);
        ctx.fill();

        // 白色分隔线
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, r, start, start + 0.01);
        ctx.setStrokeStyle('#fff');
        ctx.setLineWidth(1);
        ctx.stroke();

        // 文字
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(start + anglePer / 2);
        ctx.setFillStyle('#333');
        ctx.setFontSize(12);
        const text = this.options[i];
        ctx.fillText(text.slice(0, 6), r - 40, 5);
        ctx.restore();
      }

      ctx.restore();
      ctx.draw(true);
    },

    startSpin() {
      if (this.spinning) return;

      this.spinning = true;
      const totalAngle = 360 * 5 + Math.floor(Math.random() * 360);
      const duration = 3000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const startAngle = this.angle;
      const change = totalAngle - startAngle;

      const timer = setInterval(() => {
        step++;
        const t = step / steps;
        const ease = 1 - Math.pow(1 - t, 3);
        this.angle = (startAngle + change * ease) % 360;
        this.drawWheel();

        if (step >= steps) {
          clearInterval(timer);
          this.spinning = false;
          this.angle = this.angle % 360;
          this.drawWheel();
          this.showResult();
        }
      }, interval);
    },

    showResult() {
      const anglePer = 360 / this.options.length;
      const pointerDeg = 270;
      const normalizedAngle = (this.angle % 360 + 360) % 360;
      const targetAngle = (pointerDeg - normalizedAngle + 360) % 360;
      const index = Math.floor(targetAngle / anglePer) % this.options.length;
      this.result = this.options[index];
    },
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  min-height: 100vh;
  background-color: #fdfcf9;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.textarea {
  width: 260px;
  height: 120px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #eee;
  background-color: #fffaf0;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
}

.spin-btn {
  background-color: #ffe8cc;
  color: #333;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
}

.spin-btn:hover {
  background-color: #ffd8a8;
}

.canvas-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

.wheel-canvas {
  width: 300px;
  height: 300px;
}

.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 36px solid #ffffff; /* 纯白箭头，干净高级 */
  pointer-events: none;
}

.result-box {
  display: flex;
  align-items: center;
  background-color: #fffaf0;
  padding: 14px 20px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-top: 32px;
}

.emoji {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.result-text {
  font-size: 20px;
  font-family: Georgia, serif;
  color: #333;
}
</style>
