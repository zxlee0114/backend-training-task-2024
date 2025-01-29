// ### 題目一：變數練習
// 情境：Alex 正在健身房鍛鍊，他正在使用跑步機慢跑，請用變數描述以下狀態：

// 1. 請宣告一個 `const` 變數名稱為 `alexAge`，並賦予值為 `25`。
// 2. 請宣告一個 `const` 變數名稱為 `alexMembershipID`，並賦予值為字串 `"GYM2024-12345"`。
// 3. 請宣告一個 `const` 變數名稱為 `isRunningOnTreadmill`，並賦予值為 `true`。
// 4. 使用 `console.log()` 輸出 `alexAge`、`alexMembershipID` 和 `isRunningOnTreadmill`。

// 1.1 範例
const alexAge = 25;
const alexMembershipID = "GYM2024-12345";
const isRunningOnTreadmill = true;
console.log(`${alexAge}、${alexMembershipID}、${isRunningOnTreadmill}`);

// ### 題目二：變數命名練習
// - 瑜伽團課 - 300 元
// - 重訓團課 - 500 元
// - 重訓 1 對 1 課程 - 1500 元
// 情境：Alex 這個月的運動預算有 3000 元
// 請修改以下中文變數名稱，讓他符合變數語意

const yogaGroupCoursePrice = 300;
const weightGroupCoursePrice = 500;
const weightPrivateCoursePrice = 1500;
const alexMonthlyFitnessBudget = 3000;

// ### 題目三：變數計算
// 呈上題，Alex 想要規劃好自己的運動課程，需符合以下三個條件，請將花費總數計算在 AlexBudget 上，一起幫幫他吧！
// 條件一：一定至少要買 1 堂重訓團課和瑜伽團課
// 條件二：瑜伽團課只能一次買 3 堂
// 條件三：一定要花到 2400 以上，並購買 5 堂課程

const coursePrice = {
  yogaGroup: 300,
  weightGroup: 500,
  weightPrivate: 1500,
};

const AlexBudget = 3000;

function findTrainingCombinations() {
  const MINIMUM_SPEND = 2400; // 最低消費
  const MINIMUM_TOTAL_COURSES = 5; // 最低課程數
  const YOGA_PACKAGE_SIZE = 3; // 瑜珈課必須一次買3堂

  const validCombinations = [];

  // 計算最多可以買幾個瑜珈課程包
  const maxYogaPackages = Math.floor(
    AlexBudget / (coursePrice.yogaGroup * YOGA_PACKAGE_SIZE)
  );

  // 遍歷可能的瑜珈課程包數量（至少要買一個包）
  for (let yogaPackages = 1; yogaPackages <= maxYogaPackages; yogaPackages++) {
    const yogaPackageCost =
      coursePrice.yogaGroup * YOGA_PACKAGE_SIZE * yogaPackages;
    const yogaCourses = YOGA_PACKAGE_SIZE * yogaPackages;

    // 必須至少買一堂重訓團課
    const minWeightGroupCost = coursePrice.weightGroup;

    // 計算剩餘預算
    const remainingBudgetAfterMinimum =
      AlexBudget - (yogaPackageCost + minWeightGroupCost);

    // 已經有的基本課程數
    const baseCoursesCount = yogaCourses + 1; // N堂瑜珈 + 1堂重訓

    // 遍歷可能的私人重訓課程數 (0 或 1堂，因為預算限制)
    for (let privateCount = 0; privateCount <= 1; privateCount++) {
      // 計算購買私人重訓後的剩餘預算
      const afterPrivateBudget =
        remainingBudgetAfterMinimum - privateCount * coursePrice.weightPrivate;

      if (afterPrivateBudget < 0) continue;

      // 計算還可以買幾堂重訓團課
      const maxAdditionalWeightGroup = Math.floor(
        afterPrivateBudget / coursePrice.weightGroup
      );

      // 遍歷可能的額外重訓團課數量
      for (
        let additionalWeight = 0;
        additionalWeight <= maxAdditionalWeightGroup;
        additionalWeight++
      ) {
        const totalCourses = baseCoursesCount + privateCount + additionalWeight;
        const totalCost =
          yogaPackageCost +
          minWeightGroupCost +
          privateCount * coursePrice.weightPrivate +
          additionalWeight * coursePrice.weightGroup;

        // 檢查是否符合所有條件
        if (
          totalCourses >= MINIMUM_TOTAL_COURSES &&
          totalCost >= MINIMUM_SPEND &&
          totalCost <= AlexBudget
        ) {
          validCombinations.push({
            yogaGroup: yogaCourses,
            weightGroup: 1 + additionalWeight,
            weightPrivate: privateCount,
            totalCourses,
            totalCost,
            remainingBudget: AlexBudget - totalCost,
          });
        }
      }
    }
  }

  // 印出所有符合的組合
  if (validCombinations.length > 0) {
    console.log("找到以下符合條件的組合：");
    validCombinations.forEach((combination, index) => {
      console.log(`\n方案 ${index + 1}:`);
      console.log(
        `瑜珈團課: ${combination.yogaGroup} 堂 (${
          combination.yogaGroup / 3
        } 個課程包)`
      );
      console.log(`重訓團課: ${combination.weightGroup} 堂`);
      console.log(`私人重訓: ${combination.weightPrivate} 堂`);
      console.log(`總課程數: ${combination.totalCourses} 堂`);
      console.log(`總花費: ${combination.totalCost} 元`);
      console.log(`剩餘預算: ${combination.remainingBudget} 元`);
    });
  } else {
    console.log("找不到符合所有條件的組合！");
  }

  return validCombinations;
}

