export function printStatement(invoice) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  const stateDetail = invoice.performances.reduce((perf1, perf2) => {
    return perf1.printPlayStatement() + perf2.printPlayStatement();
  }, 0);

  const totalAmount = invoice.performances.reduce((perf1, perf2) => {
    return perf1.thisAmount + perf2.thisAmount;
  }, 0);

  const volumeCredits = invoice.performances.reduce((perf1, perf2) => {
    return perf1.calcCredits + perf2.calcCredits;
  }, 0);

  result += stateDetail;
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

//1차시도: 클래스를 만들어서 정리해보자.

class Plays {
  constructor(name, type) {
    this._name = name;
    this._type = type;
    this._amountDelegate = this.setAmountDelegate();
  }

  setAmountDelegate() {
    switch (this._type) {
      case "tragedy":
        return new TragedyAmountDelegate();
      case "comedy":
        return new ComedyAmountDelegate();
      default:
        return new DefaultAmountDelegate();
    }
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get BaseAmount() {
    return this._amountDelegate.baseAmount;
  }

  calcAmount(numberOfAudiences) {
    return this._amountDelegate.calcAmount(numberOfAudiences);
  }

  calcCredits(numberOfAudiences) {
    return this._amountDelegate.calcCredits(numberOfAudiences);
  }
}

class AmountDelegate {
  constructor(baseAmount) {
    this.baseAmount = baseAmount;
  }
}

class DefaultAmountDelegate extends AmountDelegate {
  get calcAmount() {
    return 0;
  }

  calcCredits(numberOfAudiences) {
    return Math.max(numberOfAudiences - 30, 0);
  }
}

class TragedyAmountDelegate extends AmountDelegate {
  constructor() {
    super(40000);
  }

  calcAmount(numberOfAudiences) {
    return this.baseAmount + this.calcAdditionalAmount(numberOfAudiences);
  }

  calcAdditionalAmount(numberOfAudiences) {
    return numberOfAudiences > 30 ? 1000 * numberOfAudiences - 30 : 0;
  }
}

class ComedyAmountDelegate extends AmountDelegate {
  constructor() {
    super(30000);
  }

  calcAmount(numberOfAudiences) {
    return this.baseAmount + this.calcAdditionalAmount(numberOfAudiences);
  }

  calcAdditionalAmount(numberOfAudiences) {
    return numberOfAudiences > 20
      ? 10000 + 500 * (numberOfAudiences - 20)
      : 300 * numberOfAudiences;
  }

  calcCredits(numberOfAudiences) {
    return (
      super.calcCredits(numberOfAudiences) + Math.floor(numberOfAudiences / 5)
    );
  }
}

class Performance {
  constructor(playID, audience, playsList) {
    this.playID = playID;
    this.audience = audience;
    this.playsList = playsList;
  }

  get PlayDetail() {
    return this.playsList[this.playID];
  }

  get thisAmount() {
    return this.PlayDetail.calcAmount(this.audience);
  }

  printPlayStatement() {
    return `  ${this.PlayDetail.name}: ${this.format(this.thisAmount / 100)} (${
      this.audience
    }석)\n`;
  }

  get calcCredits() {
    return this.PlayDetail.calcCredits(this.audience);
  }

  format() {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;
  }
}

// 사용예:
const playsJSON = {
  hamlet: new Plays("Hamlet", "tragedy"),
  "as-like": new Plays("As You Like It", "comedy"),
  othello: new Plays("Othello", "tragedy"),
};

const invoicesJSON = [
  {
    customer: "BigCo",
    performances: [
      new Performance("hamlet", 55, playsJSON),
      new Performance("as-like", 35, playsJSON),
      new Performance("othello", 40, playsJSON),
    ],
  },
];

const result = printStatement(invoicesJSON[0], playsJSON);
const expected =
  "청구 내역 (고객명: BigCo)\n" +
  "  Hamlet: $650.00 (55석)\n" +
  "  As You Like It: $580.00 (35석)\n" +
  "  Othello: $500.00 (40석)\n" +
  "총액: $1,730.00\n" +
  "적립 포인트: 47점\n";
console.log(result);
console.log(result === expected);
