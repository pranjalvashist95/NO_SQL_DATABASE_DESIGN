# Practical 8 — Same student dataset in MongoDB, Cassandra and Neo4j

| Feature | MongoDB | Cassandra | Neo4j |
|---|---|---|---|
| Data model | Document (BSON) | Wide-column / partitioned rows | Property graph |
| Storage structure | Collections of documents | Tables partitioned by partition key across nodes | Nodes, relationships and properties |
| Query method | MongoDB Query API and aggregation pipeline | CQL (Cassandra Query Language) | Cypher |
| Scalability | Horizontal scale using sharding; replica sets provide redundancy | Peer-to-peer distributed ring; designed for horizontal scale | Clustering and graph-oriented query execution; deployment options vary by edition |
| Strength | Flexible nested documents and application data | High write throughput and availability across distributed nodes | Relationship traversals and connected data |
| Suitable applications | Catalogs, profiles, content, event/document data | Time-series, logs, high-volume writes, globally distributed workloads | Social networks, recommendations, fraud paths, knowledge graphs |

## Example representation
- MongoDB: `{Student_ID: 1, Name: "Aarav Sharma", Course: "BCA", Semester: 2, Marks: 82.5}`
- Cassandra: one `Students` row keyed by `Student_ID`; query patterns should be planned into primary keys.
- Neo4j: `(:Student {Student_ID: 1, Name: "Aarav Sharma"})-[:ENROLLED_IN]->(:Course {Name: "BCA"})`

No single database is best for every workload. Select based on query patterns, consistency needs, operational skills, and data relationships.
