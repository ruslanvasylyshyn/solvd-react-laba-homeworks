// task 1 Error Throwing - Error Handling #2
// https://www.codewars.com/kata/55e7650c8d894146be000095/javascript
function validateMessage(msg) {
  if (msg === null) {
    throw new ReferenceError("Message is null!");
  }

  if (typeof msg !== "string") {
    throw new TypeError(
      `Message should be of type string but was of type ${typeof msg}!`
    );
  }

  if (msg.length > 255 || msg.length < 1) {
    throw new RangeError(`Message contains ${msg.length} characters!`);
  }

  if (msg.includes("<") & msg.includes(">")) {
    return false;
  }

  return true;
}

// task 2 Jokes you've been 'awaiting' for ... promise
// https://www.codewars.com/kata/5a353a478f27f244a1000076
async function sayJoke(apiUrl, jokeId) {
  try {
    const response = await fetch(apiUrl);

    const data = await response.json();

    if (!Array.isArray(data.jokes)) {
      if (data.differentApi && Array.isArray(data.differentApi)) {
        throw new Error(`No jokes at url: ${apiUrl}`);
      } else {
        throw new Error(`Unexpected data format. Expected an array of jokes.`);
      }
    }

    const filteredJoke = data.jokes.find((joke) => joke.id === jokeId);

    if (!filteredJoke) {
      throw new Error(`No jokes found id: ${jokeId}`);
    }

    return {
      saySetup: () => filteredJoke.setup,
      sayPunchLine: () => filteredJoke.punchLine,
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

// task 3 setTimeout/setInterval
let seconds = 0;
let timerId = setInterval(() => {
  seconds++;
  console.log(`Elapsed time: ${seconds} sec`);
}, 1000);

setTimeout(() => {
  clearInterval(timerId);
  console.log("stop");
}, 5000);

// task 5 Fetch API/XMLHttpRequest
// For this task I added html and css file.

// Function to fetch users using Fetch API
async function fetchUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?gender=female&results=10"
    );
    const data = await response.json();
    const users = data.results;
    const userList = document.getElementById("fetch-user-list");

    users.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
              <img src="${user.picture.thumbnail}" alt="User Picture">
              ${user.name.first} ${user.name.last}, ${user.location.city}
          `;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Function to fetch users using XMLHttpRequest
function fetchUsersXHR() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://randomuser.me/api/?gender=female&results=10", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const users = data.results;
      const userList = document.getElementById("xhr-user-list");

      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                  <img src="${user.picture.thumbnail}" alt="User Picture">
                  ${user.name.first} ${user.name.last}, ${user.location.city}
              `;
        userList.appendChild(listItem);
      });
    } else {
      console.error("Error fetching users:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request error");
  };

  xhr.send();
}

// Call both functions to fetch users
fetchUsers();
fetchUsersXHR();


// task 6 Digit or not
function beginsWithDigit(str) {
  const regex = /^\d/;
  return regex.test(str);
}

console.log(beginsWithDigit("123abc")); // true
console.log(beginsWithDigit("abc123")); // false
console.log(beginsWithDigit("1abc2")); // true
console.log(beginsWithDigit("abc")); // false

// task 7 Optional (advanced)
function isPhoneNumber(str, country) {
  let regex;

  switch (country) {
    case "Argentina":
      regex = /^\+54 \d{3}-\d{4}-\d{3}$/;
      break;
    case "Ukraine":
      regex = /^\+380 \d{2} \d{3}-\d{2}-\d{2}$/;
      break;
    default:
      return false;
  }

  return regex.test(str);
}

console.log(isPhoneNumber("+54 123-4567-890", "Argentina")); // true
console.log(isPhoneNumber("+54 123-456-7890", "Argentina")); // false
console.log(isPhoneNumber("+380 12 345-67-89", "Ukraine")); // true
console.log(isPhoneNumber("+380 123 45-67-89", "Ukraine")); // false
