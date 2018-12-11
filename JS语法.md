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

上面代碼中，雖然是兩個字符串相減，但是依然會得到結果數值 `1`，原因就在於 JavaScript 將運算子自動轉爲了數值。

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
- 布爾值： `true` 轉爲字符串 `"true"`,`false` 轉換爲 `"false"`
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

由於自動轉換具有不確定性，而且不易除錯，建議在預期爲布爾值、數值、字符串的地方，全部使用 `Boolean`、`Number`、`String` 函數進行顯示轉換。

# 錯誤處理機制

- message: 錯誤提示信息
- name: 錯誤名稱（非標準屬性）
- stack: 錯誤的堆棧（非標準屬性）

### SyntaxError 對象

`SyntaxError` 對象是解析代碼時發聲的語法錯誤。

```
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```

上面代碼的錯誤，都是在語法解析階段就可以發現，所以會拋出`SyntaxError`。第一個錯誤提示是 “token 非法”；第二個錯誤提示是“字符串不符合要求”

### ReferenceError 對象

`ReferenceError` 對象是引用一個不存在的變量時發生的錯誤。

```
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined
```

另一種觸發場景是，講一個值分配給無法分配的對象，比如對函數的運行結果或者 `this` 賦值。

```
// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment

// this 对象不能手动赋值
this = 1
// ReferenceError: Invalid left-hand side in assignment
```

上面代碼對函數 `console.log` 的運行結果和 `this` 賦值，結果都引發了 `ReferenceError` 錯誤。

### RangeError 對象

`RangeError`對象是一個值超出有效範圍時發生的錯誤。主要有幾種情況，一是數組長度爲負數，而是 `Number` 對象的方法參數超出範圍，以及函數堆棧超過最大值。

```
// 數組長度不得爲負數
new Array(-1)
// VM205:1 Uncaught RangeError: Invalid array lengthat                          <anonymous>:1:1
```

### TypeError 對象

`TypeError` 對象是變量或參數不是迂曲類型時發生的錯誤。比如，對字符串、布爾值、數值等原始類型的值使用`new`命令，就會拋出這種錯誤，因爲 `new` 命令的參數應該是一個構造函數。

```
new 123
// Uncaught TypeError: 123 is not a constructor at <anonymous>:1:1
```

# 編程風格

## 區塊

如果循環和判斷的代碼體只有一行，JavaScript 允許該區塊省略大括號。

```
if (a)
    b();
    c();

// 上面代碼的願意可能是下面這樣的
if(a){
    b();
    c();
}
// 但是實際效果卻是下面這樣的
if(a) {
    b()
}
c();
```

<b style="color:red">因此，建議總是使用大括號</b>

### 圆括号

圆括号(parentheses)在 JavaScript 中有两种作用，一种表示函数的调用，另一种表示表达式的组合。

```
// 圆括号表示函数的调用
console.log('abc');

// 圆括号表示表达式的组合
(1 + 2) * 3
```

<b style="color:red">建议可以用空格，区分这两种不同的括号</b>

1. 表示函数调用时，函数名和左括号之间没有空格。
2. 表示函数定义时，函数名和左括号之间没有空格。
3. 其他情况时，前面位置的语法元素与左括号之间，都有一个空格。

### 行尾的分好

分号表示一条语句的结束。JavaScript 允许省略行尾的分号。但是，建议不要省略行尾的分号。保持一个良好的编码习惯。

#### for 和 while 循环

```
for ( ; ; ){

}       // 此处结尾可以没有分号

while ( ; ; ){

}       // 此处结尾可以没有分号
```

But，`do...while` 循环是有分号的。

```
do {
    i--;
}while(i < 0);      // 此处分号不能省略
```

函数表达式仍然要使用分号。

```
let f = function f() {

};      // 结尾需使用分号
```

# Console 对象与控制台

`console`对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出`stdout`和标准错误`stderr`，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。

`console`的常见用途有两个。

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

`console`对象的浏览器实现，包含在浏览器自带的开发工具之中。以 Chrome 浏览器的“开发者工具”为例

打开开发者工具以后，顶端有多个面板。

- Elements：查看网页的 HTML 源码和 CSS 代码。
- Resources：查看网页加载的各种资源文件（比如代码文件、字体文件 CSS 文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage 等）。
- Network：查看网页的 HTTP 通信情况。
- Sources：查看网页加载的脚本源码。
- Timeline：查看各种网页行为随时间变化的情况。
- Performance：查看网页的性能情况，比如 CPU 和内存消耗。
- Console：用来运行 JavaScript 命令。
