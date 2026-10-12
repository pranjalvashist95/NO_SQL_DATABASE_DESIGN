# Practical 10 — MongoDB sharding (20+ records)

## Concept
Sharding partitions a collection across multiple shards. A `mongos` router sends queries to the correct shard. Each shard is commonly a replica set in production.

## Sample dataset and shard key
Use a stable, well-distributed key such as `Student_ID` for this lab. In a real system, choose the key based on cardinality, write distribution, and query patterns.

Run in `mongosh` connected to a configured sharded cluster:
```javascript
sh.enableSharding("ShardLab");
db = db.getSiblingDB("ShardLab");
db.Students.createIndex({Student_ID: 1});
sh.shardCollection("ShardLab.Students", {Student_ID: 1});
for (let i = 1; i <= 25; i++) {
  db.Students.updateOne(
    {Student_ID: i},
    {$set: {Student_ID: i, Name: "Student " + i, Course: i % 2 ? "BCA" : "BSc IT", Marks: 60 + (i % 40)}},
    {upsert: true}
  );
}
db.Students.countDocuments({});
sh.status();
db.Students.getShardVersion(); // version details where supported; sh.status() is the main overview
```

## Cluster configuration outline
1. Start a config-server replica set.
2. Start at least two shard replica sets.
3. Start one or more `mongos` routers using the config-server connection string.
4. Connect `mongosh` through `mongos`, then run the commands above.
5. Use `sh.status()` and cluster monitoring to inspect sharding status and chunk distribution.

A single standalone MongoDB server cannot demonstrate real distribution across physical/logical shards. Use a test cluster with separate ports/processes or containers. Exact startup commands depend on MongoDB version and operating system.

## Benefits and limitations
Benefits: larger data capacity, parallel processing, horizontal scale.
Limitations: cluster setup/monitoring is more complex; poor shard-key choices can cause hotspots and scatter-gather queries.
