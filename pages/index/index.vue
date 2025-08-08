<template>
	<view class="container">
	<view class="title-row">
		<image class="emoji" src="/static/icons/cat-emoji.png" mode="aspectFit" />
		<text class="title-text">喵有答案</text>
	</view>
    <view class="button-container">
      <navigator url="/pages/roulette/roulette" class="nav-button">🎡 随机转盘</navigator>
      <navigator url="/pages/answer-book/answer-book" class="nav-button">📖 答案之书</navigator>
	  <navigator url="/pages/miaoverse/miaoverse" class="nav-button">🌌 喵宇宙游戏</navigator>
    </view>
  </view>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: flex-start; /* 改成靠上 */
  min-height: 100vh;
  background-color: #fdfcf9;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  padding-top: 100px; /* 自定义向下挪一点点的间距 */
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #333;
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


.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 300px;
}

.nav-button {
  background-color: #fffaf0;
  color: #333;
  text-align: center;
  padding: 16px;
  font-size: 18px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #fcebd5;
}
</style>
