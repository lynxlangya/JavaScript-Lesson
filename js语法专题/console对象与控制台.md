# Console 对象与控制台

`console`对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出`stdout`和标准错误`stderr`，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。

`console`的常见用途有两个。

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

`console`对象的浏览器实现，包含在浏览器自带的开发工具之中。以 Chrome 浏览器的“开发者工具”为例

打开开发者工具以后，顶端有多个面板。

- Elements：查看网页的 HTML 源码和 CSS 代码。
- Resources：查看网页加载的各种资源文件（比如代码文件、字体文件 CSS 文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage 等）。
- Network：查看网页的 HTTP 通信情况。
- Sources：查看网页加载的脚本源码。
- Timeline：查看各种网页行为随时间变化的情况。
- Performance：查看网页的性能情况，比如 CPU 和内存消耗。
- Console：用来运行 JavaScript 命令。
