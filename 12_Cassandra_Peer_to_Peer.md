# Practical 12 — Cassandra peer-to-peer replication

Cassandra nodes have equal roles; there is no permanent primary/master. Replicas for a partition are selected by the replication strategy and partition key.

## Lab steps
1. Install a compatible Cassandra release and configure at least three nodes with unique addresses, cluster name, seeds, and token allocation according to that release's documentation.
2. Start nodes and verify with `nodetool status`.
3. Create a keyspace with replication factor 3 (only when three nodes are available):
```sql
CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {'class':'NetworkTopologyStrategy', 'datacenter1':3};
```
For a single-node lab, use replication factor 1; RF 3 requires three replicas/nodes.
4. Create table and insert data:
```sql
USE CollegeDB;
CREATE TABLE IF NOT EXISTS Students (
  Student_ID int PRIMARY KEY, Name text, Course text, Semester int, Marks double
);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (1, 'Aarav Sharma', 'BCA', 2, 82.5);
SELECT * FROM Students;
```
5. Check node status with `nodetool status`; run a consistency-aware read from the cluster. Replicas are determined by partition key and replication strategy; do not assume every node stores every row.
6. To explain peer-to-peer vs master-slave: Cassandra nodes can coordinate requests and replicas share responsibilities; a traditional master-slave model directs writes through a primary and replicates to secondaries.

Exact network and datacenter settings depend on Cassandra version and environment. Verify official configuration before exposing nodes to a network.
