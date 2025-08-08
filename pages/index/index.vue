<template>
	<view class="container">
	<view class="title-row">
		<image class="emoji" src="/static/icons/cat-emoji.png" mode="aspectFit" />
		<text class="title-text">喵有答案</text>
	</view>
    <view class="button-container">
      <navigator url="/pages/roulette/roulette" class="nav-button" @click="handleRoulette">🎡 随机转盘</navigator>
      <navigator url="/pages/answer-book/answer-book" class="nav-button" @click="handleAnswerBook">📖 答案之书</navigator>
	  <navigator url="/pages/miaoverse/miaoverse" class="nav-button">🌌 喵宇宙游戏</navigator>
    </view>
  </view>
  <!-- Tab Bar -->
  <view class="tab-bar">
	<view class="tab-item" :class="{ active: tabIndex === 0 }" @click="goHome">首页</view>
	<view class="tab-item" :class="{ active: tabIndex === 1 }" @click="goCollection">收藏</view>
	<view class="tab-item" :class="{ active: tabIndex === 2 }" @click="goMine">我的</view>
  </view>
  <view class="feedback-button">
    <button @click="goFeedback">💬意见反馈</button>
  </view>
  
  <!-- 页面最后引入 goatcounter -->
  <image style="display:none" src="https://gc.zgo.at/count.js" data-goatcounter="https://YOUR-ID.goatcounter.com/count" mode="aspectFit" />

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
    goFeedback() {
      uni.navigateTo({ url: '/pages/feedback/feedback' });
	},
	handleRoulette() {
		collectFragment()
		uni.navigateTo({ url: '/pages/roulette/roulette' })
	},
	handleAnswerBook() {
		collectFragment()
		uni.navigateTo({ url: '/pages/answer-book/answer-book' })
	},
	handleMeowUniverse() {
		collectFragment()
		uni.navigateTo({ url: '/pages/miaouverse/miaoverse' })
	},
	goHome() {
		this.tabIndex = 0
	},
	goCollection() {
		this.tabIndex = 1
		uni.navigateTo({ url: '/pages/collection/collection' })
	},
	goMine() {
		this.tabIndex = 2
		uni.navigateTo({ url: '/pages/tabbar/mine' })
	}
  }
};
</script>

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
