// 예제 1
function setDimension(name, value) {
  if (name === 'height') {
    this._height = value;
    return;
  }
  if (name === 'width') {
    this._width = value;
    return;
  }
}

//개선 후..
//클래스 내에서

class Diagonal {
  constructor(height, width){
    this._height = height;
    this._width = width;
  }

  set height(height){
    this._height = height;
  }

  set width(width){
    this._width = width;
  }
}

// 예제 2
class Concert {
  book(customer, isPremium) {}
}

//개선후
class Concert2 {
  book(customer) {}

  bookPremiumTicket(customer){

  }

  //내부 로직 재 사용되는 경우라면 플래그 인수 써도 되지만, 프라이빗 함수여야 해. 
  //즉 이 안에서만 쓰고
  //외부에선 안 쓰는 게 좋다.
}



// 예제 3
function setSwitch(on);


//개선 후
function turnOn(){}

function turnOff(){}