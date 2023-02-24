function calculateCharge(date, quantity, plan) {
  let charge = 0;
  if (!date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
  else charge = quantity * plan.regularRate + plan.regularServiceCharge;
  return charge;
}

//개선 후
function calculateCharge2(date, quantity, plan) {
  let charge = 0;
  if (date.isBetween(plan.summerStart, plan.summerEnd)) {
    charge = quantity * plan.regularRate + plan.regularServiceCharge;
  } else {
    charge = quantity * plan.summerRate;
  }
  return charge;
}

//또는
function calculateCharge3(date, quantity, plan) {
  const isSummer = date.isBetween(plan.summerStart, plan.summerEnd);
  return isSummer ? summerCharge() : regularCharge();
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
