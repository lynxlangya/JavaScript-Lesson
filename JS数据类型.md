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