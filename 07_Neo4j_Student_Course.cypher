// PRACTICAL 7 — Run in Neo4j Browser or cypher-shell.
// Clean only nodes created for this practical if you want to rerun:
MATCH (s:Student) WHERE s.lab = 'LabSheet2' DETACH DELETE s;
MATCH (c:Course) WHERE c.lab = 'LabSheet2' DETACH DELETE c;

CREATE
  (s1:Student {Student_ID: 1, Name: 'Aarav Sharma', lab: 'LabSheet2'}),
  (s2:Student {Student_ID: 2, Name: 'Ananya Verma', lab: 'LabSheet2'}),
  (s3:Student {Student_ID: 3, Name: 'Rohan Singh', lab: 'LabSheet2'}),
  (s4:Student {Student_ID: 4, Name: 'Meera Gupta', lab: 'LabSheet2'}),
  (s5:Student {Student_ID: 5, Name: 'Kabir Joshi', lab: 'LabSheet2'}),
  (c1:Course {Course_ID: 'BCA', Name: 'BCA', lab: 'LabSheet2'}),
  (c2:Course {Course_ID: 'BSIT', Name: 'BSc IT', lab: 'LabSheet2'}),
  (c3:Course {Course_ID: 'MCA', Name: 'MCA', lab: 'LabSheet2'}),
  (s1)-[:ENROLLED_IN]->(c1),
  (s2)-[:ENROLLED_IN]->(c1),
  (s3)-[:ENROLLED_IN]->(c2),
  (s4)-[:ENROLLED_IN]->(c1),
  (s5)-[:ENROLLED_IN]->(c2);

 // 2. Display all students
MATCH (s:Student {lab: 'LabSheet2'}) RETURN s;

 // 3. Students enrolled in BCA
MATCH (s:Student {lab: 'LabSheet2'})-[:ENROLLED_IN]->(c:Course {Course_ID: 'BCA'})
RETURN s.Name AS Student, c.Name AS Course;

 // 4. All courses for one student
MATCH (s:Student {Student_ID: 1, lab: 'LabSheet2'})-[:ENROLLED_IN]->(c:Course)
RETURN s.Name, collect(c.Name) AS Courses;

 // 5. Add a relationship then remove it
MATCH (s:Student {Student_ID: 3, lab: 'LabSheet2'}), (c:Course {Course_ID: 'BCA', lab: 'LabSheet2'})
CREATE (s)-[:ENROLLED_IN]->(c);

MATCH (s:Student {Student_ID: 3, lab: 'LabSheet2'})-[r:ENROLLED_IN]->(c:Course {Course_ID: 'BCA', lab: 'LabSheet2'})
DELETE r;
