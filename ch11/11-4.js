export function temperatureAlerts(room, plan) {
  const alerts = [];
  if (!plan.withinRange(room.daysTempRange)) {
    alerts.push("room temperature went outside range");
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(daysTempRange) {
    return (
      daysTempRange.low >= this._temperatureRange.low &&
      daysTempRange.high <= this._temperatureRange.high
    );
  }
}
