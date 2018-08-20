# JavaScript 数据类型
## 数据类型概述
### 1.简介
JavaScript 语言的每一个值,都属于某一种数据类型.JavaScript的数据类型共有6种.(ES6新增了第七种 Symbol类型的值.)

- 数值 (number): 整数和小数 (比如 `1` 和 `3.14`)
- 字符串 (string): 文本 (比如 `Hello World`)
- 布尔值 (boolean): 表示真伪的两个特殊值,即 `true` (真)和 `false` (假).
- `undefined`: 表示"未定义"或不存在,即由于目前没有定义,所以此处暂时没有任何值
- `null`: 表示空值,即此处的值为空
- 对象 (object): 各种值组合的集合

通常情况下,数值,字符串,布尔值这三种类型,合称为原始类型(primitive type)的值,即它们是最基本的数据类型,不能再细分了.对象则称合成类型(complex type)的值,因为一个对象往往是多个原始类型的值的合成,可以看作是一个存放各种值的容器.至于 `undefined` 和 `null`, 一般将它们看成两个特殊值.

对象是最复杂的数据类型,又可以分成三个子类型.

- 狭义的对象 (object)
- 数组 (array)
- 函数 (function)

狭义的对象和数组是两种不同的数据组合方式,函数其实是处理数据的方法,JavaScript 把它当成一种数据类型,可以赋值给变量,这位编程带来了很大的灵活性,也为JavaScript的"函数式编程"奠定了基础.
### 2. typeof 运算符
JavaScript 有三种方法,可以确定一个值到底是什么类型.

- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法

`instanceof` 运算符和 `Object.prototype.toString`方法,将在后文介绍.这里介绍 `typeof` 运算符.

`typeof` 运算符可以返回一个值的数据类型.

数值,字符串,布尔值分别返回 `number`,`string`,`boolean`.

```
typeof 123      // "number"
typeof '123'    // "string"
typeof false    // "boolean"
```

函数返回 `function`.

```
function f() {}
typeof f        // "function"
```

`undefined` 返回 `undefined`
```
typeof undefined
// "undefined"
```

利用这一点,`typeof` 可以用来检查一个没有声明的变量,而不报错.
```
v
// ReferenceError: v is not defined

typeof v
// "undefined"
```
上面代码中,变量 `v` 没有声明,直接使用就会报错.但是放在 `typeof` 后面,就不报错了,而是返回 `undefined`.

在实际开发过程中,这个特点通常用在判断语句.
```
// 错误的写法
if (v) {
    // ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === "undefined") {
    // ...
}
```

对象返回 `object`.
```
typeof window       // "object"
typeof {}           // "object"
typeof []           // "object"
```

上面的代码中,空数组(`[]`) 的类型也是 `object`, 这表示在JavaScript内部,数组本质上只是一种特殊的对象.`instanceof` 运算符可以区分数组和对象.

```
let o = {};
let a = [];

o instanceof Array;
a instanceof Array;
```

`null` 返回 `object`.

```
typeof null         // "object"
```

`null`的类型是`object`, 这是由于历史原因造成的.1995年的JavaScript语言的第一版,只设计了五种数据类型(对象,整数,浮点数,字符串和布尔值),没考虑`null`,只把它当做`object`的一种特殊值.后来 `null` 独立出来,作为一种单独的数据类型,为了兼容以前的代码, `typeof null` 返回 `object` 就没法改变了.
# null,undefined和布尔值
## 1. null和undefined
### 1.1 概述
`null` 与 `undefined` 都可以表示"没有",含义非常相似.将变量赋值为`undefined`或`null`,语法效果几乎没有区别.

```
let a = undefined;

let a = null;
```

上面代码中,变量`a` 分别被赋值为 `undefined`和`null`,这两种写法的效果几乎相同,无差别.

在 `if` 语句中,它们都会被自动转为 `false` ,相等运算符 (`==`) 甚至直接报告两者相等.
```
if (!undefined) {
    console.log('undefined is false');
}
// undefined is fasle

if (!null) {
    console.log('null is false');
}
// null is false


undefined == null;
// true
```

