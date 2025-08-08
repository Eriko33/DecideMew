<template>
  <view class="container">
    <view class="title">🧠 喵喵心理测试</view>

    <!-- 答题流程 -->
    <view v-if="!finished">
      <view class="question-box">
        <text class="question">{{ questions[currentIndex].question }}</text>
        <view class="options">
          <button
            v-for="(option, idx) in questions[currentIndex].options"
            :key="idx"
            class="option-button"
            @click="selectOption(option.resultKey)"
          >
            {{ option.text }}
          </button>
        </view>
      </view>
    </view>

    <!-- 结果页 -->
    <view v-else class="result-box">
      <text class="result-title">🎉 你的测试结果：</text>
      <view class="result-image">🧋🌲😺</view>
      <view class="result-text">{{ resultMap[resultKey] }}</view>
      <view class="match">
        你和好友的匹配度是：
        <text class="match-percent">{{ matchPercent }}%</text>
      </view>
      <button class="start-button" @click="restart">重新测试</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      selectedKeys: [],
      resultKey: '',
      finished: false,
      matchPercent: 0,
      questions: [
        {
          question: "你更喜欢以下哪种场景？",
          options: [
            { text: "森林中喝奶茶", resultKey: "forest" },
            { text: "阳光下晒太阳", resultKey: "sun" },
            { text: "雨天躲在被窝里", resultKey: "rain" }
          ]
        },
        {
          question: "面对压力时你会？",
          options: [
            { text: "静静发呆", resultKey: "sun" },
            { text: "撸猫", resultKey: "forest" },
            { text: "爆吃甜食", resultKey: "rain" }
          ]
        },
        {
          question: "你更偏好哪种饮品？",
          options: [
            { text: "奶茶", resultKey: "forest" },
            { text: "柠檬水", resultKey: "sun" },
            { text: "热可可", resultKey: "rain" }
          ]
        }
      ],
      resultMap: {
        forest: "你是森林中的奶茶喵！安静、治愈，最适合秋天的阳光下午。",
        sun: "你是阳光草坪上的活力喵！外向、自信，总能点亮身边的人。",
        rain: "你是雨夜窗边的思考喵！温柔、感性，最懂得独处的快乐。"
      }
    };
  },
  methods: {
    selectOption(key) {
      this.selectedKeys.push(key);
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      } else {
        this.showResult();
      }
    },
    showResult() {
      // 简单投票统计出现最多的 resultKey
      const count = {};
      this.selectedKeys.forEach(k => {
        count[k] = (count[k] || 0) + 1;
      });
      this.resultKey = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      this.matchPercent = 70 + Math.floor(Math.random() * 31); // 匹配度 70～100%
      this.finished = true;
    },
    restart() {
      this.currentIndex = 0;
      this.selectedKeys = [];
      this.resultKey = '';
      this.matchPercent = 0;
      this.finished = false;
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
}

.question-box {
  text-align: center;
}

.question {
  font-size: 18px;
  color: #444;
  margin-bottom: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.option-button {
  background-color: #fffaf0;
  padding: 10px 20px;
  border-radius: 16px;
  font-size: 16px;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: background-color 0.2s;
}

.option-button:hover {
  background-color: #ffe8cc;
}

.result-box {
  text-align: center;
}

.result-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.result-image {
  font-size: 48px;
  margin: 12px 0;
}

.result-text {
  font-size: 16px;
  color: #555;
  margin-bottom: 16px;
  padding: 0 12px;
}

.match {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

.match-percent {
  font-size: 20px;
  font-weight: bold;
  color: #d27856;
}

.start-button {
  background-color: #ffe8cc;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.06);
}
</style>
