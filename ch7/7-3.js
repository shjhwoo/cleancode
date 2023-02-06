export class Order {
  constructor(priority) {
    this.priority = priority;
  }

  isHighPriority() {
    return this.priority === "high" || this.priority === "rush";
    return this.priority.higherThan("normal"); //아래 클래스를 사용해 우선순위 로직을 모아서 이렇게도 작성가능
  }
}

const orders = [new Order("normal"), new Order("high"), new Order("rush")];

const highPriorityCount = orders.filter((o) => o.isHighPriority()).length;

console.log(highPriorityCount);

//더 정리하자면 값 범위 제한도 걸 수 있다! 진짜. 정말 필요하다면, 많이 반복된다면 그떄 쓰자.
class Priority {
  #value;
  constructor(value) {
    if (Priority.legalValues().includes(value)) {
      this.#value = value;
    } else {
      throw new Error(`${value} is not a valid priority`); //ENUM으로도 검증 가능!!
    } //요 안에서 값 검증하는 건 보안적으로 좋은 건 아니다.
  }

  get index() {
    return Priority.legalValues().indexOf(this.#value);
  }

  equals(other) {
    return this.#index === other.index;
  }

  higherThan(other) {
    return this.#index > other.index;
  }

  static legalValues() {
    return ["low", "high", "rush", "normal"];
  }
}

//타입이 있는 언어라면! ENUM 활용
//인스턴스를 미리 인덱스 지정해두면 편하다. 이름과 인덱스를 객체로 묶어서 클래스로 찍어내면된다.