两者区别在于: `null` 是一个表示"空"的对象,转为数值时为 `0`; `undefined` 是一个表示"此处无定义" 的原始值,转为数值时为 `NaN`.

```
Number (undefined)      // NaN
5 + undefined           // NaN
```

### 1.2 用法和含义
对于 `null` 和 `undefined`, 大致可以这样理解

`null` 表示空值, 即该处的值现在为空.调用函数时,某个参数未设置任何值,这是就可以传入`null`,表示该参数为空. 比如,某个函数接受引擎抛出的错误作为参数,如果运行过程中未出错,那么这个参数就会传入 `null`,表示未发生错误.

`undefined` 表示"未定义",下面是返回`undefined` 的典型场景.

```
// 声明了变量,但是没有赋值
let i;
i;              // undefined

// 调用函数时,应该提供的参数没有提供,该参数等于 undefined
function f(x) {
    return x;
}
f();            // undefined

// 对象没有赋值的属性
let i = new Object();
i.y             // undefined

// 函数没有返回值时,默认返回 undefined
function f() {}
f()             // undefined
```

## 2. 布尔值
布尔值代表 "真" 和 "假" 两个状态."真" 用关键字 `true` 表示,"假"用关键字 `false` 表示.布尔值只有这两个值.

下列运算符会返回布尔值:

- 两元逻辑运算符: `&&`(And), `||`(Or)
- 前置逻辑运算符: `!`(Not)
- 相等运算符: `===`, `!==`, `==`, `!=`
- 比较运算符: `>`, `>=`, `<`, `<=`

如果JavaScript预期某个位置应该是布尔值,会将该位置上现有的值自动转换为布尔值.转换规则是除了下面六个值被转换为 `false` ,其他值都视为 `true`.

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- `""` 或 `''` (空字符串)

布尔值往往用于程序流程的控制
```
if ('') {
    console.log('true');
}
// 没有任何输出
```

上面代码中, `if` 命令后面的判断条件,预期应该是一个布尔值,所以 JavaScript 自动讲空字符串转为布尔值 `false`,导致程序不会进入代码块,所以没有任何输出.

注意:空数组 (`[]`) 和空对象 (`{}`) 对应的布尔值,都是 `true`.

```
if ([]) {
    console.log('true');
}
// true

if ({}) {
    console.log('true');
}
// true
```

## 3.数值
### 1.1 整数和浮点数
JavaScript 内部,所有数字都是以64位浮点数形式储存,即使整数也是如此.所以,`1` 与 `1.0` 是相同的,是同一个数.

```
1 === 1.0           // true
```

由于浮点数不是精确的值,所以设计小数的比较和运算要特别小心.

```
0.1 + 0.2 === 0.3
//      false

0.3 / 0.1
//      2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
//      false
```

### 1.2 数值精度
根据国际标准 IEEE 754,JavaScript浮点数的64个二进制位,从最左边开始,是这样组成的.

- 第1位: 符号位,`0` 表示正数, `1` 表示负数
- 第2位到第12位(共11位): 指数部分
- 第13位到第64位(共52位): 小数部分(即有效数字)

符号位决定了一个数的正负,指数部分决定了数值的大小,小数部分决定了数值的精度.

指数部分一共有11个二进制位,因此大小范围就是0到2047.IEEE 754规定,如果指数部分的值在0到2047之间(不包含两个端点),那么有效数字的第一位默认总是1,不保存在64位浮点数之中.JavaScript提供的有效数字最长为53个二进制位.

精度最多只能在53个二进制位,这意味着,绝对值小于等于2的53次方的证书,即-2<sup>53</sup>到2<sup>53</sup>,都可以精确表示.

```
Math.pow(2, 53)
//      9007199254740992

Math.pow(2, 53) + 1
//      9007199254740992

Math.pow(2, 53) + 2
//      9007199254740994

Math.pow(2, 53) + 3
//      9007199254740996

Math.pow(2, 53) + 4
//      9007199254740996

Math.pow(2, 53) + 5
//      9007199254740996
```
上面代码中,大于2的53次方以后,整数运算的结果开始出现错误.所以,大于2的53次方的数值,都无法保持精度.由于2的53次方是一个16位的十进制数值,所以简单的法则就是,JavaScript对15位的十进制数都可以精确处理.

