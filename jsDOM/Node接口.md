# Node 接口

## 属性

### Node.prototype.nodeType

`nodeType`属性返回一个整数值，表示节点的类型

```js
document.nodeType; // 9
```

文档节点的类型值为 9

Node 对象定义了几个常量，对应这些类型值

```js
document.nodeType === Node.DOCUMENT_NODE; // true
```

上面代码中，文档节点的`nodeType`属性等于常量`Node.DOCUMENT_NODE`

不同节点的`nodeType`属性值和对应的常量如下

- 文档节点（document）：9，对应常量`Node.DOCUMENT_NODE`
- 元素节点（element）：1，对应常量`Node.ELEMENT_NODE`
- 属性节点（attr）：2，对应常量`Node.ATTRIBUTE_NODE`
- 文本节点（text）：3，对应常量`Node.TEXT_NODE`
- 文档片断节点（DocumentFragment）：11，对应常量`Node.DOCUMENT_FRAGMENT_NODE`
- 文档类型节点（DocumentType）：10，对应常量`Node.DOCUMENT_TYPE_NODE`
- 注释节点（Comment）：8，对应常量`Node.COMMENT_NODE`

确定节点类型时，使用`nodeType`属性是常用方法

```js
let node = deoument.documentElement,firstChild;
if (node.nodeType === Node.ELEMENT_NODE) {
    console.log('该节点是元素节点')；
}
```

### Node.prototype.nodeName

`nodeName`属性返回节点的名称

```js
// HTML 代码如下
// <div id="d1">Hello World</div>

let div = document.getElementById("d1");
div.nodeName; // "DIV"
```

上面代码中，元素节点`<div>`的`nodeName`属性就是大写的标签名`DIV`

不同节点的`nodeName`属性值如下

- 文档节点（document）：`#document`
- 元素节点（element）：大写的标签名
- 属性节点（attr）：属性的名称
- 文本节点（text）：`#text`
- 文档片断节点（DocumentFragment）：`#document-fragment`
- 文档类型节点（DocumentType）：文档的类型
- 注释节点（Comment）：`#comment`

### Node.prototype.nodeValue

`nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写

只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的`nodeValue`可以返回结果，其他类型的节点一律返回`null`。同样的，也只有这三类节点可以设置`nodeValue`属性的值，其他类型的节点设置无效。

```js
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById("d1");
div.nodeValue; // null
div.firstChild.nodeValue; // "hello world"
```

上面代码中，`div`是元素节点，`nodeValue`属性返回`null`。`div.firstChild`是文本节点，所以返回文本值

### Node.prototype.textContent

`textContent`属性返回当前节点和它所有后代节点的文本内容

```js
// HTML 代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById("divA").textContent;
// This is some text
```

`textContent`属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容

### Node.prototype.baseURI

`baseURI`属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径 URI。该属性为只读

```js
// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI;
// "http://www.example.com/index.html"
```

如果无法督导网页的 URI，`baseURI`属性返回`null`

该属性的值一般由当前网址的 URL（即`window.localtion`属性）决定，但是可以使用 HTML 的`<base>`标签，改变该属性的值

```js
<base href="http://www.example.com/page.html">
```

设置了以后，`baseURI`属性就返回`<base>`标签设置的值

### Node.prototype.ownerDocument

`Node.ownerDocument`属性返回房钱节点所在的顶层文档对象，即`document`对象

```js
let d = p.ownerDocument;
d === document; //true
```

`document`对象本身的`ownerDocuemnt`属性，返回`null`

### Node.prototype.nextSibling

`Node.nextSibling`属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有统计节点，则返回`null`

```js
// HTML 代码如下
// <div id="d1">hello</div><div id="d2">world</div>
var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");

d1.nextSibling === d2; // true
```

上面代码中，`d1.nextSibling`就是紧跟在`d1`后面的同级节点`d2`

### Node.prototype.previousSibling

`previousSibling`属性返回当前节点前面的、距离最近的一个同级节点。如果前面没有同级节点，则返回`null`

```js
// HTML 代码如下
// <div id="d1">hello</div><div id="d2">world</div>
var div1 = document.getElementById("d1");
var div2 = document.getElementById("d2");

d2.previousSibling === d1; // true
```

上面代码中，`d2.previousSibling`就是`d2`前面的同级节点`d1`

注意，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。

### Node.prototype.parentNode

`parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentFragment）

```js
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

上面代码中，通过`node.parentNode`属性将`node`节点从文档里面移除

文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是`null`

### Node.prototype.parentElement

`parentElement`属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`

```js
if (node.parentElement) {
  node.parentElement.style.colr = "red";
}
```

上面代码中，父元素节点的样式设定了红色

由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点。`parentElement`属性相当于把后两种父节点都排除了

### Node.prototype.firstChild，Node.prototype.lastChild

`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`

```js
// HTML 代码如下
// <p id="p1"><span>First span</span></p>
var p1 = document.getElementById("p1");
p1.firstChild.nodeName; // "SPAN"
```

上面代码中，`p`元素的第一个子节点是`span`元素

注意，`firstChild`返回的除了元素节点，还可能是文本节点或注释节点

```js
// HTML 代码如下
// <p id="p1">
//   <span>First span</span>
//  </p>
var p1 = document.getElementById("p1");
p1.firstChild.nodeName; // "#text"
```

上面代码中，`p`元素与`span`元素之间由空白字符，这导致`firstChild`返回的是文本节点

`lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回`null`。用法和`firstChild`属性相同

## 方法

### Node.prototype.appendChild()

`appendChild`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点

```js
let p = document.createElement("p");
document.body.appendChild(p);
```

上面代码新建一个`<p>`标签，将其插入`document.body`的尾部

如果参数节点是 DOM 已经存在的节点，`appendChild`方法会将其从原来的位置，移动到新位置

```js
let element = document
  .createElement("div")
  .appendChild(document.createElement("b"));
```

上面代码的返回值是`<b></b>`，而不是`<div></div>`

如果`appendChild`方法的参数是`DocumentFragment`节点，那么插入的是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值是一个空的`DocumentFragment`节点

### Node.prototype.hasChildNodes()

`hasChildNodes`方法返回一个布尔值，表示当前节点是否有子节点

### Node.prototype.cloneNode()

`cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点

### Node.prototype.insertBefore()

`insertBefore`方法用于将某个节点插入父节点内部的指定位置

### Node.prototype.removeChild()

`removeChild`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点

### Node.prototype.replaceChild()

`replaceChild`方法用于将一个新的节点，替换当前节点的某个节点

### Node.prototype.contains()

`contains`方法返回一个布尔值，表示参数节点是否满足以下三个条件

- 参数节点为当前节点。
- 参数节点为当前节点的子节点。
- 参数节点为当前节点的后代节点。
