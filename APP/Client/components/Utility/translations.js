// translations.js

const translations = {
  'apple': {
      'zh-TW': '蘋果',
      'type': 'fruits'
  },
  'banana': {
      'zh-TW': '香蕉',
      'type': 'fruits'
  },
  'orange': {
      'zh-TW': '橘子',
      'type': 'fruits'
  },
  'grape': {
      'zh-TW': '葡萄',
      'type': 'fruits'
  },
  'watermelon': {
      'zh-TW': '西瓜',
      'type': 'fruits'
  },
  'strawberry': {
      'zh-TW': '草莓',
      'type': 'fruits'
  },
  'pear': {
      'zh-TW': '梨',
      'type': 'fruits'
  },
  'peach': {
      'zh-TW': '桃子',
      'type': 'fruits'
  },
  'pineapple': {
      'zh-TW': '鳳梨',
      'type': 'fruits'
  },
  'mango': {
      'zh-TW': '芒果',
      'type': 'fruits'
  },
  'yuzi': {
      'zh-TW': '柚子',
      'type': 'fruits'
  },
  'kiwi': {
      'zh-TW': '奇異果',
      'type': 'fruits'
  },
  'zaozi': {
      'zh-TW': '棗子',
      'type': 'fruits'
  },
  'firedragon': {
      'zh-TW': '火龍果',
      'type': 'fruits'
  },
  'liuding': {
      'zh-TW': '柳丁',
      'type': 'fruits'
  },
  'shize': {
      'zh-TW': '柿子',
      'type': 'fruits'
  },
  'shoutao': {
      'zh-TW': '壽桃',
      'type': 'fruits'
  },
  'melon': {
      'zh-TW': '哈密瓜',
      'type': 'fruits'
  },
  'dragoneye': {
      'zh-TW': '龍眼',
      'type': 'fruits'
  },
  'chips': {
      'zh-TW': '洋芋片',
      'type': 'snacks'
  },
  'cookie': {
      'zh-TW': '餅乾',
      'type': 'snacks'
  },
  'bag': {
      'zh-TW': '袋裝餅乾',
      'type': 'snacks'
  },
  'bag_noodles': {
      'zh-TW': '袋裝泡麵',
      'type': 'snacks'
  },
  'bowl_noodles': {
      'zh-TW': '碗裝泡麵',
      'type': 'snacks'
  },
  'box': {
      'zh-TW': '箱裝零食',
      'type': 'snacks'
  },
  'boxcookies': {
      'zh-TW': '箱裝餅乾',
      'type': 'snacks'
  },
  'canchips': {
      'zh-TW': '罐裝洋芋片',
      'type': 'snacks'
  },
  'bottledrink': {
      'zh-TW': '瓶裝飲料',
      'type': 'drinks'
  },
  'candrinks': {
      'zh-TW': '罐裝飲料',
      'type': 'drinks'
  },
  'onehand': {
      'zh-TW': '一手飲料',
      'type': 'drinks'
  },
  'eggroll': {
      'zh-TW': '蛋捲',
      'type': 'pastries'
  },
  'fagao': {
      'zh-TW': '發糕',
      'type': 'pastries'
  },
  'turtle': {
      'zh-TW': '紅龜粿',
      'type': 'pastries'
  },
  'snow': {
      'zh-TW': '雪餅',
      'type': 'pastries'
  },
  'malao': {
      'zh-TW': '麻粩',
      'type': 'pastries'
  },
  'science': {
      'zh-TW': '科學麵',
      'type': 'pastries'
  },
  'can': {
      'zh-TW': '罐頭',
      'type': 'canned'
  },
  'sweetcan': {
      'zh-TW': '八寶粥',
      'type': 'canned'
  },
  'wong': {
      'zh-TW': '旺旺',
      'type': 'snacks'
  },
  'rice': {
      'zh-TW': '米',
      'type': 'grains'
  },
  // Add more translations as needed
};

  
export const translateToChinese = (englishName) => {
  const lowerCaseName = englishName.toLowerCase();
  return translations[lowerCaseName]['zh-TW'] || englishName;
};

export const getTranslations = () => translations;