```
Math.pow(2, 53)
//      9007199254740992

9007199254740992111
//      多出的三个有效数字,将无法保存
//      9007199254740992000
```
上面示例表明,大于2的53次方以后,多出来的有效数字(最后三位的`111`)都无法保存,变成0.

### 1.3 数值范围
根据标准,64位浮点数的证书部分的长度是11个二进制位,意味着指数部分的最大值是2047(2的11次方减1).也就是说,64位浮点数的指数部分的值最大为2047,分出一般表示负数,则JavaScript能够表示的数值范围为2<sup>1024</sup>到2<sup>-1023</sup>(开区间),超出这个范围的数无法表示.

如果一个数大于等于2的2024次方,那么就会发生"正向溢出",即JavaScript无法表示这么大的数,这时就会返回`Infinity`.

```
Math.pow(2, 1024)           // Infinity
```

如果一个数小于等于2的-1075次方(指数部分最小值-1023,在加上小数部分的52位),那么就会发生"负向溢出",即JavaScript无法表示这么小的数,直接返回0.

```
Math.pow(2, -1075)          // 0
```

下面是一个实际的例子

```
let x = 0.5;

for(let i = 0; i < 25; i++) {
    x = x * x;
}

x       // 0
```

上面代码中,对`0.5` 连续做25次平方,由于最后结果太接近0,超出了可表示的范围,JavaScript就直接将其转为0.

JavaScript提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE`属性,返回可以表示的具体的最大值和最小值.

```
Number.MAX_VALUE    // 1.7976931348623157e+308

Number.MIN_VALUE    // 5e-324
```

## 2.数值的表示法
JavaScript的数值有多种可以表示方法,可以用字面形式直接表示,比如`35`(十进制)和`0xFF`(十六进制).

数值也可以采用科学计数法表示:

```
123e3       // 123000

123e-3      // 0.123

-3.1E+12    // -3100000000000

.1e-23      // 1e-24
```

科学计数法允许字母 `e` 或 `E` 的后面,跟着一个整数,表示这个数值的指数部分.

以下两种情况,JavaScript会自动将数值转为科学计数法表示,其他情况都采用字面形式直接表示.
### 1. 小数点前的数字多于21位
```
1234567890123456789012
// 1.2345678901234568e+21

123456789012345678901
// 123456789012345680000
```

### 2. 小数点后面的零多于5个
```
// 小数点后紧跟5个以上的零
// 就自动转为科学计数法
0.0000003   // 3e-7

// 否则就保持原来的字面形式
0.000003    // 0.000003
```

## 3.数值的进制
JavaScript提供四种进制的表示法：十进制,十六进制,八进制,二进制

- 十进制: 没有前导0的数值
- 八进制: 有前缀 `0o` 或 `0O` 的数值,或者有前导0,且只用到0-7的八个阿拉伯数字的数值.
- 十六进制: 有前缀 `0x` 或 `0X` 的数值.
- 二进制: 有前缀 `0b` 或 `0B` 的数值.

默认情况下,JavaScript内部会自动将八进制,十六进制,二进制转为十进制.
```
0xff        // 255

0o377       // 255

0b11        // 3
```

如果八进制,十六进制,二进制的数值里面,出现不属于该进制的数字,就会报错
```
0xzz        // Invalid or unexpected token
0o88        // Invalid or unexpected token
0b22        // Invalid or unexpected token
```
上面代码中,十六进制出现了字母 `z` ,八进制出现数字 `8` ,二进制出现数字 `2`,因此会报错.

通常来说,有前导0的数值会被视为八进制,但是如果前导0后面有数字 `8` 或者 `9`,则该数值被视为十进制.

```
0888        // 888

