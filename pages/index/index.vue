<template>
  <view class="container">
    <view>调试版本 2.0 🚀</view>
    <canvas canvas-id="wheel" class="wheel-canvas" style="width: 300px; height: 300px;" width="300" height="300" />
    <button @click="startSpin">🎡 直接测试动画</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      angle: 0
    }
  },
  onReady() {
    const ctx = uni.createCanvasContext('wheel', this)
    ctx.setFillStyle('#FF0000')
    ctx.fillRect(0, 0, 100, 100)  // 画一个红色方块
    ctx.draw()
  },
  methods: {
    drawTestWheel() {
      const ctx = this.ctx
      const r = 100
      const angle = this.angle * Math.PI / 180

      ctx.clearRect(0, 0, 300, 300)

      // 扇形
      ctx.beginPath()
      ctx.moveTo(150, 150)
      ctx.arc(150, 150, r, angle, angle + Math.PI)
      ctx.closePath()
      ctx.setFillStyle('#FF8888')
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(150, 150)
      ctx.arc(150, 150, r, angle + Math.PI, angle + 2 * Math.PI)
      ctx.closePath()
      ctx.setFillStyle('#FFCC00')
      ctx.fill()

      ctx.draw()
    },

    startSpin() {
      let total = 360 * 5
      let duration = 3000
      let start = Date.now()

      const animate = () => {
        let now = Date.now()
        let t = (now - start) / duration
        if (t >= 1) {
          this.angle = total % 360
          this.drawTestWheel()
          return
        }

        const ease = 1 - Math.pow(1 - t, 3)
        this.angle = (total * ease) % 360
        this.drawTestWheel()
        requestAnimationFrame(animate)
      }

      animate()
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
}
.wheel-canvas {
  background-color: #f8f8f8;
  margin-top: 20px;
}
</style>
