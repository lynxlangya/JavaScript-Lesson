window.onload = function () {
    // 1. 实现瀑布流布局
    pu("main", "box");

    // 2. 动态加载图片
    window.onscroll = function () {
        if (checkWillLoadImg()) {
            // 造数据
            let dataArr = [
                {"src": "2.jpeg"},
                {"src": "2.jpeg"},
                {"src": "5.jpeg"},
                {"src": "2.jpeg"},
                {"src": "6.jpeg"},
                {"src": "2.jpeg"},
                {"src": "1.jpeg"},
                {"src": "2.jpeg"},
                {"src": "8.jpeg"},
                {"src": "2.jpeg"},
                {"src": "8.jpeg"},
            ];

            // 创建元素
            for (let i = 0; i < dataArr.length; i++) {
                let newBox = document.createElement("div");
                newBox.className = "box";
                $("main").appendChild(newBox);

                let newPic = document.createElement("div");
                newPic.className = "pic";
                newBox.appendChild(newPic);

                let newImg = document.createElement("img");
                newImg.src = "img/" + dataArr[i].src;
                newPic.appendChild(newImg);
            }

            // 重新布局
            pu("main", "box");
        }
    }
};

/*
* 实现瀑布流
* */
function pu(parent, child) {
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
    let heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;

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

            // 更新数组中的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}


// 判断是否具备加载图片的条件
function checkWillLoadImg() {
    // 1. 获取最后一个盒子
    let allBox = document.getElementsByClassName("box");
    let lastBox = allBox[allBox.length - 1];

    // 2. 求出最后一个盒子自身高度的一半 + offsetTop
    let lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    // 3. 求出屏幕的高度
    let screenW = document.body.clientHeight || document.documentElement.clientHeight;

    // 4. 求出页面偏离浏览器的高度
    let scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;
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