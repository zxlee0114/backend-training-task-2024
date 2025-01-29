// ### 題目一：比較運算子
// 請依序告知以下 console.Log 會顯示什麼值，
// 若不確定答案，可將 code 貼在 chrome console 顯示後，再回頭補知識點。
let a = 9;
let b = 13;
console.log(a > 0); // true
console.log(b > a); // true
console.log(a + b > 1); // true
let c = 51;
let d = 163;
console.log(c == d); // false
console.log(c !== d); // true
let e = 28;
let f = 45;
console.log(f >= e); // true
console.log(f != e); // true
console.log(f == e); // false

// ### 題目二：比較運算子 + 強制轉型
// 請回答每個 console.log 的值為？
let g = 8;
let h = "8";
console.log(g * h == 88); // false
console.log(g * h == 64); // true
console.log(g * h === 64); // true

let i = "9";
let j = "9";
console.log(i + j == 99); // true
console.log(i + j === "99"); // true
console.log(i + j === 99); // false

var k = 3;
var l = "8";
// 請文字解釋為什麼
console.log(k * l > 21);
// true
// 1. k * l: 3 * "8" => 3 * 8 當數字與字串相乘，JS 會嘗試將字串轉型成數字
// 2. 3 * 8 > 21 => 24 > 21 為 true，因此 console 輸出的結果會是 true

// ### 題目三：邏輯運算子 + if, else
// 情境：健身房週年慶，買課程送贈品
// 健身房準備了 280 個贈品，只要有達以下條件之一，就送會員一個贈品
// 1. 消費滿 1599 元
// 2. 是健身房的 VIP 會員
// Bob 今天來消費了 1800 元，但並非 VIP 會員
// 請問 Bob 是否有獲得贈品，以及贈品剩下多少？請完成以下修改處程式碼

let giftNum = 280; /* 贈品數量 */
let giftPriceRule = 1599; /* 贈品消費門檻 */
let bobPrice = 1800; /* Bob 消費金額 */
let bobIsVip = false; /* Bob 是否為 VIP */

function checkGiftQualification(price, vip) {
  let message = "";

  if (giftNum === 0) {
    message = "很抱歉，贈品已經發放完畢。";
    return message;
  }

  if (price >= giftPriceRule) {
    giftNum--;
    message = "恭喜！消費金額已達標，符合贈品資格。";
    return message;
  }

  if (vip) {
    giftNum--;
    message = "恭喜！您的 VIP 身分符合贈品資格。";
    return message;
  }

  message = "很抱歉，您目前不符合贈品資格";

  return message;
}
const checkResult = checkGiftQualification(bobPrice, bobIsVip);
console.log(checkResult);
console.log(`贈品還剩下${giftNum}個`);

// ### 題目四：
// 健身房的業績獎金計算
// 會計官想寫一個程式，來計算教練的業績獎金，以下為條件值
// 條件一：不管有無課程，基本獎金先給 6,000 元
// 條件二：全年業績在 10 萬以下者，給 10% 獎金
// 條件三：全年業績超過 10 萬 ~ 30 萬以下者，給 15% 獎金
// 條件四：全年業績超過 30 萬者，給 20% 獎金

// 例如小華的全年業績為 8 萬：80,000 * 0.1 + 6,000 總計需要支付 14,000 元獎金。

let coachIncome = 240000; // 小明全年業績
let baseBonus = 6000; // 基本獎金
let coachBonus = baseBonus; // 教練業績獎金帳單，並已加入條件一基本獎金

// 練習：計算教練業績獎金
const PERFORMANCE_BONUS_TIERS = {
  ENTRY_LEVEL: { min: 1, max: 100000, bonusRate: 0.1 },
  INTERMEDIATE: { min: 100001, max: 300000, bonusRate: 0.15 },
  ADVANCED: { min: 300001, bonusRate: 0.2 },
};

function getBonusRate(performance) {
  if (performance >= PERFORMANCE_BONUS_TIERS.ADVANCED.min)
    return PERFORMANCE_BONUS_TIERS.ADVANCED.bonusRate;

  if (performance >= PERFORMANCE_BONUS_TIERS.INTERMEDIATE.min)
    return PERFORMANCE_BONUS_TIERS.INTERMEDIATE.bonusRate;

  return PERFORMANCE_BONUS_TIERS.ENTRY_LEVEL.bonusRate;
}

function calculateTotalBonus(performance) {
  const bonusRate = getBonusRate(performance);
  const totalBonus = baseBonus + performance * bonusRate;
  return totalBonus;
}

