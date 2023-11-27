const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const person = document.querySelector(".person");

let userList = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0]; //that will come back with an object with a lot of stuff on it so the next step is to create a small code snipet that will take that pulp of info on the user object and format it for us (it will pull only first and last name). Additionally we are going to add another key-value property 'money'

  //here is our actual constructor for the user
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: formatMoney(Math.floor(Math.random() * 1000000)), //that will generate a new number up to a million
  };
  addData(newUser);
}

//Add new object/user to data array
function addData(obj) {
  userList.push(obj);
  updateDOM();
}

//Display users in the DOM using forEach

function updateDOM(providedData = userList) {
  //clear the main div so that each time we have a new list of users
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach(function (user) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${user.name}</strong>${user.money}`;
    main.appendChild(element);
  });
}

//Format number as money

function formatMoney(number) {
  //below is a solution from the copilot
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// function updateDOM() {
//   userList.forEach((user) => {
//     const nameEl = document.createElement("h3");
//     nameEl.textContent = user.name;
//     const moneyEl = document.createElement("h3");
//     moneyEl.textContent = user.money;
//     const person = document.createElement("div");
//     person.classList.add("person");
//     person.appendChild(nameEl);
//     person.appendChild(moneyEl);
//     main.appendChild(person);
//   });
// }
