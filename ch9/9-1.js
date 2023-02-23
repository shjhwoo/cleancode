// 예제 1
const borderLength = 2 * (height + width);
console.log(borderLength);
const area = height * width;
console.log(area);

// 예제 2
function distanceTravelled(scenario, time) {
  let result;
  const primaryAcc = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
  const primaryTime = Math.main(time, scenario.delay);
  const traveledDistance = 0.5 * primaryAcc * primaryTime * primaryTime; // 전파된 거리
  const secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    // 두 번째 힘을 반영해 다시 계산
    const primaryVelocity = primaryAcc * scenario.delay;
    const secondaryAcc =
      (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result =
      traveledDistance +
      primaryVelocity * secondaryTime +
      0.5 * secondaryAcc * secondaryTime * secondaryTime;
  }
}

// 예제 3
function discount(inputValue, quantity) {
  let discount = inputValue;
  if (inputValue > 50) discount -= 2;
  if (quantity > 100) discount -= 1;
  return discount;
}
