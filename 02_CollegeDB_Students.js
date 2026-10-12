// PRACTICAL 2 — Run with: mongosh < 02_CollegeDB_Students.js
db = db.getSiblingDB("CollegeDB");
db.Students.insertMany([
  {Student_ID: 1, Name: "Aarav Sharma", Course: "BCA", Semester: 2, Marks: 82.5},
  {Student_ID: 2, Name: "Ananya Verma", Course: "BCA", Semester: 4, Marks: 88},
  {Student_ID: 3, Name: "Rohan Singh", Course: "BSc IT", Semester: 2, Marks: 76},
  {Student_ID: 4, Name: "Meera Gupta", Course: "BCA", Semester: 6, Marks: 91.5},
  {Student_ID: 5, Name: "Kabir Joshi", Course: "BSc IT", Semester: 4, Marks: 79}
], {ordered: false});

print("1. All students:");
db.Students.find({}, {_id: 0}).forEach(printjson);
print("2. Students in BCA:");
db.Students.find({Course: "BCA"}, {_id: 0}).forEach(printjson);
print("3. Update marks for Student_ID 1:");
printjson(db.Students.updateOne({Student_ID: 1}, {$set: {Marks: 85}}));
print("4. Delete one student (Student_ID 5):");
printjson(db.Students.deleteOne({Student_ID: 5}));
print("5. Total students:");
print(db.Students.countDocuments({}));
