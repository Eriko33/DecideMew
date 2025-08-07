<template>
  <view class="container">
    <text class="title">📖 答案之书</text>

    <view v-if="stage === 'ask'" class="prompt">
      请你心里默念一个问题
    </view>

    <view v-else-if="stage === 'thinking'" class="thinking">
      答案之书正在回答……
    </view>

    <view v-else class="answer">
      {{ answer }}
    </view>

    <!-- “开始”按钮，仅在 ask 阶段显示 -->
    <button v-if="stage === 'ask'" class="btn" @tap="start">开始</button>

    <!-- “再次提问”按钮，仅在 answer 阶段显示 -->
    <button v-if="stage === 'answer'" class="btn" @tap="reset">再次提问</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      stage: 'ask', // 'ask' | 'thinking' | 'answer'
      answer: '',
      answers: [
        '是的，一定会实现。',
        '再试一次，也许结果不同。',
        '坚持你的信念。',
        '这个问题暂时没有答案。',
        '不是时候。',
        '当然可以。',
        '你已经知道答案了。',
        '去做吧，不要犹豫。',
        '未来会告诉你真相。',
        '请放下这个念头。'
      ]
    }
  },
  methods: {
    start() {
      this.stage = 'thinking'
      this.answer = ''
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.answers.length)
        this.answer = this.answers[randomIndex]
        this.stage = 'answer'
      }, 2000)
    },
    reset() {
      this.stage = 'ask'
      this.answer = ''
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100rpx;
}
.title {
  font-size: 32rpx;
  margin-bottom: 40rpx;
}
.prompt, .thinking, .answer {
  font-size: 28rpx;
  margin-bottom: 60rpx;
  text-align: center;
  padding: 0 40rpx;
}
.btn {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  margin-top: 20rpx;
}
</style>
