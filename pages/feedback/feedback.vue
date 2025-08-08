<template>
  <view class="container">
    <view class="title">💬 意见反馈</view>
    <textarea v-model="content" class="textarea" placeholder="请留下你对喵宇宙的任何建议~" />
    <button class="submit-button" @click="submit">📮 提交反馈</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    };
  },
  methods: {
    submit() {
      const subject = encodeURIComponent('DecideMew 用户反馈');
      const body = encodeURIComponent(this.content);
      const mailto = `mailto:example@example.com?subject=${subject}&body=${body}`;
      location.href = mailto;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  font-family: "Helvetica Neue", sans-serif;
}
.title {
  font-size: 48rpx;
  font-weight: 600;
  margin-bottom: 40rpx;
  color: #333;
}
.textarea {
  height: 300rpx;
  border: 2rpx solid #ddd;
  border-radius: 16rpx;
  padding: 20rpx;
  font-size: 32rpx;
  background: #fffaf4;
}
.submit-button {
  margin-top: 40rpx;
  background-color: #f8d7a9;
  border-radius: 24rpx;
  color: #4a2d0f;
  padding: 24rpx;
  font-size: 32rpx;
  font-weight: bold;
}
</style>