
use("StudentDB");

// 1. Create collections
db.createCollection("Students");
db.createCollection("Faculty");
db.createCollection("Courses");

// 2. Insert a single student
db.Students.insertOne({
  RollNumber: 101,
  Name: "Rahul",
  Department: "CSE",
  Semester: 5,
  CGPA: 8.2
});

// 3. Insert multiple students
db.Students.insertMany([
  {
    RollNumber: 102,
    Name: "Priya",
    Department: "IT",
    Semester: 5,
    CGPA: 8.5
  },
  {
    RollNumber: 103,
    Name: "Aman",
    Department: "CSE",
    Semester: 5,
    CGPA: 7.8
  },
  {
    RollNumber: 104,
    Name: "Neha",
    Department: "ECE",
    Semester: 3,
    CGPA: 8.1
  }
]);

// 4. Read all students
db.Students.find();

// 5. Find by Roll Number
db.Students.findOne({ RollNumber: 101 });

// 6. Filter by department
db.Students.find({ Department: "CSE" });

// 7. Display selected fields
db.Students.find(
  {},
  { _id: 0, Name: 1, Department: 1 }
);

// 8. Update one student
db.Students.updateOne(
  { RollNumber: 101 },
  { $set: { Department: "IT" } }
);

// 9. Update multiple students
db.Students.updateMany(
  { Department: "CSE" },
  { $set: { Semester: 6 } }
);

// 10. Replace one student
db.Students.replaceOne(
  { RollNumber: 102 },
  {
    RollNumber: 102,
    Name: "Priya Sharma",
    Department: "IT",
    Semester: 6,
    CGPA: 8.7
  }
);

// 11. Add Email field
db.Students.updateMany(
  {},
  { $set: { Email: "student@example.com" } }
);

// 12. Remove Email field
db.Students.updateMany(
  {},
  { $unset: { Email: "" } }
);

// 13. Delete one student
db.Students.deleteOne({ RollNumber: 104 });

// 14. Delete students matching a condition
db.Students.deleteMany({ Department: "ECE" });

// 15. Count students
db.Students.countDocuments();

// 16. Verify final records
db.Students.find();


