// export function adjustedCapital(instrument) {
//   let result = 0;
//   if (instrument.capital > 0) {
//     if (instrument.interestRate > 0 && instrument.duration > 0) {
//       result =
//         (instrument.income / instrument.duration) *
//         anInstrument.adjustmentFactor;
//     }
//   }
//   return result;
// }

export function adjustCapital(instrument) {
  if (instrument.capital <= 0) {
    return 0;
  }

  if (instrument.interestRate > 0 && instrument.duration > 0) {
    return (
      (instrument.income / instrument.duration) * anInstrument.adjustmentFactor
    );
  }
}

// 또는 조건식을 함수화해도 된다.
