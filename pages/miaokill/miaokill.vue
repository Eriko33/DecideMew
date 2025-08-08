<template>
  <view class="container">
    <view class="title">🐾 喵喵杀：随机分配身份牌</view>

    <view class="instruction">
      模拟狼人杀/谁是卧底机制的轻量版<br/>
      输入人数、选择牌组，开始神秘发牌！
    </view>

    <!-- 牌组选择 -->
    <picker :range="groupNames" @change="handleGroupChange">
      <view class="picker">🎴 当前牌组：{{ selectedGroupName }}</view>
    </picker>

    <!-- 人数输入 -->
    <input
      class="input"
      type="number"
      v-model="playerCount"
      placeholder="请输入参与人数（≥2）"
    />

    <!-- 发牌按钮 -->
    <button v-if="!hasStarted" class="start-button" @click="startGame">开始发牌</button>

    <!-- 查看身份流程 -->
    <view v-if="hasStarted && currentIndex < identities.length" class="card-flow">
      <text>轮到玩家 {{ currentIndex + 1 }} 查看身份</text>
      <button v-if="!showCard" class="start-button" @click="showCard = true">查看我的牌</button>
      <view v-if="showCard" class="card-box">
        <text class="card-text">{{ identities[currentIndex] }}</text>
        <button class="next-button" @click="nextPlayer">下一个玩家</button>
      </view>
    </view>

    <!-- 全部完成后 -->
    <view v-if="hasStarted && currentIndex >= identities.length" class="done-box">
      <text class="done-text">🎉 所有玩家已查看完身份</text>
      <button class="start-button" @click="resetGame">重新发牌</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      playerCount: '',
      selectedGroupIndex: 0,
      hasStarted: false,
      currentIndex: 0,
      showCard: false,
      identities: [],
      groupNames: ['猫咪 🐱 / 狗狗 🐶', '好人 😇 / 坏人 😈', '平民 👤 / 卧底 🕵️'],
      identityGroups: [
        ['🐱 猫耳', '🐶 狗狗'],
        ['😇 好人', '😈 坏人'],
        ['👤 平民', '🕵️ 卧底']
      ]
    };
  },
  computed: {
    selectedGroupName() {
      return this.groupNames[this.selectedGroupIndex];
    }
  },
  methods: {
    handleGroupChange(e) {
      this.selectedGroupIndex = parseInt(e.detail.value);
    },
    startGame() {
      const count = parseInt(this.playerCount);
      if (!count || count < 2) {
        uni.showToast({ title: '请输入至少两人', icon: 'none' });
        return;
      }

      const group = this.identityGroups[this.selectedGroupIndex];
      const result = [];

      // 平均分配身份
      for (let i = 0; i < count; i++) {
        result.push(group[i % group.length]);
      }

      // 洗牌
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      this.identities = result;
      this.currentIndex = 0;
      this.showCard = false;
      this.hasStarted = true;
    },
    nextPlayer() {
      this.currentIndex++;
      this.showCard = false;
    },
    resetGame() {
      this.playerCount = '';
      this.currentIndex = 0;
      this.identities = [];
      this.hasStarted = false;
      this.showCard = false;
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
  margin-bottom: 12px;
  text-align: center;
}

.instruction {
  font-size: 15px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.picker {
  font-size: 16px;
  color: #444;
  margin-bottom: 16px;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  font-size: 16px;
  width: 180px;
  text-align: center;
  margin-bottom: 16px;
}

.start-button,
.next-button {
  background-color: #ffe8cc;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.06);
  margin-top: 10px;
  transition: background-color 0.3s;
}

.start-button:hover,
.next-button:hover {
  background-color: #ffd8a8;
}

.card-flow {
  margin-top: 24px;
  text-align: center;
  color: #555;
  font-size: 16px;
}

.card-box {
  margin-top: 16px;
}

.card-text {
  font-size: 24px;
  color: #333;
  font-family: Georgia, serif;
  background-color: #fffaf0;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.done-box {
  margin-top: 30px;
  text-align: center;
}

.done-text {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}
</style>
