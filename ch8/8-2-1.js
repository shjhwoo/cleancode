export class Customer {
  #name;
  #contract;
  constructor(name, discountRate) {
    this.#name = name;
    this.#discountRate = discountRate;
    this.#contract = new CustomerContract(discountRate, this.dateToday());
  }

  get startDate() {
    return this.#startDate;
  }

  becomePreferred() {
    this.#contract.discountRate += 0.03;
    // 다른 코드들이 있음... // <= 무슨 말이야 도대체??
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.#contract.discountRate));
  }

  dateToday() {
    return new Date();
  }
}

export class CustomerContract {
  #discountRate;
  #startDate;
  constructor(discountRate, startDate) {
    this.#discountRate = discountRate;
    this.#startDate = startDate;
  }

  get startDate() {
    return this.#startDate;
  }

  get discountRate() {
    return this.#discountRate;
  }

  set discountRate(value) {
    this.#discountRate = value;
  }
}
