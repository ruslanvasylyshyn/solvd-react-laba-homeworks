import "./style.scss";

// changing theme

let changeThemeButton = document.getElementById("change-theme__button");

changeThemeButton.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    changeThemeButton.src = "/btn_change-theme_dark.svg";
  } else {
    changeThemeButton.src = "/btn_change-theme_light.svg";
  }
};

// scrool to top

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.onclick = function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// animation of profile image script

let profilePicture = document.getElementById("profilePicture");
let colors = ["red", "blue", "green", "orange", "purple"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate() {
  let randomIndex = getRandomInt(0, colors.length - 1);
  let randomColor = colors[randomIndex];

  profilePicture.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.5)";
  profilePicture.style.filter = "grayscale(50%)";

  profilePicture.style.boxShadow = "5px 5px 10px " + randomColor;
}

setInterval(animate, 1000);
