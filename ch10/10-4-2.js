import { result } from "lodash";

export function rating(voyage, history) {
  return voyage.zone === "china" && hasChina(history)
    ? new ExperiencedChina(voyage, history).value
    : new Rating(voyage, history).value;
  // 투자 등급 신용정보 등등 공통만 클래스, 예외적인 부분만 오버라이딩 해 나가면 굳이 조건문 쓸 이유없어
}

//계산 시 반복적으로 활용되는 부분은 중국 포함 여부.
//중국이냐 아니냐에 따라서 계산 방식이 조금씩 달라짐

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const profit = this.voyageProfitFactor;
    const risk = this.voyageRisk;
    const historyRisk = this.captainHistoryRisk;
    return profit * 3 > risk + historyRisk * 2 ? "A" : "B";
  }

  get voyageProfitFactor() {
    // 수익 요인
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "east-indies") result += 1;
    result += this.voyageHistoryAndLengthFactor;
    return result;
  }

  get voyageHistoryAndLengthFactor() {
    let result = 0;
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }

  get voyageRisk() {
    // 항해 경로 위험요소
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    // 선장의 항해 이력 위험 요소
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }
}

class ExperiencedChina extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageHistoryAndLengthFactor() {
    let result = super.voyageHistoryAndLengthFactor + 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
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
