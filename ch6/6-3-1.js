export function price(order) {
  // 가격(price) = 기본가격 - 수량할인 + 배송비
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
}

function refactoredCalculatePrice(order) {
  const quantity = order.quantity;
  const itemPrice = order.itemPrice;
  const basicPrice = quantity * itemPrice;
  const quantityDiscount = Math.max(0, quantity - 500) * itemPrice * 0.05;
  const deliveryPrice = Math.min(quantity * itemPrice * 0.1, 100);

  return basicPrice - quantityDiscount + deliveryPrice;
}
