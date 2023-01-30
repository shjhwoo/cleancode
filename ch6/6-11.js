export function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

// 사용 예:
const product = {
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
};

const shippingMethod = {
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
};

const price = priceOrder(product, 5, shippingMethod);
console.log(price);

//refact ver.

class Product {
  #basePrice;
  #discountRate;
  #discountThreshold;
  constructor(product) {
    this.#basePrice = product.basePrice;
    this.#discountRate = product.discountRate;
    this.#discountThreshold = product.discountThreshold;
  }

  get basePrice() {
    return this.#basePrice;
  }

  get discountRate() {
    return this.#discountRate;
  }

  get discountThreshold() {
    return this.#discountThreshold;
  }

  calcBasePrice(quantity) {
    return this.basePrice * quantity;
  }

  calcDiscount(quantity) {
    return (
      Math.max(quantity - this.discountThreshold, 0) *
      this.basePrice *
      this.discountRate
    );
  }
}

class ShippingMethod {
  #discountThreshold;
  #feePerCase;
  #discountedFee;
  constructor(shippingMethod) {
    this.#discountThreshold = shippingMethod.basePrice;
    this.#feePerCase = shippingMethod.discountRate;
    this.#discountedFee = shippingMethod.discountThreshold;
  }

  get discountThreshold() {
    return this.#discountThreshold;
  }

  get feePerCase() {
    return this.#feePerCase;
  }

  get discountedFee() {
    return this.#discountedFee;
  }

  calcShippingPerCase(basePrice) {
    return basePrice > this.discountThreshold
      ? this.discountedFee
      : this.feePerCase;
  }

  calcShippingCost(basePrice, quantity) {
    return this.calcShippingPerCase(basePrice) * quantity;
  }
}

function calculatePriceOrder(product, quantity, shippingMethod) {
  const basePrice = new Product(product).basePrice;
  const discount = new Product(product).discount;
  const shippingCost = new ShippingMethod(shippingMethod).calcShippingCost(
    basePrice,
    quantity
  );

  return basePrice - discount + shippingCost;
}
