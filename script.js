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
    money: Math.floor(Math.random() * 1000000), //that will generate a new number up to a million
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
    element.innerHTML = `<strong>${user.name}</strong>${formatMoney(
      user.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  //below code from the stackoverflow
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  //below is a solution from the copilot
  // return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

//Double the money
//create a new array of users where the money * 2 - .map()
function doubleMoney() {
  userList.map((user) => {
    user.money = user.money * 2;
    return userList;
  });
  //update  UI
  updateDOM(userList);
}

//EVENT LISTENERS
addUserBtn.addEventListener("click", getRandomUser); //will add another user
doubleBtn.addEventListener("click", doubleMoney);
