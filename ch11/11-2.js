// 예제 1
function tenPercentRaise(person) {
  person.salary = person.salary.multiply(1.1);
}

function fivePercentRaise(person) {
  person.salary = person.salary.multiply(1.05);
}

//개선 후
function raisePersonalSalary(person, factor) {
  person.salary = person.salary.multiply(raise + factor);
}

// 예제 2
export function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

function withinBand(usage, start, end) {
  return usage > start ? Math.min(usage, end) - start : 0;
}

function withinBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

function usd(value) {
  return {
    currency: "$",
    currencyName: "USD",
    value: value,
  };
}