0777        // 511
```
## 4.特殊数值
### 4.1 正零和负零
JavaScript内部实际存在2个 `0`: 一个是 `+0`, 一个是 `-0`,区别就是64位浮点数表示法的符号位不同,它们是等价的
```
-0 === +0       // true

0 === -0        // true

0 === +0        //true
```
几乎所有场合,正零和负零都会被当做正常的 `0`.

唯一有区别的场合是, `+0` 或 `-0` 当做坟墓,返回的值是不相等的.

```
(1 / +0) === (1 / -0)       // false
```

上面的代码之所以出现这样结果，是因为除以正零得到+Infinity，除以负零得到-Infinity，这两者是不相等的.

### 4.2 NaN
`NaN` 是JavaScript的特殊值,表示"非数字" (Not a Number),主要出现在将字符串解析成数字出错的场合.

```
5 - 'x'     // NaN
```

上面代码运行时,会自动将字符串 `x` 转为数值,但是由于 `x` 不是数值,所以最后得到的结果为 `NaN` ,表示它是"非数字"(`NaN`).

另外,一些数字函数的运算结果会出现 `NaN`.

```
Math.acos(2)        // NaN

Math.log(-1)        // NaN

Math.sqrt(-1)       // NaN
```

`0` 除以 `0` 也会得到 `NaN`.

```
0 / 0       // NaN
```

`NaN` 不是独立的数据类型,而是一个特殊数值,它的数据类型依然属于 `Number`.

```
typeof NaN      // number
```

`NaN` 不等于任何值,包括它本身

```
NaN === NaN     // false
```

`NaN` 与任何数(包括它自己)的运算,得到的都是 `NaN`

### 4.3 Infinity
`Infinity` 表示"无穷",用来表示两种场景.一种是一个正的数值太大,或一个负的数值太小,另一种是非0数值除以0,得到 `Infinity`

`Infinity` 有正负之分,`Infinity` 表示正无穷, `-Infinity` 表示负无穷.

```
Math.pow(2, 1024)       // Infinity

0 / 0           // NaN

1 / 0           // Infinity
```

由于数值正向溢出(overflow),负向溢出(underflow)和被 `0` 除,JavaScript都不会报错,而是返回 `Infinity`.

`Infinity` 大于一切数值(除了 `NaN`), `-Infinity` 小于一切数值(除了 `NaN`). `Infinity` 与 `NaN` 比较,总是返回 `false`

```
Infinity > 1000     // true
-Infinity < -1000   // true

Infinity > NaN // false
-Infinity > NaN // false

Infinity < NaN // false
-Infinity < NaN // false
```

`Infinity` 的四则运算,符合无穷的数学计算规则.
```
5 * Infinity    // Infinity
5 - Infinity    // -Infinity
Infinity / 5    // Infinity
5 / Infinity    // 0
```

0 乘以 `Infinity`,返回 `NaN` ;0除以 `Infinity` ,返回 `0`; `Infinity` 除以0; 返回 `Infinity`.

`Infinity` 加上或乘以 `Infinity`, 返回的还是 `Infinity`

`Infinity` 减去或除以 `Infinity`, 得到 `NaN`

`Infinity` 与 `null` 计算时, `null`会转为0,等同于与 `0` 的计算.

```
null * INfinity         // NaN
null / Infinity         // 0
Infinity / null         // Infinity
```

`Infinity` 与 `undefined` 计算,返回的都是 `NaN`.

## 5. 与数值相关的全局方法
### 5.1 parseInt()
`parseInt` 方法用于将字符串转为整数.

```
// parseInt 方法用于将字符串转为整数
parseInt('123')         // 123

// 如果字符串头部有空格,空格会被自动去除
parseInt('  88')        // 88

如果 parseInt 的参数不是字符串,则会先转为字符串再转换
parseInt(1.23)      // 1
    等同于
