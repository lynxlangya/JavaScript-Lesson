# Object 对象

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

## Object 构造函数

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

## Object 的静态方法

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

# Array 对象

## 构造函数

`Array`是 JavaScript 的原生对象，同事也是一个构造函数，可以用它生成新的数组。

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

如果数组成员是`undefined`或`null`或空位，会被转成空字符串。

```
[undefined, null].join('#')     // '#'

['a',, 'b'].join('-')           // 'a--b'
```

通过`call`方法，这个方法也可以用于字符串或类似数组的对象。

```
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

let obj = {0: 'a', 1: 'b', length: 2};
Array.prototype.join.call(obj, '-')         // 'a-b'
```

## concat()

`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后补，然后返回一个新的数组，原数组不变。

```
['hello'].concat(['world'])
// ["hello", "world"]
		// 0: "hello"
		// 1: "world"
		// length: 2

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]
```

除了数组作为参数，`concat`也接受其他类型的值作为参数，添加到目标数组尾部。

```
[1, 2, 3].concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
```

如果数组成员包括对象，`concat`方法返回但钱数组的一个浅拷贝。所谓“浅拷贝”明智的是新数组拷贝的是对象的引用。

```
let obj = {a: 1};
let oldArray = [obj];

let new Array = oldArray.concat();

obj.a = 2;
newArray[0].a           // 2
```

上面代码中，原数组包含一个对象，`caocat`方法生成的新数组包含这个对象的引用。所以，改变元对象以后，新数组跟着改变。

## reverse()

`reverse`方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。

```
let a = ['a', 'b', 'c'];

a.revarse()         // ["c", "b", "a"]
a                   // ["c", "b", "a"]
```

## slice()

`slice`方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

```
arr.slice(start, end);
```

它的第一个参数为起始位置(从 0 开始)，第二个参数为终止位置(但该位置的元素本身不包括在内)。如果省略第二个参数，则一直返回到原数组的最后一个成员。

```
var a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```

最后一个例子`slice`没有参数，实际上等于返回一个原数组的拷贝。

如果`slice`方法的参数是负数，则表示倒数计算的位置。

```
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```

上面代码中，`-2`表示倒数计算的第二个位置，`-1`表示倒数计算的第一个位置。

如果第一个参数大于或等于数组长度，或者第二个参数小于第一个参数，则返回空数组。

`slice`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```
Array.prototype.slice.call({0:'a', 1:'b', length:2})
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

上面代码的参数都不是数组，但是通过`call`方法，在它们上面调用`slice`方法，就可以把它们转为真正的数组。

## splice()

`splice`方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。

```
arr.splice(start, count, addElement1, addElement2, ...);
```

`splice`的第一个参数是删除的起始位置(从 0 开始)，第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```
let a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
```

上面代码从原数组 4 号位置，删除了两个数组成员。

```
let a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]
```

上面代码除了删除成员，还插入了两个新成员。

起始位置如果是负数，就表示从倒数位置开始删除

```
let a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]
a               // ['a', 'b', 'e', 'f']
```

上面代码表示，从倒数第四个位置`c`开始删除两个成员。

如果只是单纯地插入元素，`splice`方法的第二个参数可以设为`0`。

```
let a = [1, 1, 1,];

a.splice(1, 0, 2)       // 没有删除元素
a                       // [1, 2, 1, 1]
```

如果值提供第一个参数，等同于将原数组在制定位置拆分成两个数组。

```
let a = [1, 2, 3, 4];
a.splice(2)     // [3, 4]
a               // [1, 2]
```

## sort()

`sort`方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

```
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
```

上面代码的最后两个例子，需要特殊注意。`sort`方法不是按照大小排序，而是按照字典顺序。也就是说，数值会被先转成字符串，在按照字典顺序进行比较，所以`101`排在`11`的前面。

如果想让`sort`方法按照自定义方式排序，可以传入一个函数作为参数。

```
[10111, 1101, 111].sort(function (a, b) {
	return a - b;
})
// [111, 1101, 10111]
```

上面代码中，`sort`的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

```
[
	{ name: "张三", age: 30 },
	{ name: "李四", age: 24 },
	{ name: "王五", age: 28  }
].sort(function (o1, o2) {
	return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

## map()

`map`方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新的数组返回。

```
let numbers = [1, 2, 3];

numbers.map(function (n) {
	return n + 1;
});
// [2, 3, 4]

