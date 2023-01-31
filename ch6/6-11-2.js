import fs from "fs";

//refact!

function checkFileName() {
  if (!process.argv[2]) {
    throw new Error("파일 이름을 입력하세요");
  }
}

function checkFileExist() {
  const fileName = `./${process.argv[2]}.json`;
  if (!fs.existsSync(fileName)) {
    throw new Error("파일이 존재하지 않습니다");
  }
  return fileName;
}

function readFileRawContent(fileName) {
  const rawData = fs.readFileSync(fileName);
  return JSON.parse(rawData);
}

function printProductCount(orders) {
  if (process.argv.includes("-r")) {
    console.log(orders.filter((order) => order.status === "ready").length);
  } else {
    console.log(orders.length);
  }
}

checkFileName();
const fileName = checkFileExist();
const orders = readFileRawContent(fileName);
printProductCount(orders);
