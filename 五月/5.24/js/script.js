window.onload = function () {
    // 1. 获取标签

    let allLis = $('header').getElementsByTagName("li");
    let allDom = $('content').getElementsByClassName("dom");

    console.log(allLis);
    console.log(allDom);

    // 2. 遍历监听

    for (let i = 0; i < allLis.length; i++) {
        let li = allLis[i];
        li.index = i;

        console.log(li);
        li.onmouseover = function () {

            for (let j = 0; j < allLis.length; j++) {
                allLis[j].className = '';
                allDom[j].style.display = 'none';
            }

            this.className = 'active';


            allDom[this.index].style.display = 'block';
        }
    }
};

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}