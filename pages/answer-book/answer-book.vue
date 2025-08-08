<template>
  <view class="container">
    <view class="title">📖 喵有答案</view>

    <view v-if="!isLoading && !answer" class="prompt">请你心里默念一个问题</view>
    <view v-if="isLoading" class="answer-box loading">正在召唤猫猫智慧…</view>
    <view v-if="answer" class="answer-box">{{ answer }}</view>

    <button v-if="!isLoading" class="start-button" @click="answer ? reset() : startAnswer()">
      {{ answer ? '再问一次' : '提问' }}
    </button>
  </view>
</template>

<script>
import { bigAnswerList } from '@/utils/answers.js';

export default {
  data() {
    return {
      isLoading: false,
      answer: null,
      answers: [],
      fallbackAnswers: ['当然可以。', '再等等，时机未到。', '换个角度会更好。', '遵从内心的声音。', '先喝口水再决定。', '今天适合低调一点。', '把它写下来，你会更清楚。', '问问你信任的人。', '尝试一次小小的冒险。', '先把房间收拾一下。', '别着急，睡一觉再说。', '把注意力放在当下。', '答案正在靠近你。', '这对你有益。', '不要被噪音干扰。', '一步一步来。', '给对方一点空间。', '主动一点会更好。', '说出你的真实想法。', '做一个简短的计划。']
    };
  },
  created() {
    this.answers = bigAnswerList.length > 0 ? bigAnswerList : this.fallbackAnswers;
  },
  methods: {
    startAnswer() {
      this.isLoading = true;
      this.answer = null;
      setTimeout(() => {
        const pool = this.answers.length > 0 ? this.answers : this.fallbackAnswers;
        const idx = Math.floor(Math.random() * pool.length);
        this.answer = pool[idx];
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
