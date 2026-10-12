-- PRACTICAL 5 — Run in cqlsh.
CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE CollegeDB;

CREATE TABLE IF NOT EXISTS Students (
    Student_ID int PRIMARY KEY,
    Name text,
    Course text,
    Semester int,
    Marks double
);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES (1, 'Aarav Sharma', 'BCA', 2, 82.5);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES (2, 'Ananya Verma', 'BCA', 4, 88.0);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES (3, 'Rohan Singh', 'BSc IT', 2, 76.0);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES (4, 'Meera Gupta', 'BCA', 6, 91.5);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES (5, 'Kabir Joshi', 'BSc IT', 4, 79.0);

SELECT * FROM Students;
-- Cassandra normally requires queryable columns to be designed into the primary key
-- or indexed/materialized appropriately. This simple lab query may require ALLOW FILTERING:
SELECT * FROM Students WHERE Course = 'BCA' ALLOW FILTERING;

UPDATE Students SET Marks = 85.0 WHERE Student_ID = 1;
DELETE FROM Students WHERE Student_ID = 5;
SELECT * FROM Students;
