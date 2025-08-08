export function collectFragment() {
  const now = new Date()
  const todayKey = `fragment-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
  const totalKey = 'fragment-total'
  const cardKey = 'cat-cards'

  const todayCount = uni.getStorageSync(todayKey) || 0
  const totalCount = uni.getStorageSync(totalKey) || 0

  if (todayCount >= 10) return

  const dropChance = 1.0 // 自定义掉落概率
  if (Math.random() > dropChance) return

  uni.setStorageSync(todayKey, todayCount + 1)
  uni.setStorageSync(totalKey, totalCount + 1)

  if ((totalCount + 1) % 100 === 0) {
    const cardList = uni.getStorageSync(cardKey) || []
    const newCard = getRandomCatCard()
    cardList.push(newCard)
    uni.setStorageSync(cardKey, cardList)

    uni.showToast({ title: `\uD83C\uDF89 获得猫猫卡片：${newCard.name}`, icon: 'none' })
  } else {
    uni.showToast({ title: '✨ 猫猫碎片 +1', icon: 'none' })
  }
}

function getRandomCatCard() {
  const cats = [
    { name: '奶油猫', icon: '🐱' },
    { name: '布偶猫', icon: '🐾' },
    { name: '橘猫', icon: '🍊' },
    { name: '英短猫', icon: '🇬🇧' },
    { name: '黑猫', icon: '⚫' },
  ]
  return cats[Math.floor(Math.random() * cats.length)]
}
