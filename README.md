# WishGather-資管114畢業專案
<hr>

## 環境設置&開啟專案
1. vs code中terminal cd進APP/Client，輸入 npm install (下載套件!只要第一次就好下載過之後就不用)
2. 同上 cd進APP/Server，輸入 npm install (下載套件!只要第一次就好下載過之後就不用)
3. 開啟伺服器: (terminal) App/Server目錄下 node index.js
4. 開啟APP頁面: (terminal) App/Client目錄下 npx expo start --tunnel

## 暑假共編提醒(運用Github Desktop)
#### 每次開始前都要->確保自己電腦上的與main的版本相同: 
1. check上中按鈕(current branch)在main
2. 點上右按鈕(fetch)，fetch完再點pull origin
#### 自己電腦上的內容有改動->上傳到自己的branch:
1. check上中按鈕(current branch)在 [自己的branch]
2. 左下commit to [自己的branch]-(上面空格內容要打)
3. 點上右按鈕(push)，上傳到[自己的branch]
#### gitnore
因為套件(node_modules)們不適合上傳，要用這個檔案讓github desktop在檢查時不會上傳他們
確認自己的WishGather目錄下有這個檔案
