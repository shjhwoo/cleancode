const values = [];
function getValueForPeriod(periodNumber) {
  const value = values[periodNumber];
  if (!value) {
    throw new Error("value is undefined");
  }
  return value;
}

try {
  let target = -10;
  if (!values[target]) {
    throw new Error("target is under zero");
  }
  getValueForPeriod(target);
} catch (error) {
  console.log("에러 발생!");
}
