import assert from "node:assert";

class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    if (!this.discountRate) {
      return number;
    }
    assert(this.discountRate >= 0);
    return number - this.discountRate * number;
  }
}
