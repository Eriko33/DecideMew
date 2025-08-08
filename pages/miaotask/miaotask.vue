<template>
  <view class="container">
    <view class="title">🪄 喵喵指令牌</view>

    <view class="description">
      谁来完成小任务？<br />
      轻松聚会互动神器。
    </view>

    <view class="instruction-box">
      <text>📘 玩法说明：</text>
      <view class="instruction-text">
        系统从「可爱指令库」中抽出任务牌<br />
        示例：🐱 用喵语说一句话、🍓 找一个红色物品<br /><br />
        支持模式：<br />
        ▸ 单人抽取<br />
        ▸ 每人一张（输入人数后，依次显示任务）<br />
        <br />特别适合：朋友聚会、线上活动、打破冷场
      </view>
    </view>

    <!-- 模式选择 -->
    <picker :range="modeOptions" @change="handleModeChange">
      <view class="mode-picker">🎮 当前模式：{{ currentModeText }}</view>
    </picker>

    <!-- 每人一张模式：输入人数 -->
    <view v-if="mode === 'multi' && !hasStarted" class="input-box">
      <input
        class="input"
        type="number"
        v-model="playerCount"
        placeholder="请输入参与人数"
      />
    </view>

    <!-- 开始按钮 -->
    <button
      v-if="!hasStarted"
      class="start-button"
      @click="startGame"
    >
      开始
    </button>

    <!-- 单抽模式显示 -->
    <view v-if="mode === 'single' && currentTask" class="task-card">
      <text class="task-text">{{ currentTask }}</text>
    </view>

    <!-- 每人一张模式：逐个展示 -->
    <view v-if="mode === 'multi' && currentTask" class="task-card">
      <text class="task-text">玩家 {{ currentIndex + 1 }}：{{ currentTask }}</text>
      <button
        v-if="currentIndex < taskList.length - 1"
        class="next-button"
        @click="nextTask"
      >
        下一个
      </button>
    </view>
	
	<!-- 再次抽取按钮 -->
	<button
	  v-if="hasStarted && (
	    (mode === 'single' && currentTask) ||
	    (mode === 'multi' && currentIndex === taskList.length - 1)
	  )"
	  class="start-button"
	  @click="resetGame"
	>
	  再来一轮
	</button>
	
  </view>
</template>

<script>
export default {
  data() {
    return {
      mode: 'single', // 'single' | 'multi'
      modeOptions: ['单人抽取', '每人一张'],
      hasStarted: false,
      playerCount: 0,
      currentIndex: 0,
      taskList: [],
      currentTask: null,
      tasks: [
        "🐱 用喵语说一句话",
        "🍓 找一个红色物品",
        "🐾 拍一张最可爱的自拍",
        "🎶 唱一句喜欢的歌",
        "🤫 分享一个小秘密",
        "📢 大声说出一个愿望",
        "🧠 讲一个冷知识",
        "🪄 做一个即兴动作表演",
        "🖼️ 模仿一个表情包",
        "🧸 给别人一个拥抱",
        "📸 给身边的人拍一张照片",
        "💃 跳一小段舞",
        "🍰 分享你最近吃过最好吃的东西",
        "📝 描述一下今天的心情",
        "🐤 学一声小动物叫"
      ]
    };
  },
  computed: {
    currentModeText() {
      return this.mode === 'single' ? '单人抽取' : '每人一张';
    }
  },
  methods: {
    handleModeChange(e) {
      const val = parseInt(e.detail.value);
      this.mode = val === 0 ? 'single' : 'multi';
      this.resetGame();
    },
    startGame() {
      this.hasStarted = true;

      if (this.mode === 'single') {
        this.currentTask = this.randomTask();
      } else if (this.mode === 'multi') {
        const count = parseInt(this.playerCount);
        if (!count || count <= 0) {
          uni.showToast({ title: '请输入有效人数', icon: 'none' });
          this.hasStarted = false;
          return;
        }

        this.taskList = this.shuffleTasks(count);
        this.currentIndex = 0;
        this.currentTask = this.taskList[this.currentIndex];
      }
    },
    nextTask() {
      this.currentIndex += 1;
      this.currentTask = this.taskList[this.currentIndex];
    },
    randomTask() {
      const idx = Math.floor(Math.random() * this.tasks.length);
      return this.tasks[idx];
    },
    shuffleTasks(count) {
      const pool = [...this.tasks];
      const list = [];
      for (let i = 0; i < count; i++) {
        if (pool.length === 0) break;
        const idx = Math.floor(Math.random() * pool.length);
        list.push(pool.splice(idx, 1)[0]);
      }
      return list;
    },
    resetGame() {
      this.hasStarted = false;
      this.currentIndex = 0;
      this.taskList = [];
      this.currentTask = null;
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
}

.description {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
}

.instruction-box {
  background-color: #fffaf0;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  font-size: 15px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 320px;
}

.instruction-text {
  margin-top: 8px;
}

.mode-picker {
  font-size: 16px;
  margin-bottom: 16px;
  color: #444;
}

.input-box {
  margin-bottom: 12px;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  font-size: 16px;
  width: 180px;
  text-align: center;
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
  transition: background-color 0.3s;
  margin-top: 12px;
}

.start-button:hover,
.next-button:hover {
  background-color: #ffd8a8;
}

.task-card {
  background-color: #fffaf0;
  padding: 20px 24px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  font-size: 20px;
  color: #333;
  font-family: Georgia, serif;
  max-width: 80%;
  text-align: center;
  margin-top: 24px;
}
</style>
