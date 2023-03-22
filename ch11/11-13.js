const values = [];
function getValueForPeriod(periodNumber) {
  const value = values[periodNumber];
  return value ?? 0;
}

getValueForPeriod(target);
