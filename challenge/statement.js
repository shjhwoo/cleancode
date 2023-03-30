export function printStatement(invoice, plays) {
  //이름 고침
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = play.calcAmount(perf.audience);
    totalAmount += thisAmount;

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
  }
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

  get baseAmount() {
    return this.baseAmount;
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
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
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
