# Lab Sheet 2 — NoSQL Database Design

This folder contains examples and setup notes for all 15 practicals.

## Important
- MongoDB JavaScript files (`.js`) are intended for **mongosh**, not Node.js.
- SQL (`.sql`) is for MySQL.
- `.cql` files are for `cqlsh` (Cassandra).
- `.cypher` files are for Neo4j Browser or `cypher-shell`.
- `.txt` files contain commands for Redis/HBase or multi-node setup notes.
- Distributed deployment exercises (sharding and replication) require multiple MongoDB/Cassandra processes or machines. The guides describe the configuration and verification steps; running the files alone does not create a distributed cluster.
- Back up any existing data before running commands that delete/drop collections or databases.

## Practical index
1. `01_RDBMS_vs_MongoDB.sql` — MySQL table + equivalent MongoDB documents + comparison.
2. `02_CollegeDB_Students.js` — MongoDB CRUD and count.
3. `03_Orders_Embedded_Documents.js` — embedded orders, updates, aggregation.
4. `04_Redis_Student_System.txt` — Redis key/value operations.
5. `05_Cassandra_Students.cql` — Cassandra table and CRUD/query examples.
6. `06_HBase_Students.txt` — HBase table, put/get/scan/delete.
7. `07_Neo4j_Student_Course.cypher` — nodes and ENROLLED_IN relationships.
8. `08_MongoDB_Cassandra_Neo4j_Comparison.md` — comparison.
9. `09_Local_MongoDB_CRUD.js` — local single-server CRUD verification.
10. `10_MongoDB_Sharding_Guide.md` — 20+ records, shard key, config and verification.
11. `11_MongoDB_Primary_Secondary_Replication.md` — replica set setup and failover.
12. `12_Cassandra_Peer_to_Peer.md` — multi-node Cassandra and replication factor.
13. `13_Sharding_and_Replication.md` — sharded cluster with replicated shards.
14. `14_MapReduce_Students.js` — course counts and average marks using MapReduce plus aggregation alternative.
15. `15_Distribution_Models.md` — five architecture models and comparison.
