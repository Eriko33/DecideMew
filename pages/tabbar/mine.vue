<template>
  <view class="mine-container">
    <view class="title-row">
      <image class="emoji" src="/static/icons/cat-emoji.png" mode="aspectFit" />
      <text class="title-text">我的猫猫碎片</text>
    </view>

    <view class="fragment-box">
      <text class="fragment-count">碎片总数：{{ fragmentCount }}</text>
      <text class="fragment-today">今日已收集：{{ todayCount }}/10</text>
    </view>

    <view class="card-section">
      <text class="card-title">已获得猫咪卡片：</text>
      <view class="card-list">
        <view v-if="cards.length === 0" class="no-card">还没有获得卡片喵～</view>
        <view v-for="(card, index) in cards" :key="index" class="card-item">
          🐾 {{ card }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fragmentCount: 0,
      todayCount: 0,
      cards: []
    };
  },
  onLoad() {
    this.loadFragmentData();
    // 监听碎片收集事件，自动刷新
    uni.$on('fragment-collected', this.loadFragmentData);
  },
  onUnload() {
    uni.$off('fragment-collected', this.loadFragmentData);
  },
  methods: {
    loadFragmentData() {
      const today = new Date().toDateString();
      const data = uni.getStorageSync('fragmentData') || {
        total: 0,
        count: 0,
        date: '',
        cards: []
      };
      this.fragmentCount = data.total || 0;
      this.todayCount = data.date === today ? data.count : 0;
      this.cards = data.cards || [];
    }
  }
};
</script>

<style>
.mine-container {
  background-color: #fffaf4;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}

.title-row {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.emoji {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.title-text {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.fragment-box {
  background-color: #fff6e5;
  padding: 30rpx;
  border-radius: 20rpx;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 60rpx;
}

.fragment-count,
.fragment-today {
  font-size: 32rpx;
  margin-bottom: 10rpx;
  color: #5c4033;
}

.card-section {
  margin-top: 30rpx;
}

.card-title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #444;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.card-item {
  background-color: #ffe6d5;
  padding: 20rpx;
  border-radius: 12rpx;
  color: #333;
  font-size: 28rpx;
}

.no-card {
  font-size: 28rpx;
  color: #999;
  font-style: italic;
}
</style>
