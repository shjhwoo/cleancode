export function rating(voyage, history) {
  // 투자 등급
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return "A";
  else return "B";
}

function voyageProfitFactor(voyage, history) {
  // 수익 요인
  let result = 2;
  if (voyage.zone === "china") result += 1;
  if (voyage.zone === "east-indies") result += 1;
  if (voyage.zone === "china" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}

function voyageRisk(voyage) {
  // 항해 경로 위험요소
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["china", "east-indies"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  // 선장의 항해 이력 위험 요소
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === "china" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

function hasChina(history) {
  // 중국을 경유하는가?
  return history.some((v) => "china" === v.zone);
}

const voyage = { zone: "west-indies", length: 10 };
const history = [
  { zone: "east-indies", profit: 5 },
  { zone: "west-indies", profit: 15 },
  { zone: "china", profit: -2 },
  { zone: "west-africa", profit: 7 },
];

const rate = rating(voyage, history);
console.log(rate);

//
class Zone {
  constructor(zone) {
    this.zone = zone;
  }

  get zone() {
    return this.zone;
  }

  hasChina() {
    return this.zone === "china";
  }

  hasEastIndies() {
    return this.zone === "east-indies";
  }
}

class Voyage extends Zone {
  #length;
  constructor(zone, length) {
    super(zone);
    this.#length = length;
  }

  get length() {
    return this.#length;
  }

  getVoyageRisk() {
    let result = 1;
    if (this.#length > 4) result += 2;
    if (this.#length > 8) result += this.#length - 8;
    if (this.hasChina() || this.hasEastIndies()) result += 4;
    return Math.max(result, 0);
  }

  calcVoyageProfitFactor(historyList) {
    let result = 2;
    if (this.hasEastIndies()) return 3;
    if (this.hasChina()) result += 1;
    if (this.hasChina() && hasChina(historyList)) {
      result += 3;
      if (historyList.length > 10) result += 1;
      if (this.#length > 12) result += 1;
      if (this.#length > 18) result -= 1;
    } else {
      if (historyList.length > 8) result += 1;
      if (this.#length > 14) result -= 1;
    }
    return result;
  }
}

class History extends Zone {
  //개별 이력
  #profit;
  constructor(zone, profit) {
    super(zone);
    this.#profit = profit;
  }

  get profit() {
    return this.#profit;
  }
}

const voyage2 = new Voyage("west-indies", 10);
const history2 = [
  new History("east-indies", 5),
  new History("west-indies", 15),
  new History("china", -2),
  new History("west-africa", 7),
];

const rate2 = new Risk(voyage2, history2);
console.log(rate2);

class Risk {
  #voyage;
  #historyList;
  constructor(voyage, historyList) {
    this.#voyage = voyage;
    this.#historyList = historyList;
  }

  get voyage() {
    return this.#voyage;
  }

  get historyList() {
    return this.#historyList;
  }

  getRating() {
    return this.hasMoreProfits ? "A" : "B";
  }

  hasMoreProfits() {
    return this.getVoyageProfitFactor() * 3 > this.getRiskTotal();
  }

  getRiskTotal() {
    return this.#voyage.getVoyageRisk() + this.getCaptainHistoryRisk() * 2;
  }

  getVoyageProfitFactor() {
    let result = 2;
    if (this.#voyage.hasChina()) result += 1;
    if (this.#voyage.hasEastIndies()) result += 1;
    if (this.#voyage.hasChina() && this.hasChinaHistory()) {
      result += 3;
      if (this.#historyList.length > 10) result += 1;
      if (this.#voyage.length > 12) result += 1;
      if (this.#voyage.length > 18) result -= 1;
    } else {
      if (this.#historyList.length > 8) result += 1;
      if (this.#voyage.length > 14) result -= 1;
    }
    return result;
  }

  hasChinaHistory() {
    return this.#historyList.some((v) => v.hasChina());
  }

  getCaptainHistoryRisk() {
    let result = 1;
    if (this.#historyList.length < 5) result += 4;
    result += this.#historyList.filter((v) => v.profit < 0).length;
    if (this.#voyage.hasChina() && this.hasChinaHistory()) result -= 2;
    return Math.max(result, 0);
  }
}
