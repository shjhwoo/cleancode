export class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesman" };
  }

  //이렇게 한다!! 외부에선 이름만 주면 된다!!
  static createEngineer(name) {
    return new Employee(name, "E");
  }
}
