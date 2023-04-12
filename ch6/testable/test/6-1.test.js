import { printOwing } from "../6-1";

//실제 출력 동작 확인을 위해 목 콘솔 만들기
class Console {
  #content = "";
  constructor() {}

  log(message) {
    this.#content += `${message}\n`;
  }

  get content() {
    return this.#content;
  }
}

class DateClass {
  constructor() {}

  get today() {
    return {
      getFullYear() {
        return 2022;
      },
      getMonth() {
        return 0;
      },
      getDate() {
        return 21;
      },
    };
  }
}

//한 모듈 안에 같이 테스트 폴더를 둔다
describe("printOwing", () => {
  it("should print owing", () => {
    const invoice = {
      orders: [{ amount: 2 }, { amount: 5 }],
      customer: "엘리",
    };

    const expected = "***";
    const console = new Console();
    const dateInstance = new DateClass();
    printOwing(invoice, console, dateInstance);
    expect(console.content).toBe(expected);
  });
});

// 테스트 위해서는 함수가 순수함수여야 한다
// 동일한 입력 => 동일한 결과
// 콘솔 출력, 날짜 출력의 경우 테스트 결과가 매번 달라질 수 있다

// 이런 인자들은 외부에서 전달해주고,
// 테스트 시에는 가짜로 만들어서 주면 됨(가짜 콘솔, 가짜 날짜객체)
// 이를 DI 라고 한다
