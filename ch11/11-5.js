export class Order {
  constructor(quantity, itemPrice) {
    this.quantity = quantity;
    this.itemPrice = itemPrice;
  }

  get discountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }

  get discountRate() {
    return this.discountLevel === 1 ? 0.95 : 0.9;
  }

  get finalPrice() {
    return this.discountedPrice();
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  discountedPrice() {
    return this.basePrice * this.discountRate;
  }
}
