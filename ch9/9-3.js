// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    return this._basePrice - this._discount;
  }

  set discount(value) {
    this._discount = value;
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get production() {
    return this._adjustments.reduce((sum, b) => sum + b.amount);
  }

  applyAdjustment(adjustment) {
    this._adjustments.push(adjustment);
  }
}
