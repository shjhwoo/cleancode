export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  get courses() {
    return [...this.#courses]; //컬렉션을 캡슐화한다. 절대로 값을 직접 주지 않는다
  }

  addCourse(course) {
    //필요한 인터페이스만 정의한다.
    this.#courses.push(course);
  }

  removeCourse(course) {
    this.#courses.filter((c) => c.name !== course.name);
  }
}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const ellie = new Person("엘리");
ellie.addCourse(new Course("리팩토링", true)); //이 부분은 setter로 변경하지 않아서?
console.log(ellie.courses.length);

//문제점!
//읽어온 컬렉션 자체에 변경을 가한다는 게 큰 문제점이다.

//할 수 있는 작업만 노출하자
