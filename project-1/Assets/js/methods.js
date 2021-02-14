const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");

var DB = new Dexie("Bookaholic");

async function SignUpUser() {
  var DB = new Dexie("Bookaholic");
  DB.version(1).stores({
    users: "++id, first_name, last_name, userName, email",
  });

  DB.users.add({
    first_name: fName.value,
    last_name: lName.value,
    userName: userName.value,
    email: emailInput.value,
  });
}

export { SignUpUser };
