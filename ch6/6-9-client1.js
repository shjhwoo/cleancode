// import { acquireReading, baseRate } from './6-9.js';

// const aReading = acquireReading();

// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
// console.log(baseCharge);

import { acquireReading } from "./6-9.js";

const aReading = acquireReading();

const baseCharge = aReading.baseCharge;
console.log(baseCharge);
