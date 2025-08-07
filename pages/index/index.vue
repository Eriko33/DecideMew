<template>
  <view class="container">
    <view class="title-row">
      <image class="emoji" src="/static/icons/cat-emoji.png" mode="aspectFit" />
      <text class="title-text">有答案喵 - 功能导航</text>
    </view>
    <view class="btn-group">
      <button @tap="goTo('roulette/roulette')">✨ 随机转盘</button>
      <button @tap="goTo('answer-book/answer-book')">📖 答案之书</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goTo(page) {
      wx.navigateTo({
        url: `/pages/${page}`
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  font-family: 'HarmonyOS Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60rpx;
}

.emoji {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.title-text {
  font-size: 42rpx;
  font-weight: bold;
  color: #333;
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  width: 200%;
}

button {
  font-size: 34rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border: 2rpx solid #e0e0e0;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
  font-family: inherit;
  width: 30%;
}
</style>
