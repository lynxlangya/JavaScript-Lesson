## 1. let命令  ##
### 基本用法 ###
ES6新增 `let` 命令，用来声明变量，相当于 `var` ,但是所声明的变量，只能在`let` 命令所在的代码块内有效。  

```javascript
{
    let a = 10;
    var b = 100;
}
console.log(a);   //ReferenceError: a is not defined. 未定义
console.log(b);   // 100
```
```javascript
{
    let a = 10;
    console.log(a);         // 10   在当前代码块内有效。
}
```

### 且在 ES6 中不存在变量提升  ###
```javascript
// var 的输出情况
console.log(foo);       // 在此输入 undefined
var foo = 10;

// let 的输出情况
console.log(bar);       // 报错ReferenceError
let bar = 10;
```
在 ES6 中，纠正这种现象， `let` 命令改变了语法行为，它所声明的变量一定要在声明以后使用，否则会报错。

### 不允许重复声明 ###
`let` 不允许在相同作用域内重复声明同一个变量。
```javascript
function foo() {
  let a = 1;
  var a = 10;
}
// 报错

function func() {
  let a = 100;
  let a = 10;
}
// 报错
```
因此不能在函数内部重新声明参数
```javascript
function func(arg) {
    let arg;        // 报错
}

function func(arg) {
  {
      let arg;      // 不报错
  }
}
```