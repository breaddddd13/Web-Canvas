### https://breaddddd13.gitlab.io/AS_01_WebCanvas/

# Software Studio 2018 Spring Assignment 01 Web Canvas

## Web Canvas
<img src="example01.gif" width="700px" height="500px"></img>

## Scoring (Check detailed requirments via iLMS)

| **Item**                                         | 
| :----------------------------------------------: | 
| Basic components                                 | 
| Advance tools                                    | 
| Appearance (subjective)                          | 
| Other useful widgets (**describe on README.md**) | 


## Put your report below here

#### 基本功能
1. Brush and Eraser
    > 基本上就是用moveTo跟lineTo這兩個function來實作，因為canvas是類似有一支筆在畫布上的方式來畫出東西，Brush可透過Color selector來更換顏色，而Eraser是利用塗上白色的線來達成。
2. Color selector
    > 這個部分我是用input的tag來完成，透過oninput來得到我目前的RGB值，並且在使用各項工具時，更改strokeStyle。
3. Simple menu
    > 主要的按鈕排版我都是使用css的flexbox，控制字體、筆刷大小的slider也都是用input的tag。
4. Text input
    > 這個的實作方式是有點小技巧，在點下去的時候並不是直接增加input在canvas上，而是在我們點的位置直接新增一個輸入框，並等待我們按下Enter時，才將內容畫在canvas上。
5. Font menu
    > 這部分我用option的tag做出一個下拉式選單，字體大小也是使用input的tag。
6. Cursor icon
    > icon的變更是我在我選擇的工具時改變的時候更改canvas的cursor。
7. Refresh button
    > 這個的實作就是將Canvas塗上白色。
8. Different brush shapes
    > 這個功能算是比較有難度的，因為要畫出可以自由控制大小形狀，所用的方式是儲存還沒畫之前的狀態，在滑鼠移動時一直覆蓋上去，再接著畫出形狀，直到滑鼠放開或移出畫布才結束。
9. Un/Re-do button
    > 這個部分是藉由每次畫完利用toDataURL這個function將畫布轉成圖片。然後儲存在array當中，按下按鍵時的時候就將圖片pop出來；而redo則是將資料存回去undo的array中。
10. Image tool
    > 這個功能是用input的tag，並限制上傳的內容為圖片，等圖片讀完之後再畫在畫布上。
11. Download
    > 透過js動態新增一個下載的tag，下載完之後就將tag移除。
#### 額外功能
1. zoom-in/out
    > 這個功能是以畫布的中心放大或縮小，實作的方式是透過scale這個function來調整大小，並透過oninput來即時的進行縮放。