numbers
// [1, 2, 3]
```

上面代码中，`number`数组的所有成员依次执行参数函数，运行结果组成一个新数组返回，原数组没有变化。

`map`方法接受一个函数作为参数。该函数调用时，`map`方法向它传入三个参数：当前成员、当前位置和数组本身。

```
[1, 2, 3].map(function(elem, index, arr) {
	return elem * index;
});
// [0, 2, 6]
```

上面代码中，`map`方法的回调函数有三个参数，`elem`为当前成员的值，`index`为当前成员的位置，`arr`为原数组（`[1, 2, 3]`）。

`map`方法还可以接受第二个参数，用来绑定回调函数内部的`this`变量

```
let arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
	return this[e];
}, arr)
// ['b', 'c']
```

上面代码通过`map`方法的第二个参数，将回调函数内部的`this`对象，指向`arr`数组。

如果数组有空位，`map`方法的回调函数在这个位置不会执行， 会跳过数组的空位。

```
var f = function (n) { return 'a' };

[1, undefined, 2].map(f)    // ["a", "a", "a"]
[1, null, 2].map(f)         // ["a", "a", "a"]
[1, , 2].map(f)             // ["a", , "a"]
```

上面代码中，`map`方法不会跳过`undefined`和`null`，但是会跳过空位。

## forEach()

`forEach`方法与`map`方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach`方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用`map`方法，否则使用`forEach`方法。

`forEach`的用法与`map`方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。

```
function log(element, index, array) {
	console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

上面代码中，`forEach`遍历数组不是为了得到返回值，而是为了在屏幕输出内容，所以不必使用`map`方法。

`forEach`方法也可以接受第二个参数，绑定参数函数的`this`变量。

```
var out = [];

[1, 2, 3].forEach(function(elem) {
	this.push(elem * elem);
}, out);

out             // [1, 4, 9] elem是当前值，相乘
```

上面代码中，空数组`out`是`forEach`方法的第二个参数，结果，灰调函数内部的`this`关键字就指向`out`。

注意，`forEach`方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用`for`循环。

```
let arr = [1, 2, 3];

for(let i = 0; i < arr.length; i++){
		if(arr[i] === 2) break;
		console.log(arr[i]);        // 1
}
```

上面代码中，执行到数组的第二个成员时，就会中断执行。`forEach`方法做不到这一点。

`forEach`方法也会跳过数组的空位。

```
var log = function (n) {
	console.log(n + 1);
};

[1, undefined, 2].forEach(log)
// 2
// NaN
// 3

[1, null, 2].forEach(log)
// 2
// 1
// 3

[1, , 2].forEach(log)
// 2
// 3
```

上面代码中，`forEach`方法不会跳过`undefined`和`null`，但会跳过空位。

## filter()

`filter`方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。该方法不会改变原数组。

```
[1, 2, 3, 4, 5].filter(function (elem) {
	return (elem > 3);
})
// [4, 5]
```

上面代码将大于`3`的数组成员，作为一个新数组返回。

```
var arr = [0, 1, 'a', false];

arr.filter(Boolean)
// [1, "a"]
```

上面代码中，`filter`方法返回数组`arr`里面所有布尔值为`true`的成员。

`filter`方法的参数函数可以接受三个参数：当前成员、当前位置和整个数组。

```
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
	return index % 2 === 0;
});
// [1, 3, 5]
```

上面代码返回偶数位置的成员组成的新数组。

`filter`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

```
let obj = {MAX: 3};
let myFilter = function(item){
	if(item > this.MAX) return true;
};
let arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj)		// [8, 4, 9]
```

上面代码中，过滤器`myFilter`内部有`this`变量，它可以被`filter`方法的第二个参数`obj`绑定，返回大于`3`的成员。

## some(), every()

这两个方法类似“断言”(assert)，返回一个布尔值，表示判断数组成员是否符合某种条件。

它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。

`some`方法是只要一个成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则返回`false`。

```
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

上面代码中，如果数组`arr`有一个成员大于等于 3，`some`方法就返回`true`。

`every`方法是所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`fasle`。

```
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

上面代码中，数组`arr`并非所有成员大于等于`3`,所以返回`fasle`。

注意，对于空数组，`some`方法返回`false`，`every`方法返回`true`，回调函数都不会执行。

```
function isEven(x) { return x % 2 === 0 }

