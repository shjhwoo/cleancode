const organization = { name: "Acme Gooseberries", country: "GB" };

organization.name = "Dream Coding";
console.log(organization.name);
console.log(organization.country);

//캡슐화!

class Organization {
  #name;
  #country;
  constructor(name, country) {
    //인자를 각각 받아도 되고. 객체 자체를 인자로 줘도 된다
    // this.#data = data
    this.#name = name;
    this.#country = country;
  }

  get name() {
    return this.#name;
  }

  get country() {
    return this.#country;
  }

  set name(newName) {
    this.#name = newName;
  }

  //setter 있을 경우 this. 값을 직접 가지고온다
  get RawData() {
    return { name: this.name, country: this.country };
  }

  get RawData() {
    return { ...this.data };
  }
}

const myORG = new Organization(organization.name, organization.country);

console.log(myORG.name, "변경 전");
console.log(myORG.country);
//myORG.name("Hello Ellie");
console.log(myORG.name, "변경 후");

const yourORG = new Organization(organization);

console.log(myORG.name, "변경 전");
console.log(myORG.country);
