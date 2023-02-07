class Person {
  #name;
  #telephone;
  constructor(name, telephone) {
    this.#name = name;
    this.#telephone = telephone;
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }

  get telephone() {
    return this.#telephone;
  }
}

class Telephone {
  #officeAreaCode;
  #officeNumber;
  constructor(areaCode, number) {
    this.#officeAreaCode = areaCode;
    this.#officeNumber = number;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this.#officeAreaCode;
  }

  set officeAreaCode(arg) {
    this.#officeAreaCode = arg;
  }

  get officeNumber() {
    return this.#officeNumber;
  }

  set officeNumber(arg) {
    this.#officeNumber = arg;
  }
}

const person = new Person("엘리", new Telephone("82", "01098080785"));
console.log(person.name);
console.log(person.telephone.officeAreaCode);
console.log(person.telephone.officeNumber);
console.log(person.telephone.telephoneNumber);
