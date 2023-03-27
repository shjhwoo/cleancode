class Person {
  #name;
  constructor(name, gender) {
    this.#name = name;
    this.#gender = gender;
  }

  get name() {
    return this.#name;
  }

  get gender() {
    return this.#gender;
  }
}

function loadFromInput(data) {
  const result = [];
  data.forEach((record) => {
    const person = new Person(record.name, record.gender);
    result.push(person);
  });
  return result;
}

const people = loadFromInput([
  { name: "엘리", gender: "F" },
  { name: "철수", gender: "M" },
  { name: "밥", gender: "M" },
]);
const numberOfMales = people.filter((p) => p.gender === "M").length;
console.log(numberOfMales);
