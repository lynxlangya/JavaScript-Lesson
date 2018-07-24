## Javascript


### 1.语句
javascript程序的执行单位为行(line), 也就是一行行的执行．一般情况下，每行就是一个语句.

```
let i = 1 + 3
```
`let` 命令,声明变量 `i` ,然后将 `1 + 3` 的运算结果赋值给变量 `i`;
### 2.变量
#### 2.1 概念
变量就是对"值"的具名引用.简而言之:变量就是为"值"起名,然后引用这名字,就等于引用这儿值.顾名思义:变量名就是变量的名字.
```
let a = 1;
```
上面代码先声明变量 `a` ,然后在变量 `a` 与数值1之间建立引用关系,称为将数值 `1` "赋值"给变量 `a` ; 往后引用变量名 `a` 就会得到数值 1, `let` 是变量声明命令.它表示通知解释引擎,要创建一个变量 `a` ;
#### 注意:
javascript 的变量名区分大小写, `A` 和 `a` 是两个不同的变量

变量的声明和赋值,其实是分开的两个步骤,通常我们的代码中会将他们融合到一起写,实际步骤是这样的.
```
let a;      // 先在此处声明变量 a;
a = 1;      // 随后给声明的变量 a 赋值;
```
如果只是声明变量而没有诶变量赋值的话,则该变量的值是 `undefined`. `undefined` 是JavaScript 的关键字,表示 "未定义".
### 3.标识符
标识符(identifier)指的是用来识别各种值的合法名称.最常见的标识符就是变量名, Javascript 语言的标识符对大小写及其敏感, 所以 `a` 和 `A` 是两个不同的标识符.
#### 标识符命名规则
+ 第一个字符,可以是任意Unicode字母(包括英文字母和其他语言的字母), 以及美元符号( `$` )和下划线( `_` ).

+ 第二个字符几后面的字符,除了Unicode字母, 美元符号和下划线, 还可以使用数字 `0-9` .
---
不合法标识符实例:
```
1a              // 第一个字符不能是数字
23              // 原因同上
***             // 标识符不能包含星号
a+b             // 标识符不能包含加号
-d              // 标识符不能包含减号或者连词线
```
中文是合法的标识符,也可以用作变量名.
```
    let 临时变量 = 1;
    console.log(临时变量);      // 1
```
---
> JavaScript有一些保留字,不能用作标识符: arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。

