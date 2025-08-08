<template>
  <view class="container">
    <view class="title">🌌 喵宇宙游戏</view>

    <navigator url="/pages/miaotask/miaotask" class="game-button"  @click="handleMiaoTask">🎯 喵喵指令牌</navigator>
    <navigator url="/pages/miaokill/miaokill" class="game-button"  @click="handleMiaoKill">🐺 喵喵杀</navigator>
    <navigator url="/pages/miaomind/miaomind" class="game-button"  @click="handleMiaoMind">🧠 喵喵心理</navigator>
    <navigator url="/pages/miaovote/miaovote" class="game-button"  @click="handleMiaoVote">📊 喵最...</navigator>
  </view>
</template>

<script>
import { collectFragment } from '@/utils/fragment.js'
export default {
  data() {
	return {
	  tabIndex: 0,
	}
  },
  methods: {
	handleMiaoTask() {
		collectFragment()
		uni.navigateTo({ url: '/pages/miaotask/miaotask' })
	},
	handleMiaoKill() {
		collectFragment()
		uni.navigateTo({ url: '/pages/miaokill/miaokill' })
	},
	handleMiaoMind() {
		collectFragment()
		uni.navigateTo({ url: '="/pages/miaomind/miaomind' })
	},
	handleMiaoVote() {
		collectFragment()
		uni.navigateTo({ url: '="/pages/miaovote/miaovote' })
	}
  }
};
</script>

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

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fffdf5;
  border-top: 1px solid #eee3d0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab-item {
  font-size: 28rpx;
  color: #aaa;
}
.tab-item.active {
  color: #333;
  font-weight: bold;
}
</style>