[].some(isEven) // false
[].every(isEven) // true
```

`some`和`every`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

## indexOf(), lastIndexOf()

`indexOf`方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回`-1`。

```
var a = ['a', 'b', 'c'];

a.indexOf('b') // 1
a.indexOf('y') // -1
```

`indexOf`方法还可以接受第二个参数，表示搜索的开始位置。

```
['a', 'b', 'c'].indexOf('a', 1) // -1
```

上面代码从 1 号位置开始搜索字符`a`，结果为`-1`，表示没有搜索到。

`lastIndexOf`方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回`-1`

```
var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
a.lastIndexOf(7) // -1
```

注意，这两个方法不能用来搜索`NaN`的位置，即它们无法确定数组成员是否包含`NaN`。

```
[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```

这是因为这两个方法内部，使用严格相等运算符（`===`）进行比较，而`NaN`是唯一一个不等于自身的值。

## 链式使用

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用

```
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(function (email) {
  console.log(email);
});
// "tom@example.com"
```

上面代码中，先产生一个所有 Email 地址组成的数组，然后再过滤出以`t`开头的 Email 地址，最后将它打印出来。

# 包装对象

## 定义

对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。

所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的`Number`、`String`、`Boolean`三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

```
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);
```

上面代码中，基于原始类型的值，生成了三个对应的包装对象。

```
typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```

包装对象的最大目的，首先是使得 JavaScript 的对象涵盖所有的值，其次使得原始的值可以方便地调用某些方法。

`Number`、`String`和`Boolean`如果不作为构造函数调用（即调用时不加`new`），常常用于将任意类型的值转为数值、字符串和布尔值。

```
Number(123) // 123
String('abc') // "abc"
Boolean(true) // true
```

这三个对象作为狗在函数使用（带有`new`）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有`new`），可以将任意类型的值，转为原始类型的值。

## 实例方法

三种包装对象各自提供了许多实例方法，这里介绍两种它们共同具有、从`Object`对象继承的方法：`valueOf`和`toString`

### valueOf()

`valueOf`方法返回包装对象实例对应的原始类型的值。

```
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
```

### toString()

`toString`方法返回对应的字符串形式。

```
new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
```

## 原始类型与实例对象的自动转换

原始类型的值，可以自动当做包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例。

比如，字符串可以调用`length`属性，返回字符串的长度。

```
'abc'.length 		// 3
```

上面代码中，`abc`是一个字符串，本身不是对象，不能调用`length`属性。JavaScript 引擎自动将其转为包装对象，在这个对象上调用`length`属性。调用结束后，这个临时对象就会被销毁。这就叫原始类型与实例对象的自动转换。

```
var str = 'abc';
str.length // 3

// 等同于
var strObj = new String(str)
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
strObj.length // 3
```

上面代码中，字符串`abc`的包装对象提供了多个属性。

自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。

```
let s = 'Hello World';
s.x = 123l
s.x		// undefined
```

上面代码为字符串`s`添加了一个`x`属性，结果无效，总是返回`undefined`

另一方面，调用结束后，包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果要为字符串添加属性，只有在它的原型对象`String.prototype`上定义

## 自定义方法

除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用

比如，我们可以新增一个`double`方法，使得字符串和数组翻倍

```
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double()
// 246
```

上面代码在`123`外面必须要加上圆括号，否则后面的点运算符（`.`）会被解释成小数点。

但是，这种自定义方法和属性的机制，只能定义在包装对象的原型上，如果直接对原始类型的变量添加属性，则无效。

```
var s = 'abc';

s.p = 123;
s.p // undefined
```

上面代码直接对字符串`abc`添加属性，结果无效。主要原因是上面说的，这里的包装对象是自动生成的，赋值后自动销毁，所以最后一行实际上调用的是一个新的包装对象。

# Boolean 对象

## 概述

`Boolean`对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。

```
var b = new Boolean(true);

typeof b // "object"
b.valueOf() // true
```

上面代码的变量`b`是一个`Boolean`对象的实例，它的类型是对象，值为布尔值`true`。

注意，`false`对应的包装对象实例，布尔运算的结果也是`true`

```
if (new Boolean(false)) {
  console.log('true');
} // true		；false也是个布尔值啊

