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