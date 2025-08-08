<template>
  <view class="container">
    <view class="title">📊 喵最... 投票小游戏</view>

    <!-- 输入玩家昵称 -->
    <view v-if="stage === 'setup'" class="input-area">
      <text class="label">请输入玩家昵称（每行一个，至少3人）</text>
      <textarea
        v-model="playerInput"
        placeholder="示例：\n小喵\n阿汪\n呆呆"
        class="textarea"
      />
      <button class="start-button" @click="startGame">开始游戏</button>
    </view>

    <!-- 随机题目 + 投票流程 -->
    <view v-if="stage === 'voting'" class="voting-area">
      <text class="question">🐾 谁最{{ currentQuestion }}？</text>
      <text class="subtext">轮到 <b>{{ players[currentVoterIndex] }}</b> 投票</text>

      <view class="vote-options">
        <button
          v-for="(name, idx) in players"
          :key="idx"
          v-if="idx !== currentVoterIndex"
          class="vote-button"
          @click="castVote(name)"
        >
          {{ name }}
        </button>
      </view>
    </view>

    <!-- 结果展示 -->
    <view v-if="stage === 'result'" class="result-area">
      <text class="question">📣 谁最{{ currentQuestion }}？</text>
      <view class="result-list">
        <view v-for="(count, name) in voteCount" :key="name" class="result-item">
          {{ name }} 得票：{{ count }}
        </view>
      </view>
      <text class="winner">🏆 中枪最多的是：{{ topVoted.join('、') }}</text>
      <button class="start-button" @click="restart">换一题再来一轮</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      playerInput: "",
      players: [],
      questions: [
        "有可能半夜偷偷点外卖",
        "会把喜欢的人藏在心里不说",
        "最容易社恐",
        "最有可能突然emo",
        "最会讲冷笑话",
        "最有成为猫咖店主的潜力",
        "最可能不小心表白失败",
        "最会一边社交一边自闭",
        "最有可能养十只猫",
        "最可能一言不合睡着"
      ],
      currentQuestion: "",
      currentVoterIndex: 0,
      voteCount: {},
      stage: "setup", // 'setup' | 'voting' | 'result'
    };
  },
  computed: {
    topVoted() {
      const max = Math.max(...Object.values(this.voteCount));
      return Object.entries(this.voteCount)
        .filter(([_, count]) => count === max)
        .map(([name]) => name);
    }
  },
  methods: {
    startGame() {
      const names = this.playerInput
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean);
      if (names.length < 3) {
        uni.showToast({ title: "至少3名玩家", icon: "none" });
        return;
      }
      this.players = names;
      this.currentQuestion =
        this.questions[Math.floor(Math.random() * this.questions.length)];
      this.voteCount = Object.fromEntries(this.players.map((p) => [p, 0]));
      this.currentVoterIndex = 0;
      this.stage = "voting";
    },
    castVote(name) {
      this.voteCount[name]++;
      if (this.currentVoterIndex < this.players.length - 1) {
        this.currentVoterIndex++;
      } else {
        this.stage = "result";
      }
    },
    restart() {
      this.currentQuestion =
        this.questions[Math.floor(Math.random() * this.questions.length)];
      this.voteCount = Object.fromEntries(this.players.map((p) => [p, 0]));
      this.currentVoterIndex = 0;
      this.stage = "voting";
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  background-color: #fdfcf9;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.label {
  font-size: 15px;
  margin-bottom: 8px;
  color: #444;
}

.textarea {
  width: 260px;
  height: 120px;
  padding: 10px;
  background-color: #fffaf0;
  border-radius: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  margin-bottom: 16px;
}

.start-button {
  background-color: #ffe8cc;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.question {
  font-size: 18px;
  font-weight: bold;
  margin: 12px 0;
  text-align: center;
  color: #333;
}

.subtext {
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
  text-align: center;
}

.vote-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
}

.vote-button {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-width: 180px;
}

.result-area {
  margin-top: 20px;
  text-align: center;
}

.result-list {
  margin: 16px 0;
}

.result-item {
  font-size: 16px;
  color: #444;
  margin-bottom: 8px;
}

.winner {
  font-size: 18px;
  font-weight: bold;
  color: #d66;
  margin-bottom: 20px;
}
</style>