if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出
```

上面代码的第一个例子之所以得到`true`，是因为`false`对应的包装对象实例是一个对象，进行逻辑运算时，被自动转化成布尔值`true`（因为所有对象对应的布尔值都是`true`）。而实例的`valueOf`方法，则返回实例对应的原始值，本例为`false`。

## Boolean 函数的类型转换作用

`Boolean`对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这是`Boolean`就是一个单纯的工具方法。

```
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
```

上面代码中几种得到`true`的情况，需认真记住。

使用双重的否运算符（`!`）也可以将任意值转为对应的布尔值。

```
!!undefined // false
!!null // false
!!0 // false
!!'' // false
!!NaN // false

!!1 // true
!!'false' // true
!![] // true
!!{} // true
!!function(){} // true
!!/foo/ // true
```

最后，对一些特殊值，`Boolean`对象前面加不加`new`，会得到完全相反的结果，必须小心。

```
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) {
  console.log('true');
} // true
```

# Number 对象

## 概述

`Number`对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

作为构造函数时，它用于生成值为数值的对象。

```
var n = new Number(1);
typeof n // "object"
```

上面代码中，`Number`对象作为构造函数使用，返回一个值为`1`的对象。

作为工具函数时，他可以将任何类型的值转为数值。

```
Number( true)			// 1
```

上面代码将布尔值`true`转为数值`1`

## 静态属性

`Number`对象拥有一下一些静态属性（即直接定义在`Number`对象上的属性，而不是定义在实例上的属性）。

- `Number.POSITIVE_INFINITY`: 正的无限，指向`Infinity`
- `Number.NEGATIVE_INFINITY`: 负的无限，指向`-Infinity`
- `Number.NaN`: 表示非数值，指向`NaN`
- `Number.MIN_VALUE`: 表示最小的正数（即最接近 0 的正数，在 64 为浮点数体系中为`5e-324`），相应的，最接近 0 的负数为`-Number.MIN_VALUE`
- `Number.MAX_SAFE_INTEGER`: 表示能够精确表示的最大整数，即`9007199254740991`
- `Number.MIN_SAFE_INTEGER`: 表示能后精确表示的最小整数，即`-9007199254740991`

```
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991
```

# String 对象

## 概述

`String`对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

```
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

s2.valueOf() // "abc"
```

上面代码中，变量`s1`是字符串，`s2`是对象。由于`s2`是字符串对象，`s2.valueOf`方法返回的就是它所对应的原始字符串。

# Math 对象

`Math`是 JavaScript 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在`Math`对象上调用。

## 静态属性

`Math`对象的静态属性，提供以下一些数学常数

- `Math.E`：常数`e`
- `Math.LN2`：2 的自然对数
- `Math.LN10`：10 的自然对数
- `Math.LOG2E`：以 2 为底的`e`的对数
- `Math.LOG10E`：以 10 为底的`e`的对数
- `Math.PI`：常数`π`
- `Math.SQRT1_2`：0.5 的平方根
- `Math.SQRT2`：2 的平方根

```
Math.E 			// 2.718281828459045
Math.LN2 		// 0.6931471805599453
Math.LN10 		// 2.302585092994046
Math.LOG2E 		// 1.4426950408889634
Math.LOG10E 		// 0.4342944819032518
Math.PI 		// 3.141592653589793
Math.SQRT1_2 		// 0.7071067811865476
Math.SQRT2 		// 1.4142135623730951
```

这些属性都是只读的，不能修改

## 静态方法

`Math`对象提供以下一些静态方法

- `Math.abs()`: 绝对值
- `Math.ceil()`: 向上取整
- `Math.floor()`: 向下取整
- `Math.max()`: 最大值
- `Math.min()`: 最小值
- `Math.pow()`: 指数运算
- `Math.sqrt()`: 平方根
- `Math.log()`: 自然指数
- `Math.exp()`: `e`的指数
- `Math.round()`: 四舍五入
- `Math.random()`: 随机数

### Math.abs()

`Math.abs`方法返回参数值的绝对值

```
Math.abs(1)			// 1
Math.abs(-1)		// 1
```

### Math.max(),Math.min()

`Math.max`方法返回参数之中最大的那个值，`Math.min`返回最小的那个值。如果参数为空，`Math.min`返回`Infinity`,`Math.max`返回`-Infinity`。

```
Math.max(2, -1, 5)			// 5
Math.min(2, -1, 5)			// -1
Math.max()			// Infinity
Math.min()			// -Infinity
```

### Math.floor(), Math.ceil()

`Math.floor`方法返回小于参数值的最大整数（地板值）

```
Math.floor(3.2)		// 3
Math.floor(-3.2)	// -4
```

`Math.ceil`方法返回大于参数值的最小整数（天花板值）

```
Math.ceil(3.2)		// 4
Math.ceil(-3.2)		// -3
```

这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数

```
function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2)		// 3
ToInteger(3.5) 		// 3
ToInteger(3.8) 		// 3
ToInteger(-3.2) 	// -3
ToInteger(-3.5) 	// -3
ToInteger(-3.8) 	// -3
```

### Math.round()

`Math.round`方法用于四舍五入

```
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1

