function disabilityAmount(employee) {
  if (employee.seniority < 2) return 0;
  if (employee.monthsDisabled > 12) return 0;
  if (employee.isPartTime) return 0;
  return 1;
}

function disabilityAmount2(employee) {
  const isDisabilityCondition =
    employee.seniority < 2 ||
    employee.monthsDisabled > 12 ||
    employee.isPartTime;
  return isDisabilityCondition ? 0 : 1;
}
