<template>
  <view class="container">
    <view class="title">📖 喵有答案</view>

    <!-- 初始提示 -->
    <view v-if="!isLoading && !answer" class="prompt">请你心里默念一个问题</view>


    <!-- 加载状态 -->
    <view v-if="isLoading" class="answer-box loading">正在召唤猫猫智慧…</view>

    <!-- 最终回答 -->
    <view v-if="answer" class="answer-box">{{ answer }}</view>
	
	<!-- 开始 / 再问一次 按钮 -->
	<button
	  v-if="!isLoading"
	  class="start-button"
	  @click="answer ? reset() : startAnswer()"
	>
	  {{ answer ? '再问一次' : '提问' }}
	</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      answer: null,
      answers: [
        "当然可以",
        "再试一次",
        "现在还不是时候",
        "坚持你的想法",
        "听从内心的声音",
        "答案在风中飘荡",
        "是的，只要你相信",
        "不如换个方向",
        "静待花开",
        "结果可能出人意料",
        "这值得一试",
        "别急，时机未到",
        "先喝口水再说",
        "你已经知道答案了",
        "向前一步，风景会不同",
        "别问我，问猫",
        "这对你很重要",
        "放下也是一种答案",
        "命运的齿轮已经开始转动",
        "下一次再问我吧"
      ]
    };
  },
  methods: {
    startAnswer() {
      this.isLoading = true;
      this.answer = null;
      setTimeout(() => {
        const idx = Math.floor(Math.random() * this.answers.length);
        this.answer = this.answers[idx];
        this.isLoading = false;
      }, 1800);
    },
    reset() {
      this.answer = null;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  min-height: 100vh;
  background-color: #fdfcf9;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}

.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
}

.prompt {
  font-size: 18px;
  margin-bottom: 24px;
  color: #666;
}

.start-button {
  background-color: #ffe8cc;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  margin-top: 12px;
}

.start-button:hover {
  background-color: #ffd8a8;
}

.answer-box {
  background-color: #fffaf0;
  padding: 18px 26px;
  border-radius: 16px;
  margin-top: 30px;
  font-size: 20px;
  font-family: Georgia, serif;
  color: #333;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  max-width: 80%;
  text-align: center;
}

.loading {
  font-style: italic;
  color: #999;
}
</style>
