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

如果正则表达式带有`g`修饰符，则每一次`test`方法都从上一次结束的位置开始向后匹配。

```
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false
```

上面代码的正则表达式使用了`g`修饰符，表示是全局搜索，会有多个结果。接着，三次使用`test`方法，每一次开始搜索的位置都是上一次匹配的后一个位置。

带有`g`修饰符时，可以通过正则对象的`lastIndex`属性制定开始搜索的位置。

```
var r = /x/g;
var s = '_x_x';

r.lastIndex = 4;
r.test(s) // false

r.lastIndex // 0
r.test(s)
```

上面代码指定从字符串的第五个位置开始搜索，这个位置为空，所以返回`false`。同时，`lastIndex`属性重置为`0`,所以第二次执行`r.test(s)`会返回`true`

注意，带有`g`修饰符时没正则表达式内部会记住上一次的`lastIndex`属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。

```
let r = /bb/g;
r.test('bb')            // true
r.test('-bb-')          // false
```

上面代码中，由于正则表达式`r`是从上一次的`lastIndex`位置开始匹配，导致第二次执行`test`方法时出现预期以外的结果。

`lastIndex`属性只对同一个正则表达式有效，所以下面这样写是错误的。

```
let count = 0;
while(/a/g.test('babaa')) count++;
```

上面代码会导致无限循环，因为`while`循环的每一匹配条件都是一个新的正则表达式，导致`lastIndex`属性总是等于 0;。

如果正则模式是一个空字符串，则匹配所有字符串

```
new RegExp('').test('abc')          // true
```

### RegExp.prototype.exec()

正则实例对象的`exec`方法，用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回`null`。

```
let s = '_x_x';
let r1 = /x/;
let r2 = /y/;

r1.exec(s)          // ["x"]
r2.exec(s)          // null
```

上面代码中，正则对象`r1`匹配成功，返回一个数组，成员是匹配结果；正则对象`r2`匹配失败，返回`null`。

## 字符串的实例方法
字符串的实例方法之中，有4种与正则表达式有关
- `String.prototype.match()`：返回一个数组，成员是所有匹配的子字符串。
- `String.prototype.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
- `String.prototype.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串。
- `String.prototype.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的