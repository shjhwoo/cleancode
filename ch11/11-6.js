targetTemperature(aPlan);

// 다른모듈에 있는 함수라고 가정
function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  // ...
}

//바꾸기...
targetTemperature(plan, thermostat.currentTemperature);

function targetTemperature2(plan, currentTemperature) {
  //...
}
