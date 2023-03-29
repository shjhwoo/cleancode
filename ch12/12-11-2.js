class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll {
  constructor(id, CatalogItem, dataLastCleaned) {
    this.id = id; //두루마리 문서, 즉 카탈로그의 사본이며 구분자로 id를 둠. 상속보단 위임이 적절한 경우이다.
    this.CatalogItem = CatalogItem;
    //책에서처럼 카탈로그 클래스를 통채로 주지 말고, 필요한 부분만 함수 인수로 전달해주자.
    this._lastCleaned = dataLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;

    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
