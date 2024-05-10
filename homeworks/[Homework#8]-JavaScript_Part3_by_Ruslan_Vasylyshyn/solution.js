// 1. Pluck
function pluck(obj, path) {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }

  return value;
}

const user = {
  username: "testuser1",
  preferences: {
    sound: {
      maxValue: 50,
      value: 30,
    },
  },
};
const randomValue = Math.random();
const nullValue = null;

// console.log(pluck(user, 'preferences.sound.value')); // 30
// console.log(pluck(user, 'unknown.key')); // null
// console.log(pluck(randomValue, 'unknown.key')); // null
// console.log(pluck(nullValue, 'unknown.key')); // null

// 2. Deep Clone
function clone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const clonedObj = {};

  for (let key in obj) {
    clonedObj[key] = clone(obj[key]);
  }

  return clonedObj;
}

const user1 = {
  username: "testuser1",
  preferences: {
    sound: {
      maxValue: 50,
      value: 30,
    },
  },
};
const clonedUser = clone(user1);

clonedUser.preferences.sound.maxValue = 70;

// console.log(
//   user1.preferences.sound.maxValue === clonedUser.preferences.sound.maxValue
// ); // false

// 3. "A long time ago"
// Handled task without third-party library Moment, as Alexander wrote in chat
// Also added two tests to check minutes and hours

function offset(dateString) {
  const now = new Date();
  const inputDate = new Date(
    dateString.replace(
      /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/,
      "$3-$2-$1T$4:$5:$6"
    )
  );
  const diffMilliseconds = now - inputDate;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (isNaN(diffSeconds)) {
    return "Invalid date";
  }

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
  }
}

// console.log(offset("23/02/2021 13:30:00"));
// console.log(offset("23/02/2021 13:00:00"));
// console.log(offset("23/02/2021 11:30:00"));
// console.log(offset("22/02/2021 14:00:00"));
// console.log(offset("23/02/2020 10:00:00"));

// console.log(offset("09/05/2024 17:00:00"));
// console.log(offset("09/05/2024 16:00:00"));

// 4. Random dates
// Handled task without third-party library Moment as previous
function randomDate(dateStr1, dateStr2) {
  const parts1 = dateStr1.split("/");
  const parts2 = dateStr2.split("/");

  const date1 = new Date(`${parts1[2]}-${parts1[1]}-${parts1[0]}`);
  const date2 = new Date(`${parts2[2]}-${parts2[1]}-${parts2[0]}`);

  const diff = date2.getTime() - date1.getTime();

  const randomDiff = Math.random() * diff;

  const randomMilliseconds = date1.getTime() + randomDiff;

  const randomDate = new Date(randomMilliseconds);

  const day = randomDate.getDate().toString().padStart(2, "0");
  const month = (randomDate.getMonth() + 1).toString().padStart(2, "0");
  const year = randomDate.getFullYear();

  return `${day}/${month}/${year}`;
}

const date1 = "23/01/2021";
const date2 = "23/02/2021";

console.log(randomDate(date1, date2));

// 5. Merged Objects.
// https://www.codewars.com/kata/merged-objects
function objConcat(o) {
  let result = {};

  o.forEach((obj) => {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
}

// 6. "this" is an other problem
// https://www.codewars.com/kata/547f1a8d4a437abdf800055c
function NamedOne(first, last) {
  let _firstName = first;
  let _lastName = last;
  let _fullName = _firstName + " " + _lastName;

  function updateFullName() {
    _fullName = _firstName + " " + _lastName;
  }

  return {
    get firstName() {
      return _firstName;
    },

    set firstName(value) {
      _firstName = value;
      updateFullName();
    },

    get lastName() {
      return _lastName;
    },

    set lastName(value) {
      _lastName = value;
      updateFullName();
    },

    get fullName() {
      return _fullName;
    },

    set fullName(value) {
      if (value.includes(" ")) {
        const [firstName, lastName] = value.split(" ");
        _firstName = firstName;
        _lastName = lastName;
        updateFullName();
      }
    },
  };
}

// Optional (advanced) task
// 8. "this" is an other solution
// https://www.codewars.com/kata/54834b3559e638b39d0009a2
function OnceNamedOne(first, last) {
  let _firstName = first;
  let _lastName = last;
  let _fullName = _firstName + " " + _lastName;

  return {
    get firstName() {
      return _firstName;
    },

    get lastName() {
      return _lastName;
    },

    get fullName() {
      return _fullName;
    },
  };
}

// 10. Human Readable Time
// https://www.codewars.com/kata/human-readable-time

function humanReadable(seconds) {
  const HH = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const MM = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const SS = (seconds % 60).toString().padStart(2, "0");
  return `${HH}:${MM}:${SS}`;
}
