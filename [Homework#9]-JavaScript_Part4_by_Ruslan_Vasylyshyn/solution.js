class Serializable {
  serialize() {
    return JSON.stringify(this);
  }

  wakeFrom(serialized) {
    const data = JSON.parse(serialized);
    return new this.constructor(data);
  }
}

class UserDTO extends Serializable {
  constructor(data) {
    super();
    if (data instanceof Object) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.phone = data.phone;
      this.birth = new Date(data.birth);
    } else {
      const { firstName, lastName, phone, birth } = JSON.parse(data);
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.birth = new Date(birth);
    }
  }

  printInfo() {
    console.log(
      `${this.firstName[0]}. ${this.lastName} - ${
        this.phone
      }, ${this.birth.toISOString()}`
    );
  }
}

// Example of usage
let tolik = new UserDTO({
  firstName: "Anatoliy",
  lastName: "Nashovich",
  phone: "2020327",
  birth: new Date("1999-01-02"),
});

tolik.printInfo(); //A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

const serialized = tolik.serialize();
tolik = null;
console.log(serialized);

const resurrectedTolik = new UserDTO(serialized);

console.log(resurrectedTolik instanceof UserDTO); // true
console.log(resurrectedTolik.printInfo()); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

console.log(resurrectedTolik.printInfo());

class Post extends Serializable {
  constructor({ content, date, author }) {
    super();

    this.content = content;
    this.date = date;
    this.author = author;
  }
}

try {
  console.log(new Post().wakeFrom(serialized));
} catch (error) {
  console.error(error.message);
}
