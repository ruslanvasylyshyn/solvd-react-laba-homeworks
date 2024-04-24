let changeThemeButton = document.getElementById("change-theme__button");

changeThemeButton.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    changeThemeButton.src = "./img/btn_change-theme_dark.svg";
  } else {
    changeThemeButton.src = "./img/btn_change-theme_light.svg";
  }
};
