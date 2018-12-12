# JSON 对象

## JSON 格式

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001 年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式

相比 XML 格式，JSON 格式有两个显著的有点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准

<b style=color:red;>每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值</b>

JSON 对值的类型和何时有严格的规定

> 1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
> 2. 原始类型的值只有四中：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`,`Infinity`,`-Infinity`和`undefined`）
> 3. 字符串必须使用双引号表示，不能使用单引号
> 4. 对象的键名必须放在双引号里面
> 5. 数组或对象最后一个成员的后面，不能加逗号

下面都是合法的 JSON

```
["one", "two", "three"]

{"one":1, "two":2, "three":3}

{"names": ["Faker", "Marshall"]}

[{"name": "Faker"}, {"name": "Marshall"}]
```

下面都是不合法的 JSON

```
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF]        // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用 undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
}       // 属性值不能使用函数和日期对象
```

注意，`null`、空数组和空对象都是合法的 JSON 值

# JSON 对象

`JSON`对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：`JSON.stringify()`和`JSON.parse()`