parseInt('1.23')    // 1
```

字符串转为整数的时候,是一个个字符依次转换,如果遇到不能转为数字的字符,就不再进行下去,返回已经转好的部分.

```
parseInt('8a')      // 8
parseInt('12**')    // 12
parseInt('12.34')   // 12
parseInt('15e2')    // 15
parseInt('15px')    // 15
```

如果字符串的第一个字符不能转为数字(后面跟着数字的正负号除外),返回 `NaN`

```
parseInt('abc')     // NaN
parseInt('.3')      // NaN
parseInt('')        // NaN
parseInt('+')       // NaN
parseInt('+1')      // 1
```

所以,`parseInt` 的返回值只有两种,要么是一个十进制整数,要么是 `NaN`
```
// 如果字符串以 0x 或 0X 开头,parsrInt会将其按照十六进制数解析
parseInt('0x10')        // 16

如果字符串以 0 开头,将其按照十进制解析
// parseInt('011')      // 11
```

对于那些会自动转为科学计数法的数字,`parseInt` 会将科学计数法的表示方法视为字符串,因此导致一些奇怪的结果

```
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1

parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8
```

#### 进制转换
`parseInt` 方法还可以接受第二个参数(2到36之间),表示被解析的值的进制,返回该值对应的十进制数.默认情况下,`parseInt` 的第二个参数为10,即默认是十进制转十进制.
```
parseInt('1000');       // 1000
// 等同于
parseInt('1000', 10)    // 1000
```

下面是转换指定进制的数的例子;
```
parseInt('1000', 2)     // 8
parseInt('1000', 6)     // 216
parseInt('1000', 8)     // 512
```
上面代码中,二进制,六进制,八进制的 `1000`,分别等于十进制的8,216,512. 这意味着,可以用 `parseInt` 方法进行进制的转换.

如果第二个参数不是数值,会被自动转为一个整数.这个整数只有在2到36之间,才能得到有意义的结果,超出这个范围,则返回 `NaN` .如果第二个参数是 `0`,`undefined` 和 `null`, 则直接忽略.
```
parseInt('10', 37)          // NaN
parseInt('10', 1)           // NaN
parseInt('10', 0)           // 10
parseInt('10', null)        // 10
parseInt('10', undefined)   // 10
```

如果字符串包含对于指定进制无意义的字符,则从最高开始,只返回可以转换的数值.如果最高位无法转换,则直接返回 `NaN`

```
parseInt('1546', 2)     // 1

parseInt('546', 2)      // NaN
```
上面代码中,对于二进制来说, `1` 是有意义的字符, `5`, `4`, `6`,都是无意义的字符,所以第一行返回1,第二行返回 `NaN`.

### 5.2 parseFloat()
`parseFloat` 方法用于将一个字符串转为浮点数

```
parseFloat('3.14')      // 3.14
```

如果字符串符合科学计数法,则会进行相应的转换

```
parseFloat('314e-2')        // 3.14

parseFloat('0.0314E+2')     // 3.14
```

如果字符串包含不能转为浮点数的字符,则不再进行往后转换,返回已经转好的部分

```
parseFloat('3.14Hello World')       // 3.14
```

`parseFloat` 方法会自动过滤字符串前导的空格

```
parseFloat('\t\v\r12.34\n')        // 12.34
```

如果参数不是字符串,或者字符串的第一个字符不能转化为浮点数,则返回 `NaN`.

```
parseFloat([])          // NaN
parseFloat('FF2')       // NaN
parseFloat('')          // NaN
```

这些特点使得 `parseFloat` 的转换结果不同于 `Number` 函数
```
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

### 5.3 isNaN()
`isNaN` 方法可以用来判断一个值是否为 `NaN`

```
isNaN(NaN)          // true

isNaN(123)          // false
```

但是 `isNaN` 只对数值有效, 如果传入其他值, 会被先转为数值.比如传入字符串的时候,字符串会被先转为 `NaN` ,所以最后返回 `true`, 这一点要特别引起注意.也就是说, `isNaN` 为 `true` 的值,有可能不是 `NaN`,而是一个字符串

```
isNaN('Hello')      // true
// 相当于
isNaN(Number('Hello'))  // true
```

出于同样的原因,对于对象和数组, `isNaN` 也返回 `true`.

```
isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true
```

