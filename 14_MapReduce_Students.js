// PRACTICAL 14 — MongoDB MapReduce demonstration.
// Legacy mapReduce is deprecated/removed in some newer MongoDB versions.
// Use the aggregation alternative below if mapReduce is unavailable.
db = db.getSiblingDB("CollegeDB");
db.StudentMarks.insertMany([
  {Student_ID: 1, Name: "Aarav", Course: "BCA", Marks: 82},
  {Student_ID: 2, Name: "Ananya", Course: "BCA", Marks: 88},
  {Student_ID: 3, Name: "Rohan", Course: "BSc IT", Marks: 76},
  {Student_ID: 4, Name: "Meera", Course: "BCA", Marks: 92},
  {Student_ID: 5, Name: "Kabir", Course: "BSc IT", Marks: 80}
], {ordered: false});

var mapFunction = function () {
  emit(this.Course, {count: 1, totalMarks: this.Marks});
};
var reduceFunction = function (course, values) {
  var result = {count: 0, totalMarks: 0};
  values.forEach(function (value) {
    result.count += value.count;
    result.totalMarks += value.totalMarks;
  });
  return result;
};

print("MapReduce result (if supported by this MongoDB version):");
try {
  db.StudentMarks.mapReduce(mapFunction, reduceFunction, {out: {replace: "CourseStatistics"}});
  db.CourseStatistics.find().forEach(printjson);
  print("Average marks can be calculated as value.totalMarks / value.count.");
} catch (e) {
  print("mapReduce unavailable in this MongoDB version. Use the aggregation alternative below.");
}

print("Aggregation alternative: course count and average marks:");
db.StudentMarks.aggregate([
  {$group: {_id: "$Course", studentCount: {$sum: 1}, averageMarks: {$avg: "$Marks"}}},
  {$sort: {_id: 1}}
]).forEach(printjson);

// Map emits: course -> {count: 1, totalMarks: Marks}
// Reduce combines counts and total marks per course.
// Average = totalMarks / count; aggregation computes $avg directly.
