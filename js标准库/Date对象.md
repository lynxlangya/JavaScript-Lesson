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

```
let today = new Date();
today;
// Mon Dec 10 2018 14:00:47 GMT+0800 (中国标准时间)
// 等同于
today.toString()
// Mon Dec 10 2018 14:00:47 GMT+0800 (中国标准时间)
```

上面代码中，`today`是`Date`的实例，直接求值等同于调用`toString`方法。

作为构造函数时，`Date`对象可以接受多种格式的参数，返回一个该参数对应的时间实例。

```
// 参数为时间零点开始计算的毫秒数
new Date(12312312341734)
// Mon Feb 29 2360 22:45:41 GMT+0800 (中国标准时间)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```

关于`Date`构造函数的参数，有几

第一点，参数可以是负整数，代表 1970 年元旦之前的时间。

```
new Date(-12231231423423)
// Sun May 30 1582 03:48:39 GMT+0805 (中国标准时间)
```

第二点，只要是能被`Date.parse()`方法解析的字符串，都可以当作参数。

```
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('Feberuary, 15, 2013')
new Date('Feberuary 15, 2013')
new Date('15 Feb 2013')
new Date('15, Feberuary, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
```

上面多种日期字符串的写法，返回的都是同一个时间。

第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略，其他参数都可以省略的。也就是说，这时至少需要两个参数，因为如果只是用“年”这一个参数，`Date`会将其解释为毫秒数。

```
new Date(2013)
// Thu Jan 01 1970 08:00:02 GMT+0800 (CST)
```

各个参数的取值范围如下

- 年：使用四位数的年份，比如`2000`,。如果写成两位数或个位数，则加上`1900`，即`10`代表 1910 年。如果是负数，表示公元前
- 月：`0`表示一月，以此类推，`11`表示 12 月
- 日：`1`到`31`
- 小时： `0`到`23`
- 分钟： `0`到`59`
- 秒： `0`到`59`
- 毫秒： `0`到`999`

注意，月份从`0`开始计算，但是，天数从`1`开始计算。另外，除了日期的默认值为`1`，小时、分钟、秒钟和毫秒的默认值都是`0`

这些参数如果超出了正常范围，会被自动折算，比如，如果月设为`15`，就折算为下一年的 4 月。

```
new Date(2013, 15)
// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)

new Date(2013, 0, 0)
// Mon Dec 31 2012 00:00:00 GMT+0800 (CST)
```

上面代码的第二个例子，日期设为`0`，就代表上个月的最后一天。

参数还可以使用负数，表示扣去的时间

```
new Date(2013, -1)
// Sat Dec 01 2012 00:00:00 GMT+0800 (CST)

new Date(2013, 0, -1)
// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
```

上面代码中，分别对月和日使用了负数，表示从基准日扣去相应的时间。

# 日期的运算

## 静态方法

### Date.now()

`Date.now`方法返回当前时间距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以 1000.

```
Date.now()			// 1544422994115
```

### Date.UTC()

`Date.UTC`方法接受年、月、日等变量作为参数，返回改时间距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）的毫秒数

```
// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567)
// 1293847384567
```

该方法的参数用法与`Date`构造函数完全一致，比如月从`0`开始计算，日期从`1`开始计算。区别在于`Date.UTC`方法的参数，会被解释为 UTC 时间（世界标准时间），`Date`构造函数的参数会被解释为当前时区的时间。

## 实例方法

`Date`的实例对象，有几十个自己的方法，除了`valueOf`和`toString`,可以分为一下三类

- `to`类： 从`Date`对象返回一个字符串，表示指定的时间
- `get`类： 获取`Date`对象的日期和时间
- `set`类： 设置`Date`对象的日期和时间

### Date.prototype.valueOf()

`valueOf`方法返回实例对象距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）对应的毫秒数，该方法等同于`getTime`方法

```
var d = new Date();

d.valueOf() // 1362790014817
d.getTime() // 1362790014817
```

### 本地时间

以下三种方法，可以将 Date 实例转为表示本地时间的字符串

- `Date.prototype.toLocaleString()`：完整的本地时间。
- `Date.prototype.toLocaleDateString()`：本地日期（不含小时、分和秒）。
- `Date.prototype.toLocaleTimeString()`：本地时间（不含年月日）

用法实例

```
var d = new Date(2013, 0, 1);

d.toLocaleString()
// 中文版浏览器为"2013年1月1日 上午12:00:00"
// 英文版浏览器为"1/1/2013 12:00:00 AM"

d.toLocaleDateString()
// 中文版浏览器为"2013年1月1日"
// 英文版浏览器为"1/1/2013"

d.toLocaleTimeString()
// 中文版浏览器为"上午12:00:00"
// 英文版浏览器为"12:00:00 AM"
```

这三个方法都有两个可选的参数

```
dateObj.toLocaleString([locales[, options]])
dateObj.toLocaleDateString([locales[, options]])
dateObj.toLocaleTimeString([locales[, options]])
```

这两个参数中，`locales`是一个制定所用语言的字符串，`options`是一个配置对象。下面是`locales`的例子

```
var d = new Date(2013, 0, 1);

d.toLocaleString('en-US') // "1/1/2013, 12:00:00 AM"
d.toLocaleString('zh-CN') // "2013/1/1 上午12:00:00"

d.toLocaleDateString('en-US') // "1/1/2013"
d.toLocaleDateString('zh-CN') // "2013/1/1"

d.toLocaleTimeString('en-US') // "12:00:00 AM"
d.toLocaleTimeString('zh-CN') // "上午12:00:00"
```

下面是`options`的例子

```
var d = new Date(2013, 0, 1);

// 时间格式
// 下面的设置是，星期和月份为完整文字，年份和日期为数字
d.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
// "Tuesday, January 1, 2013"

// 指定时区
d.toLocaleTimeString('en-US', {
  timeZone: 'UTC',
  timeZoneName: 'short'
})
// "4:00:00 PM UTC"

d.toLocaleTimeString('en-US', {
  timeZone: 'Asia/Shanghai',
  timeZoneName: 'long'
})
// "12:00:00 AM China Standard Time"

// 小时周期为12还是24
d.toLocaleTimeString('en-US', {
  hour12: false
})
// "00:00:00"

d.toLocaleTimeString('en-US', {
  hour12: true
})
// "12:00:00 AM"
```
