// 예제 1
function totalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
//이렇게 쪼갠다
function getTotalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {}

// 예제 2
export function alertForMiscreant(people, alarm) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms(alarm, p);
      return "Don";
    }
    if (p === "John") {
      setOffAlarms(alarm, p);
      return "John";
    }
  }
  return "";
}

function alertForMiscreant(people, alarm) {
  people
    .filter((name) => isMiscreant(name))
    .forEach((people) => {
      setOffAlarms(alarm, people);
    });
}

function getMiscreantName(people) {
  const idx = people.findIndex((name) => isMiscreant(name));
  return idx !== -1 ? people[idx] : "";
}

function isMiscreant(name) {
  return name === "Don" || name === "John";
}

function setOffAlarms(alarm, p) {
  alarm.setOff("Found Miscreant " + p);
}
