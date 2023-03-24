class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return "employee";
  }

  toString() {
    return `${this.#name} (${this.type})`;
  }

  createEmployee(name, type) {
    switch (type) {
      case "engineer":
        return new Engineer(name);
      case "manager":
        return new Manager(name);
      default:
        throw new Error("무효");
    }
  }
}

class Engineer extends Employee {
  get type() {
    return "engineer"; //각자만의 타입으로 정의.
  }
}

class Manager extends Employee {
  get type() {
    return "manager";
  }
}

const ellie = new Engineer("엘리");
const bob = new Manager("밥");

//타입 코드를 두는 것보다는 서브클래스를 만들어 정리하는 것이 좋다.
//생성자에 로직을 두는 대신 팩터리 메서드에 로직을 두자

//검증코드 없이도 작동하도록, 서브클래스를 만드는 게 나음.
