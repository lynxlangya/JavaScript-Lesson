# Object对象
## 概述
JavaScript 原生提供 `Object`对象。
JavaScript 的所有其他对象都继承自 `Object` 对象，即那些对象都是 `Object` 的实例。
`Object` 对象的原生方法分成两类：`Object`本身的方法与`Object`的实例方法。
### `Object`对象本身的方法
所谓“本身的方法”就是直接定义在 `Object` 对象的方法。
```
Object.print = function (i) {
    console.log(i)
}
```
上面代码中，`print`方法就是直接定义在`Object`对象上。

### `Object`的实例方法
所谓实例方法就是定义在`Object`原型对象`Object.prototype`上的方法。它可以被`Object`实例直接使用。
```
Object.prototype.print = function () {
    console.log(this);
};

let obj = new Object();
obj.print()         // Object
```
上面代码中，`Object.prototype` 定义了一个 `print` 方法，然后生成一个 `Object` 的实例 `obj`。`obj`直接继承了 `Object.prototype`的属性和方法，可以直接使用`obj.print` 调用 `print` 方法。也就是说，`obj`对象的 `print` 方法实质上就是调用 `Object.prototype.print`方法。

## Object()
`Object`本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数为空（或者为`undefined` 和 `null`），`Object()`返回一个空对象。
```
let obj = Object();
// 等同于
let obj = Object(undefined);
let obj = Object(null);

obj instanceof Object       // true
```
上面代码的含义，是将`undefined` 和 `null` 转为对象，结果得到了一个空对象 `obj`。

`instanceof` 运算符用来验证，一个对象是否为制定的构造函数的实例。`obj instanceof Object` 返回 `true`，就表示`obj`对象是`Object`的实例。

## Object构造函数
`Object` 不仅可以当做工具函数使用，还可以当做构造函数使用，即前面可以使用`new`命令。

`Object` 构造函数的首要用途，是直接通过它来生成新对象。
```
let obj = new Object();
```
> 注意，通过 let obj = new Object() 的写法生成新对象，与字面量的写法 let obj = {} 是等价的。或者说，后者只是前者的一种简便写法。

`Object` 构造函数的用法与工具方法很相似，几乎一模一样。使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象。

```
let i1 = {a: 1};
let i2 = new Object(i1);
i1 === i2           // true

let obj = new Object(123);
obj instanceof Number       // true
```
虽然用法相似，但是`Object(value)`与`new Object(value)`两者的语义是不同的，`Object(value)`表示将`value`转为一个对象，`new Object(value)`则表示新生成一个对象，它的值是`value`。

## Object的静态方法
所谓“静态方法”，是指部署在`Object`对象自身的方法。

### Object.keys(),Object.getOwnPropertyNames()
`Object.keys`方法和`Object.getOwnPropertyNames`方法都用来遍历对象的属性。

`Object.keys`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的(而不是继承的)所有属性名。
```
let obj = {
    p1: 123,
    p2: 456
};

Object.keys(obj)        // ["p1", "p2"]
```
`Object.getOwnPropertyNames`方法与`Object.keys`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。
```
let obj = {
    p1: 123,
    p2: 456
};

Object.getOwnPropertyNames(obj)     // ["p1", "p2"]
```