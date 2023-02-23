class Organization {
  constructor(data) {
    this._organizationName = data.organizationName;
    this._country = data.country;
  }
  get organizationName() {
    return this._organizationName;
  }
  set organizationName(value) {
    this._organizationName = value;
  }
  get country() {
    return this._country;
  }
  set country(value) {
    this._country = value;
  }
}

const organization = new Organization({
  organizationName: "드림코딩",
  country: "대한민국",
});
