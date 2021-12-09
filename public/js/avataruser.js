const UPLOAD_BUTTON = document.getElementById("upload-button");
const FILE_INPUT = document.querySelector("input[type=file]");
const AVATAR = document.getElementById("avatar");

UPLOAD_BUTTON.addEventListener("click", () => FILE_INPUT.click());

FILE_INPUT.addEventListener("change", event => {
  const file = event.target.files[0].name;
  changeAva(file)
  // const reader = new FileReader();

  // reader.readAsDataURL(file);

  // reader.onloadend = () => {
  //   AVATAR.setAttribute("aria-label", file.name);
  //   AVATAR.style.background = `url(${reader.result}) center center/cover`;
  //   localStorage.setItem("user", JSON.stringify(file.name));
  //   JSON.parse(localStorage.getItem(file.name));
  // };
});

function changeAva(file) {
  var currentUser = JSON.parse(localStorage.getItem("user"))


  $.post('changeUserAva ', {
    avaFile: file,
    currentUserID: currentUser[0].name.trim()

  },
    (data, status) => {
      if (data.length != 0) {
        alert('Thanh Cong');
        localStorage.setItem("user", JSON.stringify(data));
        console.log(localStorage.getItem("user"));
        window.location.reload()
      }
    })
}