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

## toString()的应用：判断数据类型
`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。
```
let obj = {};
obj.toString()          // "[object Object]"
```
上面代码调用空对象的`toString`方法，结果返回一个字符串`object Object`，其中第二个`Object`表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

由于实例对象可能会自定义`toString`方法，覆盖掉`Object.prototype.toString`方法，所以为了得到类型字符串，最好直接使用`Object.prototype.toString`方法。通过函数的`call`方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
```
Object.prototype.toString.call(value)
```

不同数据类型的`Object.prototype.toString`方法返回值如下：
- 数值：返回`[object Number]`
- 字符串：返回`[object String]`
- 布尔值：返回`[object Boolean]`
- undefined：返回`[object Undefined]`
- null：返回`[object Null]`
- 数组：返回`[object Array]`
- arguments 对象：返回`[object Arguments]`
- 函数：返回`[object Function]`
- Error 对象：返回`[object Error]`
- Date 对象：返回`[object Date]`
- RegExp 对象：返回`[object RegExp]`
- 其他对象：返回`[object Object]`
这就是说，`Object.prototype.toString`可以看出一个值到底是什么类型。
```
Object.prototype.toString.call(2)           // "[object Number]"
Object.prototype.toString.call('')          // "[object String]"
Object.prototype.toString.call(true)        // "[object Boolean]"
Object.prototype.toString.call(undefined)   // "[object Undefined]"
Object.prototype.toString.call(null)        // "[object Null]"
Object.prototype.toString.call(Math)        // "[object Math]"
Object.prototype.toString.call({})          // "[object Object]"
Object.prototype.toString.call([])          // "[object Array]"
```
利用这个特性，可以写出一个比`typeof`运算符更准确的类型判断函数。
```
let type = function (o){
    let s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({});           // "object"
type([]);           // "array"
type(5);            // "number"
type(null);         // "null"
type();             // "undefined"
type(/abcd/);       // "regex"
type(new Date());   // "date"
```
# Array对象
## 构造函数
`Array`是JavaScript的原生对象，同事也是一个构造函数，可以用它生成新的数组。
```
let arr = new Array(2);
arr.length      // 2
arr             // [empty x 2]
```
上面代码中，`Array`构造函数的参数`2`，表示生成一个两个成员的数组，每个位置都是空值。

如果没有使用`new`，运行结果也是一样的。
```
let arr = new Array(2);
// 等同于
let arr = Array(2)
```
`Array`构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。

## 静态方法
### Array.isArray()
`Array.isArray`方法返回一个布尔值，表示参数是否为数组。它可以弥补`typeof`运算符的不足。
```
let arr = [1, 2, 3];

typeof arr          // "object"
Array.isArray(arr)      // true
```
上面代码中，`typeof`运算符只能显示数组的类型是`Object`，而`Array.isArray`方法可以识别数组。

### push(), pop()
`push`方法用于在数组的末端添加一个或多个元素，并返回添加元素后的数组长度。注意，该方法会改变原数组。
```
let arr = [];

arr.push(1);        // 1
arr.push('a');      // 2
arr.push(true,{})   // 4
arr                 // [1, 'a', true, {}]
```
上面代码使用`push`方法，往数组中添加了四个成员。

`pop`方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。
```
let arr = ['a', 'b', 'c'];

arr.pop()       // 'c'
arr             // ['a', 'b']
```
上面的数组使用`pop`方法，删除了`c`。

对空数组使用`pop`方法，不会报错，而是返回`undefined`
```
[].pop()            // undefined
```
`push`和`pop`结合使用，就构成了“后进先出”的栈结构（stack）。
```
let arr = [];

arr.push(1, 2);
arr.push(3);
arr.pop();
arr             // [1, 2]
```
上面代码中，`3`是最后进入数组的，但是最早离开数组。

## shift(), unshift()
`shift()`方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
```
let a = ['a', 'b', 'c'];

a.shift()       // 此处删除了'a'
a               // ['b', 'c']
```

`shift()`方法可以遍历并清空一个数组
```
let list = [1, 2, 3, 4];
let item;

while (item = list.shift()){
    console.log(item);      // 1, 2, 3, 4
}

list                        // []
```
上面代码通过`list.shift()`方法每次取出一个元素，从而遍历数组。它的前提是数组元素不能是`0`或任何布尔值等于`false`的元素，因此这样的遍历不是很靠谱。

`push()`和`shift()`结合使用，就构成了“先进先出”的队列结构。

`unshift()`方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
```
let i = ['a', 'b', 'c'];

i.unshift('x');         // 4
i               // ['x', 'a', 'b', 'c']
```

`unshift()`方法可以接受多个参数，这些参数都会添加到目标数组头部。
```
let arr = ['c', 'd'];
arr.unshift('a', 'b')       // 4
arr             // [ 'a', 'b', 'c', 'd']
```

## join()
`join()`方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分割。
```
let a = [1, 2, 3, 4];

a.join(' ')         // '1 2 3 4'
a.join(‘ | ’)       // "1 | 2 | 3 | 4"
a.join()            // "1,2,3,4"
```
