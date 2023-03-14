export function temperatureAlerts(room, plan) {
  const alerts = [];
  const inRange = plan.withinRange(room.daysTempRange);
  if (!inRange) {
    alerts.push("room temperature went outside range");
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(daysTempRange) {
    const lowBorder = this._temperatureRange.low;
    const highBorder = this._temperatureRange.high;

    return daysTempRange.low >= lowBorder && daysTempRange.high <= highBorder;
  }
}

//어느 정도 규모의 인자를 전달할 건가??

//정확한 규칙은 없다.
