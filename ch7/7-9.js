function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Kent") {
      return "Kent";
    }
  }
  return "";
}

console.log(foundPerson(["John"]));
console.log(foundPerson(["Don", "John"]));
console.log(foundPerson(["Kent", "Don", "John"]));
console.log(foundPerson(["Lisa", "Don", "Tom"]));

function foundPerson2(people) {
  const found = (name) => name === "Don" || name === "John" || name === "Kent";
  const foundAt = people.findIndex((name) => found(name));
  return foundAt !== -1 ? people[foundAt] : "";
}

console.log(foundPerson2(["John"]));
console.log(foundPerson2(["Don", "John"]));
console.log(foundPerson2(["Kent", "Don", "John"]));
console.log(foundPerson2(["Lisa", "Don", "Tom"]));

//더 간단히.
function foundPerson3(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p)) || "";
}