coachBonus = calculateTotalBonus(coachIncome);
console.log(`總共需支付小明 $${coachBonus} 獎金`);

// ### 題目五：剪刀石頭布
// 請寫程式來判斷剪刀石頭布的輸贏
// 宣告兩個變數，一個是 playerA 另一個是 playerB
// 請透過 if, if 包 if, else if, else 等方法思考每個玩家出拳的情境

// let playerA = "剪刀";
// let playerB = "剪刀";
// if (playerA === "剪刀" && playerB === "剪刀") {
//   console.log("平手");
// }
// 練習：使用 if, else if, else 判斷輸贏

function getRockPaperScissorsResult(playerAChoice, playerBChoice) {
  const rock = "石頭";
  const paper = "布";
  const scissors = "剪刀";

  const validChoices = [rock, paper, scissors];
  if (
    !validChoices.includes(playerAChoice) ||
    !validChoices.includes(playerBChoice)
  )
    return "無效的選擇";

  if (playerAChoice === playerBChoice) return "平手";

  const winningCombinations = {
    [rock]: scissors,
    [scissors]: paper,
    [paper]: rock,
  };

  if (winningCombinations[playerAChoice] === playerBChoice)
    return "PlayerA 獲勝！";
  else return "PlayerB 獲勝！";
}

const playerAChoice = "石頭";
const playerBChoice = "剪刀";
const result = getRockPaperScissorsResult(playerAChoice, playerBChoice);
console.log(result);

// ### 題目六：陣列、物件變數定義
// 這是一間位於高雄市的健身房，名為「高雄市健身教練聯盟」，專注於提供高品質的健身指導服務。健身房內有多位專業教練，以下是兩位教練的詳細介紹：
/*
王教練：
- 專長：力量訓練、減重課程
- 課程：
  - 個人訓練課程：每次收費 2000 元，課程時長 60 分鐘，目前有空堂。
  - 團體訓練課程：每次收費 1500 元，課程時長 90 分鐘，目前無空堂。
- 背景介紹：王教練擁有 5 年教學經驗，專精於提升學員的肌力與減脂，適合希望快速達成體能目標的學員。
- 是否接收新學員：是

李教練：
- 專長：瑜伽、體態雕塑
- 課程：
  - 個人訓練課程：每次收費 1800 元，課程時長 50 分鐘，目前無空堂。
  - 團體訓練課程：每次收費 1200 元，課程時長 75 分鐘，目前有空堂。
- 背景介紹：李教練是一位瑜伽大師，擁有 10 年教學經驗，擅長幫助學員雕塑完美體態，適合希望改善姿態與柔軟度的學員。
- 是否接收新學員：否
*/

const gymCoaches = {
  coachWang: {
    id: "fcu-kh-001",
    title: "王教練",
    expertise: ["力量訓練", "減重課程"],
    courses: {
      individual: {
        price: 2000,
        duration: 60,
        hasVacancy: true,
      },
      group: {
        price: 1500,
        duration: 90,
        hasVacancy: false,
      },
    },
    intro:
      "王教練擁有 5 年教學經驗，專精於提升學員的肌力與減脂，適合希望快速達成體能目標的學員。",
    isAcceptingNewStudents: true,
  },
  coachLee: {
    id: "fcu-kh-002",
    title: "李教練",
    expertise: ["瑜伽", "體態雕塑"],
    courses: {
      individual: {
        price: 1800,
        duration: 50,
        hasVacancy: false,
      },
      group: {
        price: 1200,
        duration: 75,
        hasVacancy: true,
      },
    },
    intro:
      "李教練是一位瑜伽大師，擁有 10 年教學經驗，擅長幫助學員雕塑完美體態，適合希望改善姿態與柔軟度的學員。",
    isAcceptingNewStudents: false,
  },
}; // 練習：使用物件變數定義兩位教練的資訊

console.log(gymCoaches);

// ### 題目七：
// 主管要求健身中心的兩位教練業績都需達到 50,000元
// 請透過以下資訊修改，幫助教練業績達標！
let performanceData = {
  company: "hahaFitness",
  bossName: "casper",
  coaches: [
    {
      name: "Alice",
      performance: 42000,
    },
    {
      name: "Bob",
      performance: 38000,
    },
  ],
};

const TARGET_PERFORMANCE = 50000;

// 練習：第一位教練（可將下方程式碼註解移除，完成答題）

