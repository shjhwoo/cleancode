export function priceOrder(product, quantity, shippingMethod) {
  const basePrice = calcBasePrice(basePrice, quantity);
  const discountedPrice = calcDiscountedPrice(product, quantity);
  const shippingCost = shippingCost(basePrice, quantity, shippingMethod);
  const price = basePrice - discountedPrice + shippingCost;
  return price;
}

function calcBasePrice(basePrice, quantity) {
  return basePrice * quantity;
}

function calcDiscountedPrice(product, quantity) {
  return (
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate
  );
}

function shippingCost(basePrice, quantity, shippingMethod) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  return quantity * shippingPerCase;
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
  const basePrice = new Product(product).calcBasePrice(quantity);
  const discount = new Product(product).calcDiscount(quantity);
  const shippingCost = new ShippingMethod(shippingMethod).calcShippingCost(
    basePrice,
    quantity
  );

  return basePrice - discount + shippingCost;
}
