// PRACTICAL 9 — Single-server MongoDB CRUD.
// Start local mongod first, then run: mongosh < 09_Local_MongoDB_CRUD.js
db = db.getSiblingDB("LocalNoSQLLab");
db.createCollection("Students");
db.Students.insertMany([
  {Student_ID: 1, Name: "Aarav", Course: "BCA", Marks: 82},
  {Student_ID: 2, Name: "Ananya", Course: "BCA", Marks: 88},
  {Student_ID: 3, Name: "Rohan", Course: "BSc IT", Marks: 76}
], {ordered: false});

print("CREATE/INSERT:"); db.Students.find({}, {_id: 0}).forEach(printjson);
print("READ/filter:"); db.Students.find({Course: "BCA"}, {_id: 0}).forEach(printjson);
print("UPDATE:"); printjson(db.Students.updateOne({Student_ID: 1}, {$set: {Marks: 90}}));
print("DELETE:"); printjson(db.Students.deleteOne({Student_ID: 3}));
print("VERIFY final data:"); db.Students.find({}, {_id: 0}).forEach(printjson);
print("Count: " + db.Students.countDocuments({}));
