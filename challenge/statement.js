//변수 함수 기본적인 베이스를 정리하고: 눈에 보이는 로우레벨부터 정리하고
//다되면 하이레벨 리팩토링 들어가자
/*
format 함수같은 유틸리티 함수는 외부로 추출해준다
switch 문의 경우, 다형성 생각, 단 일단 함수로 만들고 나서 정리할 생각해보자.
그 결과에서 인수를 줄일 방법을 찾아보자.
*/

/*
데이터와 로직을 분리하기
클래스로 만들어 보자 
*/
export function printStatement(invoice, printMode) {
  const formattedInvoice = new Invoice(invoice);
  const printer = new Printer(printMode, formattedInvoice);
  return printer.print();
}

//인보이스는 인보이스 자체만의 속성과 메서드를 가져야 할거같다 프린터 메서드는 따로 분리해두고, 인보이스 내용을 프린터에 전해주는 걸로 바꿔보자
class Invoice {
  constructor(invoice) {
    this.customer = invoice.customer;
    this.performancesList = invoice.performances; //내가 필요한 play 형태로 바꿔서 써도 됬었네..
  }

  get totalAmount() {
    const totalAmount = this.performancesList.reduce((perf1, perf2) => {
      return perf1.thisAmount + perf2.thisAmount;
    }, 0);
    return this.format(totalAmount / 100);
  }

  format() {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;
  }

  get volumeCredits() {
    return this.performancesList.reduce((perf1, perf2) => {
      return perf1.credits + perf2.credits;
    }, 0);
  }
}

class Printer {
  constructor(printMode, invoice) {
    this.printMode = printMode;
    this.customer = invoice.customer;
    this.performancesList = invoice.performancesList;
    this.totalAmount = invoice.totalAmount;
    this.volumeCredits = invoice.volumeCredits;
  }

  setPrinter() {
    switch (this.printMode) {
      case "HTML":
        return new HTMLformatPrinter();
      case "string":
        return new StringPrinter();
    }
  }

  print() {
    return this.setPrinter().print(
      this.customer,
      this.performancesList,
      this.totalAmount,
      this.volumeCredits
    );
  }
}

class SuperPrinter {
  print(customer, performancesList, totalAmount, volumeCredits) {
    return `${this.printStatementHead(customer)}${this.printStatementList(
      performancesList
    )}${this.printTotalAmountList(totalAmount)}${this.printVolumeCreditsList(
      volumeCredits
    )}`;
  }
}

class StringPrinter extends SuperPrinter {
  constructor() {
    super();
  }

  printStatementHead(customer) {
    return `청구 내역 (고객명: ${customer})\n`;
  }

  printStatementList(performancesList) {
    const stateDetail = performancesList.reduce((perf1, perf2) => {
      return perf1.printPlayStatement() + perf2.printPlayStatement();
    }, 0);

    return stateDetail;
  }

  printTotalAmountList(totalAmount) {
    return `총액: ${totalAmount}\n`;
  }

  printVolumeCreditsList(volumeCredits) {
    return `적립 포인트: ${volumeCredits}점\n`;
  }
}

class HTMLformatPrinter extends SuperPrinter {
  constructor() {
    super();
  }

  printStatementHead(customer) {
    return `<h1>청구 내역 (고객명: ${customer})</h1>`;
  }

  printStatementList(performancesList) {
    return `<table>
    <tr><th>play</th><th>석</th><th>cost</th></tr>
    ${performancesList.map((perf) => {
      return `<tr><td>${perf.playID}</td><td>${perf.audience}</td><td>${perf.calcCredits}</td></tr>`;
    })}
    </table>`;
  }

  printTotalAmountList(totalAmount) {
    return `<p>총액: <em>${totalAmount}</em></p>`;
  }

  printVolumeCreditsList(volumeCredits) {
    return `<p>적립 포인트: <em>${volumeCredits}</em>점</p>`;
  }
}

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

  get credits() {
    return this.PlayDetail.calcCredits(this.audience);
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
