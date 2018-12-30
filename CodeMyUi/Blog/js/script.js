{
  let overlay = document.getElementById("overlay");
  let closeMenu = document.getElementById("colse-menu");

  document.getElementById("open-menu").addEventListener("click", function() {
    overlay.classList.add("show-menu");
  });

  document.getElementById("close-menu").addEventListener("click", function() {
    overlay.classList.remove("show-menu");
  });
}
