const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

export function acquireReading() {
  return new Reading(reading);
}

// export function baseRate(month, year) {
//   if (year === 2017 && month === 5) return 0.1;
//   return 0.2;
// }

class Reading {
  #customer;
  #quantity;
  #month;
  #year;
  constructor(reading) {
    this.#customer = reading.customer;
    this.#quantity = reading.quantity;
    this.#month = reading.month;
    this.#year = reading.year;
  }

  get customer() {
    return this.#customer;
  }

  get quantity() {
    return this.#quantity;
  }

  get month() {
    return this.#month;
  }

  get year() {
    return this.#year;
  }

  get baseRate() {
    if (this.year === 2017 && this.month === 5) {
      return 0.1;
    }
    return 0.2;
  }

  get baseCharge() {
    return this.baseRate * this.quantity;
  }

  get taxThreshold() {
    return 0.1;
  }

  get TaxableCharge() {
    return Math.max(0, this.baseCharge - this.taxThreshold);
  }
}
