window.onload = function () {
    // 1. 实现瀑布流布局
    pubuliu("main", "box");
};

/*
* 实现瀑布流
* */
function pubuliu(parent, child) {
    // 1. 父盒子居中
    // 1.1 获取所有的盒子
    let allBox = $(parent).getElementsByClassName(child);

    // 1.2 获取子盒子的宽度
    let boxWidth = allBox[0].offsetWidth;

    // 1.3 获取屏幕的宽度
    let screenW = document.documentElement.clientWidth;

    // 1.4 求出列数
    let cols = parseInt(screenW / boxWidth);

    // 1.5 父盒子居中
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = "0 auto";


    // 2. 子盒子的定位
    // 2.1 定义高度数字
    let height = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;

    // 2.2 遍历子盒子
    for (let i = 0; i < allBox.length; i++) {
        // 求出每一个子盒子的高度
        boxHeight = allBox[i].offsetHeight;

        // 取出第一行盒子的高度放入高度数组
        if (i < cols) {
            heightArr.push(boxHeight);
        } else {
            // 取出最矮盒子的高度
            minBoxHeight = _.min(heightArr);

            // 求出对应盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);

            // 子盒子定位
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';

            // 更新数组中的
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}

function getMinBoxIndex(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}