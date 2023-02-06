export class Order {
  constructor(priority) {
    this.priority = priority;
  }

  isHighPriority() {
    return this.priority === "high" || this.priority === "rush";
  }
}

const orders = [new Order("normal"), new Order("high"), new Order("rush")];

const highPriorityCount = orders.filter((o) => o.isHighPriority()).length;

console.log(highPriorityCount);
