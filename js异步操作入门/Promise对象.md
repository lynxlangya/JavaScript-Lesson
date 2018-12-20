# Promise 对象

## 概述

Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。它起到代理作用(proxy)，充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层的嵌套回调函数

首先，Promise 是一个对象，也是一个构造函数

```js
function f1(resolve, reject) {
  // 异步代码
}

let p1 = new Promise(f1);
```

上面代码中，`Promise`构造函数接受一个回调函数`f1`作为参数，`f1`里面是异步操作的代码。然后，返回的`p1`就是一个 Promise 实例

Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。Promise 实例有一个 `then` 方法，用来指定下一步的回调函数

```js
let p1 = new Promise(f1);
p1.then(f2);
```
