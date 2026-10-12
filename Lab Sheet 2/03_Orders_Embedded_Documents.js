// PRACTICAL 3 — Run with mongosh.
// Each order embeds customer information and an array of products.
db = db.getSiblingDB("CollegeDB");
db.Orders.insertMany([
  {Order_ID: 1001, customer: {Customer_ID: "C01", Name: "Aarav"}, products: [{name: "Keyboard", price: 900, quantity: 1}, {name: "Mouse", price: 400, quantity: 2}]},
  {Order_ID: 1002, customer: {Customer_ID: "C02", Name: "Meera"}, products: [{name: "Monitor", price: 8500, quantity: 1}]},
  {Order_ID: 1003, customer: {Customer_ID: "C01", Name: "Aarav"}, products: [{name: "USB Cable", price: 250, quantity: 3}]},
  {Order_ID: 1004, customer: {Customer_ID: "C03", Name: "Kabir"}, products: [{name: "Laptop Stand", price: 1200, quantity: 1}, {name: "Mouse", price: 400, quantity: 1}]},
  {Order_ID: 1005, customer: {Customer_ID: "C04", Name: "Ananya"}, products: [{name: "Laptop", price: 55000, quantity: 1}]}
], {ordered: false});

print("1. Orders inserted; display all:");
db.Orders.find({}, {_id: 0}).forEach(printjson);
print("2. Orders for customer C01:");
db.Orders.find({"customer.Customer_ID": "C01"}, {_id: 0}).forEach(printjson);
print("3. Update quantity of Mouse in order 1001:");
printjson(db.Orders.updateOne(
  {Order_ID: 1001, "products.name": "Mouse"},
  {$set: {"products.$.quantity": 3}}
));
print("4. Total amount per order (sum of price * quantity):");
db.Orders.aggregate([
  {$unwind: "$products"},
  {$group: {_id: "$Order_ID", totalAmount: {$sum: {$multiply: ["$products.price", "$products.quantity"]}}}},
  {$sort: {_id: 1}}
]).forEach(printjson);
print("5. Orders above amount 5000:");
db.Orders.aggregate([
  {$unwind: "$products"},
  {$group: {_id: "$Order_ID", customer: {$first: "$customer"}, totalAmount: {$sum: {$multiply: ["$products.price", "$products.quantity"]}}}},
  {$match: {totalAmount: {$gt: 5000}}},
  {$sort: {totalAmount: -1}}
]).forEach(printjson);
