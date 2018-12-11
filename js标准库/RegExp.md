# RegExp 对象

`RegExp`对象提供正则表达式的功能

## 概述

正则表达式（regular expression）是一种表达式文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为 Email 地址。JavaScript 的正则表达式体系是参照 Perl5 建立的。

新建正则表达式有两种方法，一种是使用字面量，以斜杠表示开始和结束。

```
let regex = /xyz/;
```

另一种是使用`RegExp`构造函数

```
let regexp = new RegExp('xyz');
```

上面两种写法是等价的，都新建了一个内容为`xyz`的正则表达式对象。它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式。所以前者的效率较高。而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。

`RegExp`构造函数还可以接受第二个参数

```
let regex = new RegExp('xyz', 'i');
// 等价于
let regex = /xyz/i;
```

上面代码中，正则表达式`/xyz/`有一个修饰符`i`

## 实例属性

正则对象的实例属性分成两类

一类是修饰符相关，返回一个布尔值，表示对应的修饰符是否设置

- `RegExp.prototype.ignoreCase`：返回一个布尔值，表示是否设置了 i 修饰符。
- `RegExp.prototype.global`：返回一个布尔值，表示是否设置了 g 修饰符。
- `RegExp.prototype.multiline`：返回一个布尔值，表示是否设置了 m 修饰符。

上面三个属性都是只读的

```
let r = /abc/igm;

r.ignoreCase  // true
r.global      // true
r.multiline   // true
```

另一类是与修饰符无关的属性，主要是下面两个

- `RegExp.prototype.lastIndex`：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文。
- `RegExp.prototype.source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

```
var r = /abc/igm;

r.lastIndex // 0
r.source // "abc"
```

## 实例方法

### RegExp.prototype.test()

正则是对象的`test`方法返回一个布尔值，表示当前模式是否能匹配参数字符串

```
/cat/.test('cats and dogs')       // true
```

上面代码验证参数字符串之中是否包含`cat`，结果返回`true`

