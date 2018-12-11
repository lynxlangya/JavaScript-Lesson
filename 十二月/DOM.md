# DOM:

D: document(文档)

O: object(对象)

M: Model(模型)

DOM 把一份文档表示为一颗家谱树。家谱树本身又是一种模型。

一个文档由<html>开始，<html>标签既没有父元素，也没有兄弟元素，所以它就是文档的根标签。

## 节点

节点（node）它表示网络中的一个连接点。一个网络就是由一些节点构成的集合。

在 DOM 里由许多不同类型的节点。其中三种： 元素节点、文本节点和属性节点

### 元素节点

DOM 的原子是元素节点（element node）

标签的名字就是元素的名字，元素可以包含其他元素，没有被包含在其他元素里的唯一元素是<html>元素，它就是我们节点树的根元素。

### 文本节点

元素节点只是节点类型的一种，如果一份文档全部是由一些空白元素构成，它只会有一个结构，但不会由内容显示。文本节点总是被包含在元素节点的内部，但并非所有的元素节点都包含由文本节点。

### 属性节点

属性节点用来对元素做出更具体的描述。例如：几乎每一个元素都有一个`title`属性，而我们可以利用这个属性对包含在元素里的东西做出准确的描述。

```
<p title="this is Marshall">My name is Marshall</p>
```

上面代码中，`p`标签就是元素标签，`title`就是属性标签。`My name is Marshall`就是文本节点。

因为属性总是被放在起始标签里，所以属性节点总是被包含在元素节点中。并非所有的元素都包含属性，但是所有的属性都被元素包含。

## CSS

DOM 并不是与网页结构打交道的唯一技术。我们还可以通过 CSS(层叠样式表)告诉浏览器应该如何显示一份文档的内容。

继承(inheritance)是`CSS`技术中的一项强大功能。类似`DOM`，CSS 也把文档的内容视为一棵节点树。节点树上的各个元素将继承其父元素的样式属性。

`class`属性可以任意应用。

`id`属性却只能在网页里使用一次，不得出现重复的`id`，但是样式表还是可以利用`id`属性为包含在该特定元素里的其他元素定义样式。

`id`属性就像是一个挂钩，它的一头连着文档里的某个元素，另一头连着`CSS`样式表里的某个样式。DOM 也可以使用这种挂钩。

## 获取元素

有 3 种 DOM 方法可获取元素节点，分别是通过元素 ID、通过标签名字和通过类名字来获取。

### getElementById

```
document.getElementById(id);
// 例
document.getElementById("id_name");
```

这个调用将返回一个对象，对应着`document`对象里的一个独一无二的元素

事实上，文档中的每一个元素都是一个对象。利用 DOM 提供的方法能得到任何一个对象。一般来说用不着为文档里的每一个元素都定义一个独一无二的 id 值。 但是 DOM 提供了另一个方法来获取那些没有 id 属性的对象。

### getElementsByTagName

`getElementsByTagName`方法返回一个对象数组

```
document.getElementsByTagName("li");
```

这个调用将返回一个对象数组。

### getElementsByClassName

使用这个方法还可以查找那些带有多个类名的元素，要指定多个类名，只要在字符串参数中用空格分隔类名即可。

不仅类名的实际顺序不重要，就算元素还带有更多的类名也没有关系。

```
let shopping = document.getElementById("purchases");

let sales = shopping.getElementsByClassName("sale");
```

# 知识盘点

- 文档中的每个元素节点都是一个对象
  <b>
- 一份文档就是一棵节点树

- 节点分为不同的类型：元素节点、属性节点和文本节点

- getElementById 将返回一个对象，该对象对应着文档里的一个特定的元素节点

- getElementsByTagName 和 getElementsByClassName 将返回一个对象数组，它们分别对应着文档里的一组特定的元素节点

- 每个节点都是一个对象
  </b>

## 获取和设置属性

### getAttribute

getAttribute 是一个函数。它只有一个参数——你打算查询的属性的名字：

```
object.getAttribute(attribute)
```

获取属性

```
<p title="The test for P">This is just a test</p>
<script>
    let TEST = document.getElementsByTagName("p");
    for(let i = 0; i < TEST.length; i++){
        alert(TEST[i].getAttribute("title"))；
        // The test for P
    }
</script>
```

### setAttribute

setAttribute()有点不同：它允许我们对属性节点的值做出修改。与 getAttribute 一样，setAttribute 也只能用于元素节点

```
object.setAttribute(attribute, value)
```

在下面的例子里，第一条语句得到 id 是 purchase 的元素，第二条语句把这个元素的 title 属性值设置为 a list if goods:

```
<p title="The test for P">This is just a test</p>
<script>
    let TEST = document.getElementsByTagName("p");
    let shopping = document.getElementById("purchase");

    shopping.setAttribute("title", "A list of goods");
    // 改变了title属性值

    for(let i = 0; i < TEST.length; i++){
        alert(TEST[i].getAttribute("title"))；
        // A list of goods
    }
</script>
```
