const words = [
  "バナナ",
  "花",
  "ご飯",
  "肉",
  "月",
  "船",
  "鉛筆",
  "階段",
  "木",
  "水",
  "飛行機",
  "女の子",
  "男の子"
];

export const chooseWord = () => words[Math.floor(Math.random() * words.length)];