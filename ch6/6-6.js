let defaultOwner = { firstName: "마틴", lastName: "파울러" };

export function getDefaultOwner() {
  return defaultOwner;
}

//객체를 리턴하기 때문에, 객체를 외부에서 마음대로 변경할수있다는 위험존재.
// 주소값이기 때문이다.!
// 막으려면, 값/ 클래스 을 리턴할것.
export function getDefaultOwner() {
  return { ...defaultOwner };
}

export function getDefaultOwner() {
  return JSON.parse(JSON.stringify(defaultOwner));
}

class Person {
  #lastName;
  #firstName;
  constructor(name) {
    this.#lastName = name.lastName;
    this.#firstName = name.firstName;
  }
  get lastName() {
    return this.#lastName;
  }

  get firstName() {
    return this.#lastName;
  }
}

export function getDefaultOwner() {
  const person = new Person(defaultOwner);
  return person;
}
