// export function readingsOutsideRange(station, min, max) {
//   return station.readings.filter((r) => r.temp < min || r.temp > max);
// }

// const station = {
//   name: 'ZB1',
//   readings: [
//     { temp: 47, time: '2016-11-10 09:10' },
//     { temp: 53, time: '2016-11-10 09:20' },
//     { temp: 58, time: '2016-11-10 09:30' },
//     { temp: 53, time: '2016-11-10 09:40' },
//     { temp: 51, time: '2016-11-10 09:50' },
//   ],
// };
// const operationPlan = {
//   temperatureFloor: 51,
//   temperatureCeiling: 53,
// };

// readingsOutsideRange(
//   station,
//   operationPlan.temperatureFloor,
//   operationPlan.temperatureCeiling
// );

export function readingsTemperatureOutsideRange(tempList, range) {
  //2개로 줄이자.
  return tempList.filter((temp) => !range.contains(temp));
}

const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};
// const operationPlan = {
//   temperatureFloor: 51,
//   temperatureCeiling: 53,
// };

readingsTemperatureOutsideRange(
  station.readings.map((r) => r.temp),
  operationPlan
);

//클래스로 만든다면 데이터, 데이터 처리 로직을 한 곳에 둘 수 있다.

export class NumberRange {
  #min;
  #max;
  constructor(min, max) {
    this.#min = min;
    this.#max = max;
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }

  contains(number) {
    return number >= this.#min && number <= this.#max;
  }
}

const operationPlan = new NumberRange(51, 53);
