# Object 对象的相关方法

JavaScript 在`Object`对象上面，提供了很多相关的方法，处理面向对象编程的相关操作

## `Object.getPrototypeOf()`

`Object.getPrototypeOf`方法返回参数对象的原型，这是获取原型对象的标准方法

```js
let F = function() {};
let f = new F();
Object.getPrototypeOf(f) === F.prototype; // true
```

上面代码中，实例对象 `f` 的原型是 `F.prototype`

下面是几种特殊对象的原型

```js
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype; // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null; // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype; // true
```

## `Object.setPrototypeOf()`

`Object.setPrototypeOf`方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象

```js
var a = {};
var b = { x: 1 };
Object.setPrototypeOf(a, b);

Object.getPrototypeOf(a) === b; // true
a.x; // 1
```

上面代码中，`Object.setPrototypeOf`方法将对象`a`的原型，设置为对象`b`，因此`a`可以共享`b`的属性

`new`命令可以使用`Object.setPrototypeOf`方法模拟

```js
let F = function() {
  this.foo = "bar";
};

let f = new F();
// 等同于
let f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
```

上面代码中，`new`命令新建实例对象，其实可以分成两步。第一步，将一个空对象的原型设为构造函数的`prototype`属性（上例是`F.prototype`）；第二步，将构造函数的`this`绑定这个空对象，然后执行构造函数，使得定义在`this`上面的方法和属性（上例是`this.foo`），都转移到这个空对象上

## `Object.create()`

生成实例对象的常用方法是，使用`new`命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？

JavaScript 提供了`Object.create`方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性

```js
// 原型对象
var A = {
  print: function() {
    console.log("hello");
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A; // true
B.print(); // hello
B.print === A.print; // true
```

上面代码中，`Object.create`方法以`A`对象为原型，生成了`B`对象。`B`继承了`A`的所有属性和方法

实际上，`Object.create`方法可以用下面的代码代替

```js
if (typeof Object.create !== "function") {
  Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
```

上面代码表明，`Object.create`方法的实质是新建一个空的构造函数`F`，然后让`F.prototype`属性指向参数对象`obj`，最后返回一个`F`的实例，从而实现让该实例继承`obj`的属性

## `Object.prototype.isPrototypeOf()`

实例对象的`isPrototypeOf`方法，用来判断该对象是否为参数对象的原型

```js
let o1 = {};
let o2 = Object.create(o1);
let o3 = Object.create(o2);

o2.isPrototypeOf(o3); // true
o1.isPrototypeOf(o3); // true
```

上面代码中，由于`Object.prototypeOf`处于原型链的最顶端，所以对各种实例都返回`true`，只有直接继承自`null`的对象除外

## `Object.prototype.__proto__`

实例对象的`__proto__`属性（前后各两个下划线），返回该对象的原型，该属性可读写

```js
let obj = {};
let p = {};

obj.__proto__ = p;
Object.getPrototpeOf(obj) === p; // true
```

上面代码通过`__proto__`属性，将`p`对象设为`obj`对象的原型

## 获取原型对象方法的比较

如前所述，`__proto__`属性指向当前对象的原型对象，即构造函数的`prototype`属性

```js
let obj = new Object();

obj.__proto__ === Object.prototype;
// true

obj.__proto__ === obj.constructor.prototype;
// true
```

上面代码首先新建了一个对象`obj`，它的`__proto__`属性，指向构造函数（`Object`或`obj.constructor`）的`prototype`属性

因此，获取实例对象`obj`的原型对象，有三种方法

- `obj.__proto__`
- `obj.constructor.prototype`
- `Object.getPrototypeOf(obj)`

上面三种方法之中，前两种都不是很可靠。`__proto__`属性只有浏览器才需要部署，其他环境可以不部署。而`obj.constructor.prototype`在手动改变原型对象时，可能会失效

```js
var P = function() {};
var p = new P();

var C = function() {};
C.prototype = p;
var c = new C();

c.constructor.prototype === p; // false
```

上面代码中，构造函数`C`的原型对象被改成了`p`，但是实例对象的`c.constructor.prototype`却没有指向`p`。所以，在改变原型对象时，一般要设置`constructor`属性

```js
C.prototype = p;
C.prototype.constructor = C;

var c = new C();
c.constructor.prototype === p; // true
```

推荐使用第三种`Object.getPrototypeOf`方法，获取原型对象

## Object.getOwnPropertyNames()

`Object.getOwnPropertyNames`方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名

```js
Object.getOwnPropertyNames(Date);
// ["parse", "arguments", "UTC", "caller", "name", "prototype", "now", "length"]
```

上面代码中，`Object.getOwnPropertyNames`方法返回`Date`所有自身的属性名

对象本身的属性之中，有的是可以遍历的(enumerable)，有的是不可以遍历的`Object.getOwnPropertyNames`方法返回所有键名，不管是否可以遍历。只获取那些可以遍历的属性，使用`Object.keys`方法

```js
Object.keys(Date); // []
```

上面代码表明，`Date`对象所有自身的属性，都是不可以遍历的

## Object.prototype.hasOwnProperty()

对象实例的`hasOwnProperty`方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上

```js
Date.hasOwnProperty("length"); // true
Date.hasOwnProperty("toString"); // false
```

上面代码表明，`Date.length`（构造函数`Date`可以接受多少个参数）是`Date`自身的属性，`Date.toString`是继承的属性

另外，`hasOwnProperty`方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法

## in 运算符和 for...in 循环

`in`运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性

```js
"length" in Date; // true
"toString" in Date; // true
```

`in`运算符常用于检查一个属性是否存在

获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用`for...in`循环

```js
var o1 = { p1: 123 };

var o2 = Object.create(o1, {
  p2: { value: "abc", enumerable: true }
});

for (p in o2) {
  console.info(p);
}
// p2
// p1
```

上面代码中，对象`o2`的`p2`属性是自身的，`p1`属性是继承的。这两个属性都会被`for..in`循环遍历

为了在`for...in`循环中获得对象自身的属性，可以采用`hasOwnProperty`方法判断一下

```js
for (var name in object) {
  if (object.hasOwnProperty(name)) {
    /* loop code */
  }
}
```

获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数

```js
function inheritedPropertyNames(obj) {
  var props = {};
  while (obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}
```

上面代码依次获取`obj`对象的每一级原型对象“自身”的属性，从而获取`obj`对象的“所有”属性，不管是否可遍历

下面是一个例子，列出`Date`对象的所有属性

```js
inheritedPropertyNames(Date);
// [
//  "caller",
//  "constructor",
//  "toString",
//  "UTC",
//  ...
// ]
```