findTrainingCombinations();

// function getTrainingPlan() {
//   // 瑜珈課要 3 堂一起買
//   const yogaPackageCourses = 3;
//   const yogaPackagePrice = coursePrice.yogaGroup * yogaPackageCourses; // 900
//   // 剩餘的預算
//   let remainingBudget =
//     AlexBudget - (yogaPackagePrice + coursePrice.weightGroup); //1600
//   const minCost = 2400;
//   const maxRemaining = AlexBudget - minCost; // 600
//   let isPlanValid = (remainingBudget >= 0 && remainingBudget <= maxRemaining)

//   // 最多可以買幾堂一對一重訓課
//   let possibleWeightPrivateCourses = Math.floor(
//     remainingBudget / coursePrice.weightPrivate
//   ); // 1

//   let possibleYogaPackages;
//   let possibleWeightGroupCourses;

//   if ((possibleWeightPrivateCourses = 1)) {
//     remainingBudget -= coursePrice.weightPrivate * possibleWeightPrivateCourses;
//     console.log(`Alex 買完課程了，他一共剩下 ${remainingBudget} 元`);
//     return;
//   }

//   if ((possibleWeightPrivateCourses = 0)) {
//     possibleYogaPackages = Math.floor(remainingBudget / yogaPackagePrice); // 1
//     if ((possibleYogaPackages = 1)) {
//       remainingBudget -= yogaPackagePrice * possibleYogaPackages; // 700
//       possibleWeightGroupCourses = Math.floor(
//         remainingBudget / coursePrice.weightGroup
//       ); // 1
//       if ((possibleWeightGroupCourses = 1)) {
//         remainingBudget -= coursePrice.weightGroup * possibleWeightGroupCourses;
//         console.log(`Alex 買完課程了，他一共剩下 ${remainingBudget} 元`);
//         return;
//       }
//       if ((possibleWeightGroupCourses = 0)) {
//         remainingBudget -= coursePrice.weightGroup * possibleWeightGroupCourses;
//         console.log(`Alex 買完課程了，他一共剩下 ${remainingBudget} 元`);
//         return;
//       }
//     }
//     if ((possibleYogaPackages = 0)) {
//       possibleWeightGroupCourses = Math.floor(
//         remainingBudget / coursePrice.weightGroup
//       ); // 3
//       if ((possibleWeightGroupCourses = 3)) {
//         remainingBudget -= coursePrice.weightGroup * possibleWeightGroupCourses;
//         console.log(`Alex 買完課程了，他一共剩下 ${remainingBudget} 元`);
//         return;
//       }
//       if ((possibleWeightGroupCourses = 2)) {
//         remainingBudget -= coursePrice.weightGroup * possibleWeightGroupCourses;
//         console.log(`Alex 買完課程了，他一共剩下 ${remainingBudget} 元`);
//         return;
//       }
//     }
//   }

//   // const possibleYogaPakage = Math.floor(
//   //   remainingBudget / coursePrice.yogaPackagePrice
//   // );

//   // const possibleWeightGroupCourses = Math.floor(
//   //   remainingBudget / coursePrice.weightGroup
//   // );

//   console.log(remainingBudget);
// }

// getTrainingPlan();
console.log(`Alex 買完課程了，他一共剩下 ${AlexBudget} 元`);

// ### 題目四：線稿圖截圖，看圖宣告變數
// 請參考資料夾內 q4.webp 圖片
// 請依照你看到的內容來嘗試設計變數和值（至少 3 個）

// 主要資訊
const packageName = "14堂組合包方案";
const totalPrice = 2520;

