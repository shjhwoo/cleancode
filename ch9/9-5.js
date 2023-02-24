const customerRepository = new CustomerRepository();

const order = new Order(
  data.number,
  customerRepository.registerCustomer(data.customerId)
);

class Order {
  constructor(number, customer) {
    this._number = number;
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }

  set customer(id) {
    this._customer._id = id;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}

class CustomerRepository {
  #customers;

  constructor() {
    this.#customers = new Map();
  }

  registerCustomer(id) {
    if (!this.#customers.has(id)) {
      this.#customers.set(id, new Customer(id));
    }
    return this.findCustomer(id);
  }

  findCustomer(id) {
    return this.#customers.get(id);
  }
}
