
# User信眾端App文件
## Screens
### HomePage.js :
```
Description : 設定地點或搜尋後，會顯示距離較近的宮廟
Used Components : TempleDistance.js
Todo: 
```
### HomePage1.js : **(尚未修改完成)**
```
Description : 在HomePage.js點宮廟時，會顯現出該宮廟可提供購買的產品
Used Components :
Todo:
```
### HomePage2.js :  **(尚未修改完成)**
```
Description : 訂單確認頁面，確認所選購的供品並且確認取貨地址與時間
Used Components :
Todo:
```
### HomePage3.js :  **(尚未修改完成)**
```
Description : 訂單成立頁面
Used Components :
Todo:
```
### HomePage4.js :
```
Description : 加載中，回到主畫面HomePage.js
Used Components :
Todo:
```
### HomePage5.js :  **(尚未修改完成)**
```
Description : 收據頁面(改放在歷史訂單那邊)
Used Components :
Todo: 
```
---
### CartPage.js : 
```
Description : 信眾將欲購買供品加入購物車後顯示的頁面
Used Components : CartItem.js
Todo: 
```
### OfferingPage.js : 
```
Description : 在OfferingPage6.js中選擇好供品後，進到結帳頁面
Used Components : OfferingItem.js
Todo: 
```
### OfferingPage1.js :
```
Description : 購買供品中選擇哪些供品以及有多少數量是要捐贈出去的
Used Components : DonationItem.js
Todo: Checkbox問題未解決（啥問題ㄉ）
```
### OfferingPage2.js : **(尚未修改完成)**
```
Description : 訂單成立頁面
Used Components :
Todo: 
```
### OfferingPage3.js : 
```
Description : 加載中，回到主畫面HomePage.js
Used Components : no
Todo: 
```

### OfferingPage4.js : 
```
Description : 點選footer中的templeIIcon後會進入到的供品種類選擇頁面
Used Components : ProductItem.js
Todo: 
```
### OfferingPage5.js : 
```
Description :點擊OfferingPage6.js 的公廟後顯示該廟宇提供的所有供品種類
Used Components : OfferingItem.js
Todo: 
```
### OfferingPage6.js : 
```
Description : 點擊OfferingPage4.js中的供品種類後，會顯示提供該種類供品的所有廟宇
Used Components : TempleCard.js
Todo: 
```
---
### UserPage.js : 
```
Description : 點擊footer會員icon，會顯示的會員頁面提供不同選項功能(個資維護、收藏清單、歷史訂單、服務條款、登出)
Used Components :
Todo: 
```
### UserPage1.js : 
```
Description : 登出頁面
Used Components :
``` 
### UserPage2.js : 
```
Description : 顯示服務條款頁面
Used Components : 
```
### UserPage3.js : 
```
Description : 歷史訂單-宮廟
Used Components : 
```
### UserPage4.js :
```
Description : 個資維護頁面
Used Components : 
```
### UserPage21.js : 
```
Description : 收藏清單 - 宮廟
Used Components : 
```
### UserPage22.js : 
```
Description : 收藏清單 - 商家
Used Components : 
```
### UserPage31.js : 
```
Description : 歷史訂單 - 商家
Used Components : 
```
---
### TempleHomePage.js :
```
Description : 廟方端首頁（包含該廟法會資訊預覽以及媒合訊息預覽）
Used Components : EventCard (法會資訊), MatchingCard (媒合資訊)
Todo : Adjust matching card layout
```
### TempleEditPage.js :
```
Description : 廟方端首頁（包含該廟法會資訊預覽以及媒合訊息預覽）
Used Components : EventCard (法會資訊, rectangle), PageTitle
Todo : Add layout with Images 
```
### EditTempleInfoPage.js : 
```
Description : 編輯法會資訊頁面
Used Components : DatePicker (add modal to show date picker), TextInputSet (label name and read value), PageTitle
Todo : Add Image input
```
### MatchingPage.js : 
```
Description : 媒合資訊總頁面
Used Components : PageTitle, (Also Tab navigation)
Todo : Finished the two tab screens layout
```

## Components 
### CartItem.js :
```
Description : 顯示購物車CartPage.js中供品資訊的卡片
Props :  imageSource(圖片)、orderTitle(廟宇名稱)、orderDetails(幾樣商品/捐贈品、總金額)
```
### TempleDistance.js : 
```
Description : 顯示在主頁面HomePage.js上的宮廟卡片
Props :  imageSource(圖片)、description(廟宇活動名稱)、distance(與設定地點之距離)、onPress(按紐得以進入該廟宇活動的頁面)
```
### ProductItem.js : 
```
Description : 顯示在OfferingPage4.js中供品種類的選項卡片
Props :  imageSource(圖片)、title(供品種類)、onPress(按紐得以進入提供該供品種類的所有廟宇頁面)
```
### TempleCard.js : 
```
Description : 顯示在OfferingPage6.js上的宮廟資訊卡片
Props :  imageSource(圖片)、title(廟宇名稱)、distance(與設定地點之距離)、onPress(按紐得以進入該廟宇活動的頁面)、savedStateSource(是否收藏)
```
### OfferingItem.js : 
```
Description : 顯示在OfferingPage0.js、OfferingPage5.js中供品資訊的卡片
Props :  imageSource(圖片)、title(供品名稱)、price(供品價錢)、description(供品備註)
Used Component : Counter.js
```
### DonationItem.js : 
```
Description : 顯示在OfferingPage1.js中供品資訊的卡片
Items :  imageSource(圖片)、title(供品名稱)、description(供品備註)、tickSource(紀錄是否被選擇捐贈)
Used Component : Counter.js
```
### Counter.js : 
```
Description : 用於紀錄信眾選購之供品數量
Props:
```



# 說明文件

## Screens 
### TempleHomePage.js 
廟方身份的主頁
#### Used Components 
1. SectionHeader
2. EventCard 
3. MatchingCaord

### OfferingPage.js 
做一些事情




## Components 

### Activity.js 

#### Description
`Activity.js` 組件顯示一個活動卡片，包含背景圖片、地點圖示和文本描述。

#### Props
- `rectangle2` (ImageSourcePropType): 背景圖片的來源。
- `prop` (string): 主文本內容，通常是地點名稱或描述。

#### Improvements
1. **更改圖片來源**
   - 建議將圖片來源更改為 SVG 文件以提高可擴展性和質量。

2. **文本元素的用途**
   - 確認 `<Text>` 元素的用途。當前它包含主文本和距離文本，可以重構為更清晰的結構。

3. **CSS 名稱改進**
   - 應重命名樣式名稱，使其更具描述性和一致性。例如，`activityContainer`, `backgroundImage`, `locationIcon` 等等。