// 等同于
Math.floor(x + 0.5)
```

注意，他对负数的处理（主要是对`0.5`的处理）

```
Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

### Math.pow()

`Math.pow`方法返回以第一个参数为底数、第二个参数为幂的指数值

```
// 等同于 2 * 2
Math.pow(2, 2) // 4

// 等同于 2 * 2 * 2
Math.pow(2, 3) // 8
```

下面是计算圆面积的方法

```
let radius = 20;
let area = Math.PI * Math.pow(radius, 2);
```

### Math.sqrt()

`Math.sqrt`方法返回参数值的平方根。如果参数是一个负值，则返回`NaN`

```
Math.sqrt(4)		// 2
Math.sqrt(-4)		// NaN
```

### Math.log()

`Math.log`方法返回以`e`为底的自然对数值

```
Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046
```

如果要计算以 10 为底数的对数，可以先用`Math.log`求出自然对数，然后除以`Math.LN10`；求以 2 为底的对数，可以除以`Math.LN2`

```
Math.log(100)/Math.Ln10			// 2
Math.log(8)/Math.LN2			// 3
```

### Math.exp()

`Math.exp`方法返回常数`e`的参数次方

```
Math.exp(1)			// 2.718281828459045
Math.exp(3)			// 20.085536923187668
```

### Math.random()

`Math.random()`返回 0 到 1 之间的一个伪随机数，可能等于 0，但是一定小于 1。

```
Math.random()			// 0.49929512398302545
```

任意范围的随机数生成函数如下

```
function sjs(min, max) {
	return Math.random() * (max - min) + min;
}

sjs(22, 120)			// 115.13572569250084
```

任意范围的随机整数生成函数如下

```
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

返回随机字符的例子如下

```
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // "tR-yyL"
```

上面代码中，`random_str`函数接受一个整数作为参数，返回变量`ALPHABET`内的随机字符所组成的指定长度的字符串。

### 三角函数方法

`Math`对象还提供一系列三角函数方法

- `Math.sin()`：返回参数的正弦（参数为弧度值）
- `Math.cos()`：返回参数的余弦（参数为弧度值）
- `Math.tan()`：返回参数的正切（参数为弧度值）
- `Math.asin()`：返回参数的反正弦（返回值为弧度值）
- `Math.acos()`：返回参数的反余弦（返回值为弧度值）
- `Math.atan()`：返回参数的反正切（返回值为弧度值）

```
Math.sin(0) // 0
Math.cos(0) // 1
Math.tan(0) // 0

Math.sin(Math.PI / 2) // 1

Math.asin(1) // 1.5707963267948966
Math.acos(1) // 0
Math.atan(1) // 0.7853981633974483
```

# Date 对象

`Date`对象是 JavaScript 原生的时间库。它以 1970 年 1 月 1 日 00:00 作为时间的零点，可以表示的时间范围是前后各 1 亿天(单位为毫秒)。

## 普通函数的用法

`Date` 对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。

```
Date();
// "Mon Dec 10 2018 12:13:02 GMT+0800 (中国标准时间)"
```

注意，即使带有参数，`Date`作为普通函数使用时，返回的还是当前时间

```
Date(1996, 4, 18);
// "Mon Dec 10 2018 12:14:10 GMT+0800 (中国标准时间)"
```

上面代码说明，无论有没有参数，直接调用`Date`总是返回当前时间。

## 构造函数的用法

`Date`还可以当作构造函数使用。对它使用`new`命令，会返回一个`Date`对象的实例。如果不加参数，实例代表的就是当前时间。

```
let today = new Date();
```

`Date`实例有一个独特的地方。其他对象求值的时候，都是默认调用`.valueOf()`方法，但是`Date`实例求值的时候，默认调用的是`toString()`方法，这导致对`Date`实例求值，返回的是一个字符串，代表该实例对应的时间。
