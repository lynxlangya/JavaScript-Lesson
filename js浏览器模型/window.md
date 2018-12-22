# window 对象

## 概述

浏览器里面，`window`对象指当前的浏览器窗口。它也是当前网页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性

```js
a = 1;
window.a; // 1
```

上面代码中，`a`是一个没有声明就直接赋值的变量，它自动成为顶层对象的属性

## window 对象的属性

### window.name

`window.name`属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的`target`属性使用

```js
window.name = "Hello World!";
console.log(window.name);
```

### window.closed，window.opener

`window.closed`属性返回一个布尔值，表示窗口是否关闭

```js
window.closed; //false
```

上面代码检查窗口是否关闭。这种检查没啥意义，只要能运行代码，肯定没关闭窗口

## window 对象的方法

### window.alert()，window.prompt()，window.confirm()

`window.alert()`，`window.prompt()`，`window.confirm()`都是浏览器与用户互动的全局方法。他们会弹出不同的对话框，要求用户做出回应。注意，这三个方法弹出的对话框，都是浏览器统一规定的样式

### window.alert()

`window.alert()`方法弹出的对话框，只有一个确定的按钮，往往用来通知用户某些信息

```js
window.alert("This is alert,please close");
```

用户只有点击“确定”按钮，对话框才会小时。对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了

`window.alert()`方法的参数只能是字符串，没法使用 CSS 样式，但是可以用`\n`指定换行

```js
alert("This is alert \n 这条信息换行了");
```

### window.prompt()

`window.prompt()`方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并由两个按钮“确定”和“取消”。它往往用来获取用户输入的数据

```js
window.prompt("You are age?", 22);
```

### window.confirm()

`window.confirm()`方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意

```js
window.confirm("How are you?");
```

上面对话框只有两个按钮，如果用户点击了“确定”，则返回`true`，如果用户点击了“取消”，则返回`false`
