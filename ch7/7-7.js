class Person {
  #name;
  #department;
  constructor(name, department) {
    this.#name = name;
    this.#department = department;
  }

  get name() {
    return this.#name;
  }

  get department() {
    return this.#department;
  }

  set department(arg) {
    this.#department = arg;
  }

  get chargeCode() {
    return this.#department.chargeCode;
  }

  set chargeCode(arg) {
    this.#chargeCode = arg;
  }

  get manager() {
    return this.#department.manager;
  }

  set manager(arg) {
    this.#manager = arg;
  }
}

const person = new Person("Tom", { manager: "aManager", chargeCode: "999" });
console.log(person.name);
console.log(person.manager);
console.log(person.chargeCode);