// 課程資訊
const totalLessons = 14;
const durationPerLesson = 50; // 分鐘
const pricePerLesson = 180;

// 折扣
const discount = 0.9;

// 按鈕文字
const buttonText = "選擇方案";

// ### 題目五：布林值與變數定義，看是否有用對 const, let
// 情境：Alex 在往健身房的路上，望向城市的風景，請描述她看到的一切，並宣告變數與賦予值
// 4-1. Alex 在等紅綠燈，他抬頭看一下現在是紅燈，還有 28 秒綠燈（最多 3 個宣告）
// 4-2. 目前一起等待的機車有 8 台
// 4.3. Alex 望向天空，看到天上有 5 朵白雲和 1 顆太陽

// 4-1
let currentTrafficLight = "red";
let secondsUntilGreen = 28;
let canPassThrough = false;

// 4-2
let waitingMotorcyclesCount = 8;

// 4-3
let cloudCount = 5;
let isSunVisible = true;

// ### 題目六：情境題：簡單變數計算
// 情境：Alex 每天都會帶著 2000cc 的水壺
// 他早上喝了 500cc
// 中午又喝了 800cc
// 下午去健身前，先裝了 1000cc 的水
// 健身時，又喝掉了 700cc
// 那麼他的水壺還剩下多少 cc 的水？
// 以下的 Code 寫到一半，再請幫幫 Alex

let myWater = 2000; // 水壺容量
myWater -= 500; // 早上喝了 500cc
myWater -= 800;
myWater += 1000;
myWater -= 700;

console.log(`Alex 的水壺還有 ${myWater}cc 的水`);

// ### 題目七：情境題：變數計算
// 情境：Anna 每週都會到單次計費型的健身房運動，週日運動結束後，想知道自己本週的消費金額，但結帳系統出了點問題，Anna 決定自己用 JS 來計算。
// Anna 的總金額（totalBill）先從零開始計算。
// 健身房計費為：每小時器械使用費 50 元，每堂團體課程費用 150 元
// 她本週用了器械 3 小時。
// 她本週參加了 2 堂團體課程。

let totalBill = 0;
const machineUsePrice = 50;
const groupClassPrice = 150;
let useHours = 3;
let attendedClasses = 2;
const machineUsePriceTotal = machineUsePrice * useHours;
const groupClassesTotal = groupClassPrice * attendedClasses;
const total = machineUsePriceTotal + groupClassesTotal;

console.log(
  `Anna 本週器械使用費共 ${machineUsePriceTotal} 元，團體課費用共 ${groupClassesTotal} 元，一共消費金額是 ${total}元`
);

// ### 題目八：變數重新賦予值
// 情境：請依照以下程式碼告知答案是多少，並在下方用註解方式寫上這五行程式碼做了什麼事
// 以下程式碼請勿變更
let a = 8; // 範例：宣告了一個 a 的變數，並賦予了一個 8 的數字型別
let b = 0; // 宣告名為 b 的變數，並賦予值為數字型別 0
a = 13; // 為 a 變數重新賦值，新值為數字型別 13
a = b + 4; // 為 a 變數重新賦值，新值為 b + 4 的結果 (0 + 4)
a - b; // 運算 a - b 的結果
b += 1; // 為 b 變數重新賦值，新值為 b + 1 的結果 (0 + 1)

// Ans: a = 4; b = 1

// ### 題目九：型別查詢
// 請不要觀看 console.log，透過註解告知解答每個變數的型別
let c = "world"; // string
let d = 456; // number
let e = c + d; // string
let f = false; // boolean
let g = d + d; // number
let h = f + g; // number

// 請從以下新增註解，告知上面每行各別是哪些型別
// a 是 string
// b 是 ???
// Ans: 如上註解處

// ### 題目十：傳值與傳參考
// 情境：請依照程式碼告知答案是多少，並在下方用註解方式寫上這五行程式碼做了什麼事
// 以下程式碼請勿變更

let numberArr1 = [5, 10, 15]; // 宣告變數 numberArr1，並賦予 [5, 10, 15] 陣列的值
let numberArr2 = numberArr1; // 宣告變數 numberArr2，將值指向與 numberArr1 相同的陣列（參考複製），此時 numberArr2 === numberArr1 為 true
numberArr2.push(20); // 在 numberArr2 尾端新增數字 20，因為 numberArr1 是同一個參考，所以在兩者都會看到這個改變
numberArr2 = [25, 30, 35]; // 為 numberArr2 重新指向一個新陣列 [25, 30, 35]，此時與 numberArr1 不再共用同個參考
console.log(numberArr1, numberArr2); // [5, 10, 15, 20], [25, 30, 35]
