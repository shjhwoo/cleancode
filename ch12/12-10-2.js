function createBird(bird) {
  return new Bird(bird);
}

class Bird {
  constructor(data, delegate) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._numberOfCoconuts = data.numberOfCoconuts;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
    this._delegate = delegate;
  }

  static speciesDelegate() {
    switch (data.type) {
      case "유럽 제비":
        return EuropeanSwallowDelegate(data, this);
      case "아프리카 제비":
        return AfricanSwallowDelegate(data, this);
      case "노르웨이 파랑 앵무":
        return NorwegianBlueParrotDelegate(data, this);
      default:
        return new speciesDelegate(data, this);
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this.delegate ? this.delegate.plumage : this._plumage || "보통이다";
  }

  get airSpeedVelocity() {
    return this.delegate ? this.delegate.airSpeedVelocity : null;
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
  }

  get plumage() {
    if (this._voltage > 100) {
      return "그을렸다";
    } else {
      return this._plumage || "예쁘다";
    }
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}
