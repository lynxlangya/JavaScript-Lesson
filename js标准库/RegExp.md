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

字符串的实例方法之中，有 4 种与正则表达式有关

- `String.prototype.match()`：返回一个数组，成员是所有匹配的子字符串。
- `String.prototype.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
- `String.prototype.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串。
- `String.prototype.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。

### String.prototype.match()

字符串实例对象的`match`方法对字符串进行正则匹配，返回匹配结果

```
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1) // ["x"]
s.match(r2) // null
```

从上面代码可以看到，字符串的`match`方法与正则对象的`exec`方法非常类似：匹配成功返回一个数组，匹配失败返回`null`。

如果正则表达式带有`g`修饰符，则该方法与正则对象的`exec`方法行为不同，会一次性返回所有匹配成功的结果。

```
let s = 'abba';
let r = /a/g;

s.match(r)          // ["a", "a"]
r.exec(s)           // ["a"]
```

设置正则表达式的`lastIndex`属性，对`match`方法无效，匹配总是从字符串的第一个字符开始。

```
let r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r)         // ['a', 'b']
r.lastIndex             // 0
```

上面代码表示，设置正则对象的`lastIndex`属性是无效的。

### String.prototype.search()

字符串对象的`search`方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回`-1`

```
'_x_x'.search(/x/)          // 1    x出现在1号位置

'_x_x'.search(/_/)          // 0    _出现在0号位置
```

上面代码中，第一个匹配结果出现在字符串的`1`号位置

### String.prototype.replace()

字符串对象的`repalce`方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。

```
str.replace(search, replacement)
```

正则表达式如果不加`g`修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值

```
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```

上面代码中，最后一个正则表达式使用了`g`修饰符，导致所有的`a`都被替换成`b`

`repalce`方法的一个应用，就是消除字符串首尾两端的空格

```
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```

`repalce`方法的第二个参数可以使用美元符号`$`，用来指代所替换的内容。

- `$&`：匹配的子字符串
- `$` `：匹配结果前面的文本
- `$'`：匹配结果后面的文本
- `$n`：匹配成功的第 n 组内容，n 是从 1 开始的自然数
- `$$`：指代美元符号\$

```
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```

上面代码中，第一个例子是将匹配的组互换位置，第二个例子是改写匹配的值。

`replace`方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。

```
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

### String.prototype.split()

字符串对象的`split`方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。

```
str.split(separator, [limit])
```

该方法接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。

```
// 非正则分隔
'a,  b,c, d'.split(',')
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2)
[ 'a', 'b' ]
```

# 匹配规则

##　字面量字符和元字符

大部分字符在正则表达式中，就是字面的含义，比如`/a/`匹配`a`，`/b/`匹配`b`。如果在正则表达式中，某个字符只表示它字面的含义（就像前面的`a`和`b`），那么它们就叫做“字面量字符”（literal characters）

```
/dog/.test('old dog')           // true
```

上面代码中正则表达式的`dog`，就是字面量字符，所以`/dog/`匹配`old dog`，因为它就表示`d`、`o`、`g`三个字母连在一起。

除了字面量字符以外，还有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”（metacharacters），主要有以下几个。

### 点字符（.）

点字符（`.`）匹配除回车（`\r`）、换行（`\n`）、行分隔符（`\u2028`）和段分隔符（`\u2029`）以外的所有字符。注意，对于码点大于`0xFFFF`字符，点字符不嗯呢个正确匹配，会认为这是两个字符

```
/c.t/
```

上面代码中，`c.t`匹配`c`和`t`之间包含任意一个字符的情况，只要这三个字符在同一行，比如`cat`、`c2t`、`c-t`等等，但是不匹配`coot`

### 位置字符

位置字符用来提示字符所处的位置，主要有两个字符

- `^` 表示字符串的开始位置
- `$` 表示字符串的结束位置

```
// test必须出现在开始位置
/^test/.test('test123') // true

// test必须出现在结束位置
/test$/.test('new test') // true

// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false 有空格
```

###　选择符（`|`）

竖线符号（`|`）在正则表达式中表示“或关系”（or），即`cat|dog`表示匹配`cat`或`dog`

```
/11|22/.test('911')     // true
```

上面代码中，正则表达式指定必须匹配`11`或者`22`

多个选择符可以联合使用

```
// 匹配fred、barney、betty之中的一个
/fred|barney|betty/
```

选择符会包括它前后的多个字符，比如`/ab|cd/`指的是匹配`ab`或者`cd`,而不是指匹配`b`或者`c`。如果想修改这个行为，可以使用圆括号。

```
/a( |\t)b/.test('a\tb')         // true
```

上面代码指的是，`a`和`b`之间有一个空格或者一个制表符。

其他的元字符还包括`\`、`\*`、`+`、`?`、`()`、`[]`、`{}`等

## 转义符

正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配`+`，就要写成`\+`

```
/1+1/.test('1+1')           // false

/1\+1/.test('1+1')          // true
```

上面代码中，第一个正则表达式之所以不匹配，因为加号是元字符，不代表本身。第二个正则表达式使用反斜杠对加号进行转义，就能匹配成功。

正则表达式中，需要反斜杠转义的，一共有 12 个字符：`^`、`.`、`[`、`$`、`(`、`)`、`|`、`*`、`+`、`?`、`{`、`\` 。需要特别注意的是，如果使用`RegExp`方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。

```
(new RegExp('1\+1')).test('1+1')            // false

(new RegExp('1\\+1')).test('1+1')           // true
```

上面代码中，`RegExp`作为构造函数，参数是一个字符串。但是，在字符串内部，反斜杠也是转义字符，所以它会先被反斜杠转义一次，然后再被正则表达式转义一次，因此需要两个反斜杠进行转义。

## 特殊字符

正则表达式对一些不能打印的特殊字符，提供了表达方法

- `\cX` 表示 `Ctrl-[X]`，其中的`x`是A-Z之中任一个英文字母，用来匹配控制字符
- `[\b]` 匹配退格键(U+0008)，不要与\b混淆
- `\n` 匹配换行键
- `\r` 匹配回车键
- `\t` 匹配制表符 tab（U+0009）
- `\v` 匹配垂直制表符（U+000B）
- `\f` 匹配换页符（U+000C）
- `\0` 匹配null字符（U+0000）
- `\xhh` 匹配一个以两位十六进制数（\x00-\xFF）表示的字符
- `\uhhhh` 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符

