const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const userNameInput = document.querySelector("#userName");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#passwordConfirm");

async function SignUpUser(e) {
  e.preventDefault();
  await db.users
    .add({
      firstName: fName.value,
      lastName: lName.value,
      username: userName.value,
      email: emailInput.value,
      password: password.value,
    })
    .then(() => {
      sessionStorage.setItem("username", userName.value);
      location.href = "profile.html";
    });

  // e.preventDefault();
}

export { SignUpUser };
