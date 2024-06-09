class Serializable {
  // Serialize the object to JSON string
  serialize() {
    return JSON.stringify(this, (key, value) => {
      if (key === "") {
        // Add class information at the root level
        return { __class__: this.constructor.name, ...value };
      }
      if (value === Infinity) return "Infinity";
      if (value === -Infinity) return "-Infinity";
      if (Number.isNaN(value)) return "NaN";
      if (value === 0 && 1 / value === -Infinity) return 0; // Handle -0
      if (value instanceof Date)
        return { __type__: "Date", value: value.toISOString() };
      if (value === null) return null;
      if (Array.isArray(value)) return value.map((v) => this.serializeValue(v));
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        value.__proto__.constructor.name !== "Object" &&
        value !== null
      ) {
        return { __type__: "Object", ...value };
      }
      return value;
    });
  }

  // Deserialize the JSON string to an object
  static wakeFrom(serialized) {
    const data = JSON.parse(serialized, (key, value) => {
      if (value === "Infinity") return Infinity;
      if (value === "-Infinity") return -Infinity;
      if (value === "NaN") return NaN;
      if (value && value.__type__ === "Date") return new Date(value.value);
      if (value && value.__type__ === "Object") return { ...value };
      return value;
    });

    // Extract the class name and the rest of the data
    const { __class__, ...rest } = data;

    // Check if the class names match
    if (this.name !== __class__) {
      throw new Error(
        `Cannot wake up from serialized data of class ${__class__}`
      );
    }

    // Assign the parsed data to a new instance of the class
    return Object.assign(this, rest);
  }

  // Helper method for value serialization
  serializeValue(value) {
    if (value === Infinity) return "Infinity";
    if (value === -Infinity) return "-Infinity";
    if (Number.isNaN(value)) return "NaN";
    if (value === 0 && 1 / value === -Infinity) return 0;
    if (value instanceof Date)
      return { __type__: "Date", value: value.toISOString() };
    if (value === null) return null;
    if (Array.isArray(value)) return value.map((v) => this.serializeValue(v));
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      value.__proto__.constructor.name !== "Object" &&
      value !== null
    ) {
      return { __type__: "Object", ...value };
    }
    return value;
  }
}

class UserDTO extends Serializable {
  constructor(data) {
    super();
    if (data) {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.phone = data.phone;
      this.birth = new Date(data.birth);
    }
  }

  printInfo() {
    console.log(
      `${this.firstName[0]}. ${this.lastName} - ${
        this.phone
      }, ${this.birth.toISOString()}`
    );
  }

  static wakeFrom(serialized) {
    const data = Serializable.wakeFrom.call(UserDTO, serialized);
    return new UserDTO(data);
  }
}

// Example of usage
let tolik = new UserDTO({
  firstName: "Anatoliy",
  lastName: "Nashovich",
  phone: "2020327",
  birth: new Date("1999-01-02"),
});

tolik.printInfo(); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

const serialized = tolik.serialize();
console.log(serialized);

const resurrectedTolik = UserDTO.wakeFrom(serialized);

console.log(resurrectedTolik instanceof UserDTO); // true
resurrectedTolik.printInfo(); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

class Post extends Serializable {
  constructor({ content, date, author }) {
    super();
    this.content = content;
    this.date = new Date(date);
    this.author = author;
  }

  static wakeFrom(serialized) {
    const data = Serializable.wakeFrom.call(Post, serialized);
    return new Post(data);
  }
}

try {
  console.log(Post.wakeFrom(serialized));
} catch (error) {
  console.error(error.message); // Cannot wake up from serialized data of class UserDTO
}

// Additional examples to demonstrate handling of special cases

class NumberTest extends Serializable {
  constructor(value) {
    super();
    this.value = value;
  }

  static wakeFrom(serialized) {
    const data = Serializable.wakeFrom.call(NumberTest, serialized);
    return new NumberTest(data.value);
  }
}

const numInstance = new NumberTest(Infinity);
const serializedNum = numInstance.serialize();
console.log(serializedNum); // {"__class__":"NumberTest","value":"Infinity"}

const resurrectedNum = NumberTest.wakeFrom(serializedNum);
console.log(resurrectedNum.value); // Infinity

const nanInstance = new NumberTest(NaN);
const serializedNaN = nanInstance.serialize();
console.log(serializedNaN); // {"__class__":"NumberTest","value":"NaN"}

const resurrectedNaN = NumberTest.wakeFrom(serializedNaN);
console.log(isNaN(resurrectedNaN.value)); // true

const negativeZeroInstance = new NumberTest(-0);
const serializedNegativeZero = negativeZeroInstance.serialize();
console.log(serializedNegativeZero); // {"__class__":"NumberTest","value":0}

const resurrectedNegativeZero = NumberTest.wakeFrom(serializedNegativeZero);
console.log(Object.is(resurrectedNegativeZero.value, -0)); // false
console.log(resurrectedNegativeZero.value); // 0
