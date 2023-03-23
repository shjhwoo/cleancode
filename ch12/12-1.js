// 예시 1
class Employee {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

class Salesperson extends Employee {}

class Engineer extends Employee {}

const s1 = new Salesperson("haha");
const e1 = new Engineer("ee");

console.log("s1:", s1.name, "e1:", e1.name);

// // 예시 2
class Party {
  constructor(monthlyCost) {
    this._monthlyCost = monthlyCost;
  }

  get annualCost() {
    return this._monthlyCost * 12;
  }
}

class Department extends Party {}
class Employee2 extends Party {}

const d1 = new Department("300");
const e2 = new Employee2("789");

console.log("d1:", d1.annualCost, "e2:", e2.annualCost);
