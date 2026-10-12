# Practical 13 — Sharding + replication architecture

## Architecture
Client → `mongos` router → Config Server Replica Set (metadata)
`mongos` → Shard A Replica Set (Primary + Secondary members)
`mongos` → Shard B Replica Set (Primary + Secondary members)

## Implementation outline
1. Configure a config-server replica set.
2. Configure at least two shard replica sets, each with at least three voting members for robust elections.
3. Start `mongos` with the config-server replica-set connection string.
4. Add shard replica sets from `mongosh` connected to `mongos`:
```javascript
sh.addShard("shardA/hostA1:27117,hostA2:27117,hostA3:27117");
sh.addShard("shardB/hostB1:27217,hostB2:27217,hostB3:27217");
sh.enableSharding("CollegeDB");
db = db.getSiblingDB("CollegeDB");
db.Students.createIndex({Student_ID: 1});
sh.shardCollection("CollegeDB.Students", {Student_ID: 1});
for (let i = 1; i <= 30; i++) {
  db.Students.updateOne(
    {Student_ID: i},
    {$set: {Student_ID: i, Name: "Student " + i, Course: i % 2 ? "BCA" : "BSc IT"}},
    {upsert: true}
  );
}
sh.status();
```
Replace hostnames and ports with the actual configured replica sets; the commands cannot work until the cluster exists.

## Verification and explanation
- `sh.status()` shows shards, databases, collections and chunk distribution.
- `rs.status()` on each shard replica set shows primary/secondary health.
- Sharding distributes partitions for capacity and throughput.
- Replication maintains copies and can allow election after a member failure.
- A shard failure is tolerated only if its replica set still has an eligible majority and healthy data-bearing members.
