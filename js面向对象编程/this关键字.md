# this 关键字

## 涵义

`this`就是属性或方法“当前”所在的对象。

```
this.property
```

上面代码中，`this`就代表`property`属性当前所在的对象

实例

```
var person = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

person.describe()
// "姓名：张三"
```

上面代码中，`this.name`表示`name`属性所在的那个对象。由于`this.name`是在`desceibe`方法中调用，而`desceibe`方法所在的当前对象是`person`，因此`this`指向`person`，`this.name`就是`person.name`

由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即`this`的指向是可变的

```
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var B = {
  name: '李四'
};

B.describe = A.describe;
B.describe()
// "姓名：李四"
```

上面代码中，`A.desceibe`属性被赋给`B`，于是`B.desceibe`就表示`desceibe`方法所在的当前对象是`B`，所以`this.name`就指向`B.name`

只要函数被赋给另一个变量，`this`的指向就会变

```
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var name = '李四';
var f = A.describe;
f() // "姓名：李四"
```

上面代码中，`A.desceibe`被赋值给变量`f`，内部的`this`就会指向`f`运行时所在的对象

网页编程例子

```
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">

<script>
function validate(obj, lowval, hival){
  if ((obj.value < lowval) || (obj.value > hival))
    console.log('Invalid Value!');
}
</script>
```

上面代码是一个文本输入框，每当用户输入一个值，就会调用`onChange`回调函数，验证这个值是否在指定范围。浏览器会向回调函数传入当前对象，因此`this`就代表传入当前对象（即文本框），然后就可以从`this.value`上面读取到用户的输入值

JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，`this`就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，`this`的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方

## 实质

JavaScript 语言之所以有`this`的设计，跟内存里面的数据结果有关系

```
let obj = { foo: 5 }
```

上面的代码将一个对象赋值给变量`obj`。JavaScript 引擎会现在内存里面，生成一个对象`{foo: 5}`，然后把这个对象的内存地址赋值给变量`obj`。也就是说，变量`obj`是一个地址(reference)。后面如果要读取`obj.foo`，引擎先从`obj`拿到内存地址，然后再从该地址读出原始的对象，返回它的`foo`属性

原始的对象以字典结构保存，每一个属性名都对相应一个属性描述对象。上面例子的`foo`属性，实际上是以下面的形式保存的

```
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```

注意，`foo`属性的值保存在属性描述对象的`value`属性里面

## 使用场合

`this`主要有以下几个使用场合

### 全局环境

全局环境使用`this`，它指的就是顶层对象`window`

```
this === window         // true

function f() {
    console.log(this === window);
}
f()         // true
```

上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，`this`就是指顶层对象`window`

### 构造函数

构造函数中的`this`，指的是实例对象

```
let obj = function (p) {
    this.p = p;
}
```