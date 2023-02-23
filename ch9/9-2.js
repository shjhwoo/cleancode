class Organization {
  #organizationName;
  #country;

  constructor(data) {
    this.#organizationName = data.organizationName;
    this.#country = data.country;
  }
  get organizationName() {
    return this.#organizationName;
  }
  set organizationName(value) {
    this.#organizationName = value;
  }
  get country() {
    return this.#country;
  }
  set country(value) {
    this.#country = value;
  }
}

const organization = new Organization({
  organizationName: "드림코딩",
  country: "대한민국",
});
