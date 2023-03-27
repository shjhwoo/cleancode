//상속
class Printer {
  print() {
    console.log("출력");
  }
}

class RedPrinter extends Printer {
  Print() {
    console.log("red print!");
  }
}

const printers = [new Printer(), new RedPrinter()];

printers.forEach((printer) => printer.print());

//다중 상속이 불가해
class Network {
    send();
}

//새로운 기능을 넣어야 하는데 상속이 어색한 경우 컴포지션 사용한다
class Printer {
    #printerHeader
    constructor(printerHeader) {
        this.#printerHeader = printerHeader;
    }

    print() {
        this.#printerHeader?
        this.#printerHeader.print():
      console.log("출력");
    }
}
  
class RedPrinterHeader {
    Print() {
        console.log("red print!");
    }
}

class BlackPrinterHeader {
    Print() {
        console.log("black print!");
    }
}

const printers = [new Printer(), new Printer(new RedPrinterHeader()), new Printer(new BlackPrinterHeader())];

printers.forEach((printer) => printer.print());