但是,对于空数组和只有一个数值成员的数组, `isNaN` 返回 `false`

```
isNaN([])           // false
isNaN([123])        // false
isNaN(['123'])      // false
```

之所以返回 `false`, 原因是这些数组能被 `Number` 函数转成数值.

因此,使用 `isNaN` 之前,最好判断一下数据类型
```
function myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
}
```

判断 `NaN` 更可靠的方法是,利用 `NaN` 为唯一不等于自身的值的这个特点,进行判断.
```
function myIsNaN(value) {
    return value !== value;
}
```

### 5.4 isFinite()
`isFinite` 方法返回一个布尔值,表示某个值是否为正常的数值.

```
isFinite(Infinity)      // false
isFinite(-Infinity)     // false
isFinite(NaN)           // false
isFinite(undefined)     // false
isFinite(null)          // true
isFinite(-1)            // true
```

除了 `Infinity`, `-Infinity`, `NaN` 和 `undefined` 这几个值会返回 `false`, `inFinite` 对于其他的数值都会返回 `true`

# 字符串
## 1.概述
### 1.1 定义
字符串就是零个或多个排在一起的字符,放在单引号和双引号之中.

单引号字符串的背部,可以使用双引号.双引号字符串的内部,可以使用单引号.如果在单引号内部使用单引号,就必须在单引号前面机上反斜杠,用来转义,双引号也是如此.

```
'Hello World'

"Hello World"

'Hello "World"'

"Hello 'World'"
```

### 1.2 转义
反斜杠 ( \ ) 在字符内有特殊的含义,用来表示一些特殊的字符,所以又称为转义符.

需要用反斜杠转义的特殊字符,主要有下面这些:

- `\0`: null ( `\u0000` )
- `\b`: 后退键 ( `\u0008` )
- `\f`: 换页符 ( `\u000C` )
- `\n`: 换行符 ( `\u000A` )
- `\r`: 回车键 ( `\u000D` )
- `\t`: 制表符 ( `\u0009` )
- `\v`: 垂直制表符 ( `\u000B` )
- `\'`: 单引号 ( `\u0027` )
- `\"`: 双引号 ( `\u0022` )
- `\\`: 反斜杠 ( `\u005C` )

上面这些字符前面加上反斜杠,都表示特殊含义

### 1.3 字符串与数组

字符串可以被视为字符数组,因此可以使用数组的方括号运算符,用来返回某个位置的字符(位置编号从0开始)

```
let s = "Hello";

s[0]        // "H"
s[1]        // "e"
s[4]        // "o"

// 直接对字符串使用方括号运算符
'hello'[1]      // "e"
```

如果方括号中的数字超过字符串的长度,或者方括号中根本不是数字,则返回 `undefined`

```
'abc'[3]        // undefined

'abc'[-1]       // undefined

'abc'['x']      // undefined
```

### 1.4 length 属性

`length` 属性返回字符串的长度,该属性也是无法改变的

```
let s = 'hello';
s.length        // 5

s.length = 3;
s.length        // 5

s.length = 7;
s.length        // 5
```

# 对象
## 1. 概述
### 1.1 生成方法
对象(object)是JavaScript语言的核心概念,也是最重要的数据类型

简单说,对象就是一组 "键值对" (key-value) 的集合,是一种无需的复合数据集合.

```
let obj = {
    foo: 'Hello',
    bar: 'World'
};
```

上面代码中,大括号就定义了一个对象,它被赋值给变量 `obj`, 所以变量 `obj` 就指向一个对象. 该对象内部包含两个键值对 (又称两个"成员"),第一个键值对是 `foo: 'Hello'`, 其中 `foo` 是"键名"(成员的名称),字符串 `Hello` 是"键值"(成员的值).键名与键值之间用冒号分割.第二个键值对是 `bar: 'World'`, `bar` 是键名, `World` 是键值.两个键值对之间用逗号隔开.

对象的每一个键名又称 "属性(property)",它的"键值"可以是任何数据类型,如果一个属性的值为函数,通常把这个属性称为"方法",它可以像函数那样调用.