export function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");

  // calculate outstanding : 주석 기준으로 코드를 읽으며 묶자
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date();
  invoice.dueDate = new Date( //객체를 수정하는 것은 좋지 않다.
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

const invoice = {
  orders: [{ amount: 2 }, { amount: 5 }],
  customer: "엘리",
};
printOwing(invoice);

function refactoredPrintCustomerOwes(invoice) {
  const SumofOrders = getSumOfOrders(invoice);
  //const dueDate = getDueDate();
  // printDetails("name", invoice.customer);
  // printDetails("amount", SumofOrders);
  // printDetails("due", dueDate);
  printDetails(invoice, SumofOrders);
}

function getSumOfOrders(invoice) {
  // let sumofOrders = 0; //지역 변수는 아주 가까이 붙여 쓰자
  // for (const o of invoice.orders) {
  //   sumofOrders += o.amount;
  // }
  // return sumofOrders;
  return invoice.orders.reduce((sum, order) => (sum += order.amount), 0); //이렇게 한 줄로 줄여쓰기 가능
}

function getDueDate() {
  const today = new Date();
  const dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
  return dueDate.toLocaleDateString();
}

// function printDetails(field, value) {
//   console.log(`${field}: ${value}`);
// }

function printDetails(invoice, sumofOrders) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${sumofOrders}`);
  console.log(`due: ${getDueDate()}`);
}

refactoredPrintCustomerOwes(invoice);
