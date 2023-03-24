class Employee {}

class Engineer extends Employee {
  get quotaOfEng() {} //메서드가 달라 상속 불가.
}
class Salesperson extends Employee {
  get quotaOfSales() {}
}
