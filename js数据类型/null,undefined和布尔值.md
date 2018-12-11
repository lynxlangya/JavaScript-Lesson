# null,undefined 和布尔值

## 1. null 和 undefined

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

如果 JavaScript 预期某个位置应该是布尔值,会将该位置上现有的值自动转换为布尔值.转换规则是除了下面六个值被转换为 `false` ,其他值都视为 `true`.

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
