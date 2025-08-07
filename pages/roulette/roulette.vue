<template>
  <view class="container">
    <view class="title">有答案喵</view>

    <textarea
      v-model="inputText"
      placeholder="请输入选项（每行一个）"
      class="textarea"
    />

    <button @click="generateOptions">🎡命运的齿轮</button>

    <view class="arrow">🔻</view>

    <canvas
      canvas-id="wheel"
      style="width: 300px; height: 300px;"
      width="300"
      height="300"
    />

    <view v-if="result" class="result-text">
      🎯 推荐：{{ result }}
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

    hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      const r = Math.round(255 * f(0));
      const g = Math.round(255 * f(8));
      const b = Math.round(255 * f(4));
      return `rgb(${r}, ${g}, ${b})`;
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

        // 计算颜色
        const hue = (360 / num) * i;
        const color = this.hslToRgb(hue, 70, 70);

        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, r, start, end);
        ctx.closePath();
        ctx.setFillStyle(color);
        ctx.fill();

        // 绘制文字
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(start + anglePer / 2);
        ctx.setFillStyle('#000');
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

	  // canvas 是从 3 点钟方向开始绘制（0 度朝右），而我们的箭头在正上方（12 点钟方向）
	  // 所以 pointer 指针实际指的是：angle = 270 度
	  const pointerDeg = 270;

	  // 当前转盘的角度（顺时针为正），我们取模归一到 [0, 360)
	  const normalizedAngle = (this.angle % 360 + 360) % 360;

	  // 计算当前指针指向的真实角度
	  const targetAngle = (pointerDeg - normalizedAngle + 360) % 360;

	  // 由角度反推 index
	  const index = Math.floor(targetAngle / anglePer) % this.options.length;

	  this.result = this.options[index];
	},

  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.textarea {
  width: 90%;
  min-height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
}

button {
  width: 90%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 16px;
}

.arrow {
  font-size: 32px;
  margin-bottom: -20px;
  z-index: 10;
}

.result-text {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
