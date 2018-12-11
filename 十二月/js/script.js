function showPic(whichpic) {
  // 将元素赋值给变量 placeholder
  let placeholder = document.getElementById("placeholder");

  // 将 href 作为参数传递给 getAttribute
  let source = whichpic.getAttribute("href");

  // 将 src 属性改变为 source
  placeholder.setAttribute("src", source);
}
