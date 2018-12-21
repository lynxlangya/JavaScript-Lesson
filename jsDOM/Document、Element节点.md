# Document 节点

## 概述

`document`节点对象代表整个文档，每张网页都有自己的`document`对象。`window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用

`document`对象有不同的办法可以获取

- 正常的网页，直接使用`document`或`window.document`
- `iframe`框架里面的网页，使用`iframe`节点的`contenetDocuemnt`属性
- Ajax 操作返回的文档，使用`XMLHttpRequest`对象的`responseXML`属性
- 内部节点的`ownerDocument`属性

`document`对象继承了`EventTarget`接口、`Node`接口、`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用。除此之外，`document`对象还有很多自己的属性和方法

## 属性

### 快捷方式属性

一下属性是指向文档内部的某个节点的快捷方式

#### document.defaultView

`document.defaultView`属性返回`document`对象所属的`window`对象。如果当前文档不属于`window`对象，该属性返回`null`

```js
document.defaultView === window; // true
```

#### document.doctype

对于 HTML 文档来说，`document`对象一般有两个子节点。第一个子节点是`document.doctype`，指向`<DOCTYPE>`节点，即文档类型（Document Type Declaration，简写 DTD）节点。HTML 的文档类型节点，一般写成`<!DOCTYPE html>`。如果网页没有声明 DTD，该属性返回`null`

```js
let doctype = document.doctype;
doctype; // "<!DOCTYPE html>"
doctype.name; // "html"
```

### document.querySelector()，document.querySelectorAll()

`document.querySelector`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`

```js
var el1 = document.querySelector(".myclass");
var el2 = document.querySelector("#myParent > [ng-click]");
```

`docuemnt.querySelectorAll`方法与`querySelector`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点

```js
elementList = document.querySelectorAll(".myclass");
```

这两个方法的参数，可以是都好分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的

```js
var matches = document.querySelectorAll("div.note, div.alert");
```

上面代码返回`class`属性是`note`或`alert`的`div`元素

# Element 节点

`Element`节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化为一个`Element`节点对象

元素节点的`nodeType`属性都是`1`

```js
let p = document.querySelector("p");
p.nodeName; // "P"
p.nodeType; // 1
```

`Element`对象继承了`Node`接口，因此`Node`的属性和方法在`Element`对象都存在。此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点，比如`<a>`元素的节点对象由`HTMLAnchorElement`构造函数生成，`<button>`元素的节点对象由`HTMLButtonElement`构造函数生成。因此，元素节点不是一种对象，而是一组对象，这些对象除了继承`Element`的属性和方法，还有各自构造函数的属性和方法

## 实例属性

### 元素特性和相关属性

#### Element.id

`Element.id`属性返回指定元素的`id`属性，该属性可读写

```js
// HTML 代码为 <p id="foo">
var p = document.querySelector("p");
p.id; // "foo"
```

注意，`id`属性的值是大小写敏感，即浏览器能正确识别`<p id='foo'>`和`<p id='FOO'>`这两个元素的`id`属性，但是最好不要这样命名

#### Element.tagName

`Element.tagName`属性返回指定元素的大写标签名，与`nodeName`属性的值相等

```js
// HTML代码为
// <span id="myspan">Hello</span>
var span = document.getElementById("myspan");
span.id; // "myspan"
span.tagName; // "SPAN"
```

#### Element.lang

`Element.lang`属性返回当前元素的语言设置。该属性可读写

```js
// HTML 代码如下
// <html lang="en">
document.documentElement.lang; // "en"
```

### 元素状态的相关属性

#### Element.hidden

`Element.hidden`属性返回一个布尔值，表示当前元素的`hidden`属性，用来控制当前元素是否可见

```js
var btn = document.getElementById("btn");
var mydiv = document.getElementById("mydiv");

btn.addEventListener(
  "click",
  function() {
    mydiv.hidden = !mydiv.hidden;
  },
  false
);
```

### Element.innerHTML

`Element.innerHTML`属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括`<HTML>`和`<body>`元素

如果将`innerHTML`属性设为空，等于删除所有它包含的所有节点

```js
el.innerHTML = "";
```

上面代码等于将`el`节点变成一个空节点，`el`原来包含的节点被全部删除

注意，读取属性值的时候，如果文本节点包含`&`、小于号（`<`）和大于号（`>`），`innerHTML`属性会将它们转为实体形式`&amp;`、`&lt;`、`&gt`。如果想得到原文，建议使用`element.textContent`属性

```js
// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById("para").innerHTML;
// 5 &gt; 3
```

写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有`<script>`标签，虽然可以生成`script`节点，但是插入的代码不会执行

```js
let name = "<script>alert('haha')</script>";
el.innerHTML = name;
```

上面代码将脚本插入内容，脚本并不会执行。但是，`innerHTML`还是有安全风险的

```js
let name = "<img src = x onerror = alert(1)>";
el.innerHTML = name;
```

上面代码中，`alert`方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用`textContent`属性代替`innerHTML`

### Element.outerHTML

`Element.outerHTML`属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素

```js
// HTML 代码如下
// <div id="d"><p>Hello</p></div>
var d = document.getElementById("d");
d.outerHTML;
// '<div id="d"><p>Hello</p></div>'
```

`outerHTML`属性是可读写的，对它进行赋值，等于替换掉当前元素

```js
// HTML 代码如下
// <div id="container"><div id="d">Hello</div></div>
var container = document.getElementById("container");
var d = document.getElementById("d");
container.firstChild.nodeName; // "DIV"
d.nodeName; // "DIV"

d.outerHTML = "<p>Hello</p>";
container.firstChild.nodeName; // "P"
d.nodeName; // "DIV"
```

上面代码中，变量`d`代表子节点，它的`outerHTML`属性重新赋值以后，内层的`div`元素就不存在了，被 `p`元素替换了。但是，变量`d`依然指向原来的`div`元素，这表示被替换的`DIV`元素还存在与内存中。

注意，如果一个节点没有父节点，设置`outerHTML`属性会报错

```js
let div = document.createElement("div");
div.outerHTML = "<p>test</p>";
// DOMException: This element has no parent node.
```

上面代码中，`div`元素没有父节点，设置`outerHTML`属性会报错

## 实例方法

### 属性相关方法

元素节点提供六个方法，用来操作属性

- `getAttribute()`: 读取某个属性的值
- `getAttributeNames()`: 返回当前元素的所有属性名
- `setAttribute()`: 写入属性值
- `hasAttribute()`: 某个属性是否存在
- `hasAttributes()`: 当前元素是否有属性
- `removeAttribute()`: 删除属性