// if (/* 判斷邏輯，使其為 true */) {
//   // 請填寫第一位教練業績增長程式碼，使用 +=
// }

if (performanceData.coaches[0].performance < TARGET_PERFORMANCE) {
  const gap = TARGET_PERFORMANCE - performanceData.coaches[0].performance;
  console.log(
    `${performanceData.coaches[0].name} 需要再增加 ${gap} 元才能達標`
  );
  performanceData.coaches[0].performance += gap;
}

// 練習：第二位教練（可將下方程式碼註解移除，完成答題）

// if (/* 判斷邏輯，使其為 true */) {
//   // 請填寫第二位教練業績增長程式碼，使用 +=
// }
if (performanceData.coaches[1].performance < TARGET_PERFORMANCE) {
  const gap = TARGET_PERFORMANCE - performanceData.coaches[1].performance;
  console.log(
    `${performanceData.coaches[1].name} 需要再增加 ${gap} 元才能達標`
  );
  performanceData.coaches[1].performance += gap;
}

console.log(performanceData);

// ### 題目八
/* 
使用 `物件包含物件` 的格式定義以下內容：
  - 跑步機每分鐘消耗 10 卡
  - 瑜伽每分鐘消耗 5 卡
  - 騎腳踏車每分鐘消耗 8 卡
*/
const activities = {
  treadmill: {
    caloriesPerMin: 10,
  },
  yoga: {
    caloriesPerMin: 5,
  },
  cycling: {
    caloriesPerMin: 8,
  },
}; // 練習：使用 `物件包含物件` 的格式定義運動類型與每分鐘消耗卡路里

// ## 題目九
// 情境：算小明今天的卡路里消耗
// 承上題，根據運動類型與每分鐘消耗卡路里的變數設計，計算小明消耗的卡路里。
// 小明今天騎了 10 分鐘的腳踏車去健身房，並先跑了 30 分鐘的跑步機熱身，最後再參加了 40 分鐘的瑜伽團課，最後再騎 10 分鐘腳踏車回家。

let calorieBurn = 0;
calorieBurn =
  activities.treadmill.caloriesPerMin * 30 +
  activities.yoga.caloriesPerMin * 40 +
  activities.cycling.caloriesPerMin * 10 * 2;

// 練習：計算小明今日消耗的卡路里

console.log(`小明今日一共消耗約 ${calorieBurn} 卡路里。`);

// ### 10. 運動量是否達標！
// 情境：小明記錄了一週內每一天的運動情況，包含運動時長（分鐘）和平均心率（次數）。
/* 現有的運動標準為「533 原則」：
  1. 每週運動至少 5 次
  2. 或每週累計運動時間達 150 分鐘
  3. 每次運動必須達到 **30 分鐘** 且平均心率達 **130 次以上** 才算合格。
  
  請完成程式碼，判斷小明是否符合「533原則」。
*/

// 運動紀錄
let totalDuration = 0; // 累計符合條件的運動時間
let validDays = 0; // 符合條件的運動次數

// 小明的一週運動紀錄
const exerciseRecords = [
  { day: "Monday", duration: 40, heartRate: 135 },
  { day: "Tuesday", duration: 20, heartRate: 120 },
  { day: "Wednesday", duration: 30, heartRate: 140 },
  { day: "Friday", duration: 50, heartRate: 125 },
  { day: "Saturday", duration: 60, heartRate: 145 },
];

// 範例：週一
// if (exerciseRecords[0].duration >= 30 && exerciseRecords[0].heartRate >= 130) {
//   totalDuration += exerciseRecords[0].duration;
//   validDays += 1;
// }

// 練習：週二、週三、週四、週五、週六
// if (exerciseRecords[1].duration >= 30 && exerciseRecords[1].heartRate >= 130) {
//   totalDuration +=  exerciseRecords[1].duration;
//   validDays += 1;
// }...
exerciseRecords.forEach((record) => {
  if (record.duration >= 30 && record.heartRate >= 130) {
    totalDuration += record.duration;
    validDays += 1;
  }
});
console.log(totalDuration, validDays);

// 練習：判斷是否符合 533 原則
let isCompliant; // 條件：運動次數至少 5 次 || 運動時間累績達標 >= 150;
if (validDays >= 5 || totalDuration >= 150) isCompliant = true;
else isCompliant = false;

console.log(`小明的運動量是否達標: ${isCompliant ? "有！" : "沒有！"}`); // 輸出: 小明的運動量是否達標
