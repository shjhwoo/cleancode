function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else return -23;
}

//프로그래밍에서 제공해주는 에러 클래스를 사용하는 것이 좋다

function localShippingRules2(data) {
  if (data) return new ShippingRules();
  else throw new OrderProcessingError(-23);
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super();
    this.errorCode = errorCode;
  }
}

try {
  const result = localShippingRules2();
} catch (e) {
  if (e instanceof OrderProcessingError) {
    console.log(e);
  }
}
