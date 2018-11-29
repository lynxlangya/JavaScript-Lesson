# 語法專題
# 數據類型的轉換
## 概述
JavaScript 是一種動態類型語言，變量沒有類型限制，可以隨時賦予任意值。
```
let x = y ? 1 : 'a';
```
上面代碼中，變量 `x` 到底是數值還是字符串，取決與另一個變量 `y` 的值。`y` 爲 `true` 時， `x` 是一個數值（1）；`y` 爲 `false` 是， `x` 是一個字符串。 這意味着，`x` 的類型沒法在編譯階段就知道，必須等到運行時才能知道。

雖然變量的數據類型是不確定的，但是各種運算符對數據類型是有要求的。如果運算符發現，運算子的類型與預期不符，就會自動轉換類型。比如，減法運算符預期左右兩側的運算子應該是數值，如果不是，就會自動將它們轉爲數值。
```
'4' - '3'           // 1
```
上面代碼中，雖然是兩個字符串相減，但是依然會得到結果數值 `1`，原因就在於JavaScript 將運算子自動轉爲了數值。

## 強制轉換
強制轉換主要是指使用 `Number()`、`String()`、`Boolean()`三個函數，手動將各種類型的值，分別轉換成數字、字符串或布爾值。

### Number()
使用 `Number()`函數，可以將任意類型的值轉化爲數值。

其中兩種情況，一種是參數是原始類型的值，另一種是參數是對象。

#### 原始類型值
原始類型值的轉換規則如下：
```
// 數值： 轉換後還是原來的值
Number(123)         // 123

// 字符串：如果可以被解析爲數值，則轉換爲相應的數值
Number('123')       // 123

// 字符串：如果不可以被解析爲數值，則返回 NaN
Number('123asd')    // NaN

// 空字符串轉爲 0
Number('')          // 0

// 布爾值：true 轉爲 1， false 轉爲 0
Number(true)        // 1
Number(false)       // 0

// undefined: 轉爲 NaN
Number(undefined)   // NaN

// null: 轉爲 0
Number(null)        // 0
```
`Number` 函數將字符串轉爲數值，要比 `ParseInt` 函數嚴格很多。基本上，只要有一個字符無法轉成數值，整個字符串就會被轉爲 `NaN`

```
Number('22 Marshal')        // NaN

parseInt('22 Marshal')      // 22
```

### 對象
#### Number()
簡單的規則是，`Number`方法的參數是對象時，將返回 `NaN`，除非是包含單個數值的數組。
```
Number({a:1})       // NaN

Number([1,2,3])     // NaN

Number([4])         // 4
```
之所以如此，是因爲 `Number` 背後的轉換規則較爲複雜。

第一步，調用對象自身的 `valueOf` 方法。如果返回原始類型的值，則直接對該值使用 `Number` 函數，不再進行後續步驟。

第二步，如果 `valueOf` 方法返回的還是對象，則改爲調用對象自身的 `toString` 方法。如果 `toString` 方法返回原始類型的值，則對該值使用 `Number` 函數，不再進行後續步驟。

第三步，如果 `toString` 方法返回的是對象，就報錯。

#### String()
`String` 函數可以將任意類型的值轉化成字符串，轉換規則如下

<b>原始類型值</b>
- 數值： 轉爲相應的字符串
- 字符串： 轉換後還是原來的值
- 布爾值： `true` 轉爲字符串  `"true"`,`false` 轉換爲 `"false"`
- undefined： 轉爲字符串 `"undefined"`
- null： 轉爲字符串 `"null"`
```
String(123)         // "123"
String('asd')       // "asd"
String(true)        // "true"
String(undefined)   // "undefined"
String(null)        // null
```

### 對象
`String` 方法的參數如果是對象，返回一個類型字符串；如果是數組，返回該數組的字符串形式
```
String({a:1})       // "[object Object]"

String([1,2,3])     // "1,2,3"
```
`String` 方法背後的轉換規則，與 `Number` 方法基本雷同，只是互換了 `valueOf` 方法和 `toString` 方法的執行順序。

1. 先調用對象自身的 `toString` 方法。如果返回原始類型的值，則對該值使用 `String` 函數，不再進行一下步驟。
2. 如果 `toString` 方法返回的是對象，再調用原對象的 `valueOf` 方法返回原始類型的值，則對該值使用 `String` 函數，不再進行以下步驟。
3. 如果 `valueOf` 方法返回的是對象，就報錯。

### Boolean()
`Boolean` 函數可以將任意類型的值轉爲布爾值

它的轉換規則相對簡單：除了以下五個值的轉換結果爲 `false`，其他的值全部爲 `true`。
- `undefined`
- `null`
- `-0`or `+0`
- `NaN`
- `''` (空字符串)
```
Boolean(undefined) // false、

Boolean(null) // false

Boolean(0) // false

Boolean(NaN) // false

Boolean('') // false
```

<b style="color:red">注意：所有對象（包括空對象）的轉換結果都是`true`,甚至連 `false` 對應的布爾對象 `new Bollean(false)` 也是 `true`</b>
```
Boolean({}) // true

Boolean([]) // true

Boolean(new Boolean(false)) // true
```
所有對象的布爾值都是 `true`，這是因爲 JavaScript 語言設計的時候，處於性能考慮，如果對象西藥計算才能得到布爾值，對於 `obj1 && obj2` 這樣的場景，可能會需要較多的計算。爲了保證性能，就統一規定，對象的布爾值爲 `true`。

## 自動轉換
遇到以下三種情況時，JavaScript 會自動轉換數據類型，即轉換是自動完成的，用戶是不可見的。

第一種情況：不同類型的數據互相運算
```
123 + ‘asd’         // 123asd
```

第二種情況：對非布爾值類型的數據求布爾值
```
if ('abc') {
    console.log("Hello")
}
// Hello
```

第三種情況：對非數值類型的值使用一元運算符 （即 `+` and `-`）
```
+ {foo: 'bar'}      // NaN

- [1,2,3]           // NaN
```
自動轉換的規則是這樣的：預期什麼類型的值，就調用該類型的轉換函數。比如，某個位置預期爲字符串，就調用 `String` 函數進行轉換。如果該位置既可以是字符串，也可能是數值，那麼默認轉爲數值。

由於自動轉換具有不確定性，而且不易除錯，建議在預期爲布爾值、數值、字符串的地方，全部使用 `Boolean`、`Number`、`String` 函數進行顯示轉換