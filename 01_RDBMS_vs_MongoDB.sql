-- PRACTICAL 1: MySQL representation of student data
-- Run in MySQL client. Database/table creation is safe to repeat with IF NOT EXISTS.
CREATE DATABASE IF NOT EXISTS CollegeDB;
USE CollegeDB;

CREATE TABLE IF NOT EXISTS Student (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Course VARCHAR(50) NOT NULL,
    Semester INT NOT NULL,
    Marks DECIMAL(5,2) NOT NULL
);

INSERT INTO Student (Student_ID, Name, Course, Semester, Marks) VALUES
(1, 'Aarav Sharma', 'BCA', 2, 82.50),
(2, 'Ananya Verma', 'BCA', 4, 88.00),
(3, 'Rohan Singh', 'BSc IT', 2, 76.00),
(4, 'Meera Gupta', 'BCA', 6, 91.50),
(5, 'Kabir Joshi', 'BSc IT', 4, 79.00)
ON DUPLICATE KEY UPDATE
Name=VALUES(Name), Course=VALUES(Course),
Semester=VALUES(Semester), Marks=VALUES(Marks);

SELECT * FROM Student;
SELECT * FROM Student WHERE Course = 'BCA';
UPDATE Student SET Marks = 85.00 WHERE Student_ID = 1;
SELECT COUNT(*) AS TotalStudents FROM Student;

-- Equivalent MongoDB documents (run these lines separately in mongosh):
-- use CollegeDB
-- db.Students.insertMany([
--   {Student_ID:1, Name:"Aarav Sharma", Course:"BCA", Semester:2, Marks:82.5},
--   {Student_ID:2, Name:"Ananya Verma", Course:"BCA", Semester:4, Marks:88},
--   {Student_ID:3, Name:"Rohan Singh", Course:"BSc IT", Semester:2, Marks:76},
--   {Student_ID:4, Name:"Meera Gupta", Course:"BCA", Semester:6, Marks:91.5},
--   {Student_ID:5, Name:"Kabir Joshi", Course:"BSc IT", Semester:4, Marks:79}
-- ])
--
-- Comparison:
-- RDBMS: tables/rows, predefined schema, relations via keys/joins, strong constraints.
-- MongoDB: collections/BSON documents, flexible document fields, embedded data, horizontal scaling via sharding.
-- SQL is suitable for structured relational transactions; MongoDB is useful for evolving or nested document data.
