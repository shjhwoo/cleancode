class Hotel {
  constructor() {
    this.rooms = [];
  }

  addRoom(roomNumber) {
    this.rooms[roomNumber](new Room(roomNumber));
  }

  emptyRoom(roomNumber) {
    this.rooms[roomNumber] = new emptyRoom(roomNumber); //null 원시값보단 특이케이스 넣자 null 또는 unknown 나타내는 객체를 쓰자.
  }

  cleanRooms() {
    this.rooms.forEach((room) => room.clean());
  }
}

class Room {
  constructor(roomNumber) {
    this.roomNumber = roomNumber;
  }

  clean() {
    console.log(this.roomNumber + "청소");
  }
}

class emptyRoom extends Room {
  clean() {
    console.log("방 비었어.");
  }
}

export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer === "unknown"
      ? new unknownCustomer()
      : new Customer(this._customer);
  }
}

class unknownCustomer extends Customer {
  get name() {
    return "occupant";
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  let customerName;
  customerName = aCustomer.name;

  return customerName;
}
