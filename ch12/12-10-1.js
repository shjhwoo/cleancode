class Booking {
  #BookingDelegate;
  constructor(BookingDelegate, extras) {
    this.#BookingDelegate = BookingDelegate;
    this._extras = extras;
  }

  get hasTalkback() {
    return this.#BookingDelegate
      ? this.#BookingDelegate.hasTalkback()
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }

    return result;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.PremiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

const booking = new Booking(show, date);
const premiumBooking = new PremiumBooking(show, date, extras);

class BookingDelegate {
  constructor(schedule, extras) {
    this._schedule = schedule;
    this._extras = extras;
  }

  get hasTalkback() {}
}
