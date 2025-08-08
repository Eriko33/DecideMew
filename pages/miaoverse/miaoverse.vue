<template>
  <view class="container">
    <view class="title">🌌 喵宇宙游戏</view>

    <navigator url="/pages/miaotask/miaotask" class="game-button">🎯 喵喵指令牌</navigator>
    <navigator url="/pages/miaokill/miaokill" class="game-button">🐺 喵喵杀</navigator>
    <navigator url="/pages/miaomind/miaomind" class="game-button">🧠 喵喵心理</navigator>
    <navigator url="/pages/miaovote/miaovote" class="game-button">📊 喵最...</navigator>
  </view>
</template>

<style>
.container {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdfcf9;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
}

.game-button {
  width: 240px;
  background-color: #fff;
  border-radius: 16px;
  padding: 14px;
  margin: 12px;
  text-align: center;
  font-size: 18px;
  color: #444;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
