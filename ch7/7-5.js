class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }
}

class Office {
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

const person = new Person("엘리");
const office = new Office("82", "01098080785");
console.log(person.name);
console.log(office.officeAreaCode);
console.log(office.officeNumber);
console.log(office.telephoneNumber);
