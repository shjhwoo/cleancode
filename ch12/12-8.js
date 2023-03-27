class Department {
  get totalAnnualCost() {}
  get name() {}
  get headCount() {}
}

class Employee {
  get annualCost() {}
  get name() {}
  get id() {}
}

//================================================================

class Collection {
  get annualCost() {}
  get name() {}
}

class Department extends Collection {
  get totalAnnualCost() {
    // return super.annualCost() * 12
  }

  get headCount() {}
}

class Employee extends Collection {
  get id() {}
}
