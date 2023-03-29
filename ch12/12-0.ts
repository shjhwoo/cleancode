//새로운 기능을 넣어야 하는데 상속이 어색한 경우 컴포지션 사용한다
class Printer {
  private printerHeader: PrinterHeader;
  constructor(private printerHeader?: PrinterHeader) {
    this.printerHeader = printerHeader
      ? printerHeader
      : new DefaultPrinterHeader();
  }

  print() {
    this.printerHeader.print();
  }
}

class DefaultPrinterHeader implements PrinterHeader {
  print(): void {
    console.log("출력"); //이렇게 기본, null인 경우에 대해 클래스로 만들어서 규격화할 수 있다.
  }
}

interface PrinterHeader {
  print(): void;
}

class RedPrinterHeader implements PrinterHeader {
  Print() {
    console.log("red print!");
  }
}

class BlackPrinterHeader implements PrinterHeader {
  Print() {
    console.log("black print!");
  }
}

const printers = [
  new Printer(),
  new Printer(new RedPrinterHeader()),
  new Printer(new BlackPrinterHeader()),
];

printers.forEach((printer) => printer.print());
