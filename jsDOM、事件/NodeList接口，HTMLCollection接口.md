# NodeList 接口，HTMLCollection 接口

节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList`和`HTMLCollection`

这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是`NodeList`实例或`HTMLCollection`实例。主要区别是，`NodeList`可以包含多种类型的节点，`HTMLCollection`只能包含 HTML 元素节点

## NodeList 接口

### 概述

`NodeList`实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到`NodeList`实例

- `Node.childNodes`
- `document.querySelectorAll()`等节点搜索方法

```js
document.body.childNodes instanceif NodeList    // true
```

## ParentNode 接口，ChildNode 接口

节点对象除了继承 Node 接口以外，还会继承其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法

## ParentNode 接口

如果当前节点是父节点，就会继承`ParentNode`接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFrament）拥有子节点，因此只有这三类节点会继承`ParentNode`接口

### ParentNode.children

`children`属性返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。该属性只读。

下面是遍历某个节点的所有元素子节点的示例

```js
for (let i = 0; i < el.length; i++) {
  // ...
}
```

注意，`children`属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值`HTMLCollection`实例的`length`属性为`0`

另外，`HTMLCollection`是动态集合，会实时反映 DOM 的任何变化

### ChildNode 接口

如果一个节点有父节点，那么该节点就继承了`ChildNode`接口

### ChildNode.remove()

`remove`方法用于从父节点移除当前节点

```js
el.remove();
```

上面代码在 DOM 里面移除了`el`节点
