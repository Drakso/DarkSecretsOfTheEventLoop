// Average of 10 runs = 19.7ms

class Order {
    constructor(id, product, description, discount ) {
      this.id = id;
      this.product = product;
      this.description = description;
      this.discount = discount;
    }
  }

const orders = [];
orders.push(new Order(1,"mouse", "Priority order", undefined));
orders.push(new Order(2,"mouse", undefined, 20));
orders.push(new Order(3,"mouse", "After holidays", 10));
orders.push(new Order(4,"keyboard", "Priority order", 5));
orders.push(new Order(5,"keyboard", undefined, undefined));
orders.push(new Order(6,"keyboard", undefined , 15));
orders.push(new Order(7,"monitor", "Fragile", undefined));
orders.push(new Order(8,"monitor HD", "Fragile", 5));
orders.push(new Order(9,"case", undefined, undefined));
orders.push(new Order(10,"cooler", undefined, undefined));

for(const order of orders) {
    console.log(`Order: ${order.id}, 
product: ${order.product}
${order.description === undefined ? "No description" : order.description}`);
}