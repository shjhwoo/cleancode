class Order {
  #quantity;
  #item;
  constructor(quantity, item) {
    this.#quantity = quantity;
    this.#item = item;
  }
  //getter를 사용해서, 임시 변수를 질의함수로 바꾸면 된다.
  get basePrice() {
    return this.#quantity * this.#item.price;
  }

  get discountFactor() {
    return this.basePrice > 1000 ? 0.98 : 0.95;
  }

  get price() {
    return this.basePrice * this.discountFactor;
  }
}
