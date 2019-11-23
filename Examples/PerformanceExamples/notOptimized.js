// Average of 10 runs = 45.2ms
const orders = [];
orders.push({id: 1, product: "mouse", description: "Priority order"});
orders.push({id: 2, product: "mouse", discount: 20});
orders.push({id: 3, product: "mouse", description: "After holidays", discount: 10});
orders.push({id: 4, product: "keyboard", discount: 5, description: "Priority order"});
orders.push({id: 5, product: "keyboard"});
orders.push({id: 6, discount: 15, product: "keyboard"});
orders.push({id: 7, product: "monitor", description: "Fragile"});
orders.push({id: 8, product: "monitor HD", description: "Fragile", discount: 5});
orders.push({id: 9, product: "case"});
orders.push({id: 10, product: "cooler"});

for(const order of orders) {
    console.log(`Order: ${order.id}, 
product: ${order.product}
${order.description === undefined ? "No description" : order.description}`);
}