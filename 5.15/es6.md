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

### ES6 块级作用域 ### 
例如：
```javascript
    function f() {
        let a = 10;
        if (true) {
            let a = 5;
        //    console.log(a);     // 5
        }
        console.log(a);         // 10
    }
    f();
//    函数的两个代码块，都声明了变量a，最后输出10；表示外部的代码不受内部代码的影响。
//    如果都用 var 声明，输出就是5。
```
## const 命令 ##
### 基本用法 ###
`const` 声明一个只读的常量，一旦声明，常量的值就不能再改变。
```ecmascript 6
const a = 10;

console.log(a);

a = 100;    

// 报错。VM257:5 Uncaught TypeError: Assignment to constant variable.
```
`const` 声明的变量不能改变值，这就意味着，`const` 一旦声明变量，就必须立即初始化，不能留在以后再进行赋值。
```ecmascript 6
const foo;
// Uncaught SyntaxError: Missing initializer in const declaration.
// 在 const 声明中缺少初始化的值。
```
上面的例子说明：对于 `const` 来说，只声明，不赋值就会报错。

`const` 的作用域和 `let` 命令相同：只在声明所在的块级作用域有效。
```ecmascript 6
if (true) {
    const max = 10;
    // console.log(max)        // 不会报错
}

console.log(max);       // max is not defined
```
如果在块级作用域外面就会报错。如上，显示未定义。
`const` 声明的常量也是不会提升，同样存在暂时性死区，只能在声明的位置后面使用。
```ecmascript 6
if (true) {
    console.log(a);
    const a = 10;
}

// a is not defined
```
上面的代码中，常量 `a` 在声明之前就调用，所以报错。

```ecmascript 6
var mas = "Hello";
let age = 22;

// 一下两行都报错
const mas = "World";
let age = 21;

// Identifier 'message' has already been declared
// 标识符已被声明
```