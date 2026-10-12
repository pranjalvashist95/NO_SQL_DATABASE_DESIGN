# Practical 15 — Database distribution models

## 1. Single server
```text
Client → One Database Server
```
- Distribution: all data and processing on one server.
- Failure: server outage can make the service unavailable unless backups/standby exist.
- Advantage: simplest to install and operate.
- Limitation: limited vertical capacity and single point of failure.
- Application: small college project or local development database.

## 2. Sharding
```text
Client → Router → Shard A | Shard B | Shard C
```
- Distribution: different partitions of the dataset are stored on different shards.
- Failure: availability depends on shard design; unreplicated shard loss can make its data unavailable.
- Advantage: horizontal capacity and throughput.
- Limitation: shard-key design and operations are more complex.
- Application: large catalogue or event dataset.

## 3. Primary–secondary replication
```text
Client writes → Primary
                 ├── replicates → Secondary 1
                 └── replicates → Secondary 2
```
- Distribution: copies of the same data are maintained on members.
- Failure: replica-set election can select a new primary if a voting majority is available.
- Advantage: redundancy and improved read availability.
- Limitation: replication does not itself increase total unique-data capacity; elections can interrupt writes.
- Application: operational database requiring high availability.

## 4. Peer-to-peer replication (Cassandra)
```text
Client → Node A ↔ Node B ↔ Node C
           replicas selected by partition key / replication strategy
```
- Distribution: partitions and replicas are spread across peer nodes; nodes can coordinate requests.
- Failure: replicas and consistency level determine whether requests can succeed during a node outage.
- Advantage: horizontal scale and no fixed master.
- Limitation: data modelling and consistency tuning require care.
- Application: high-write workloads and distributed telemetry.

## 5. Sharding + replication
```text
                → Shard A replica set (Primary + Secondaries)
Client → Router
                → Shard B replica set (Primary + Secondaries)
```
- Distribution: shards hold different partitions; each shard replicates its own data.
- Failure: replication can preserve availability for a shard when a member fails; a shard still needs an eligible healthy majority.
- Advantage: both horizontal scale and fault tolerance.
- Limitation: highest setup, monitoring, and recovery complexity.
- Application: large production systems with high data volume and availability requirements.

## Summary
Sharding spreads different data; replication keeps additional copies. They solve different problems and are often combined. A real design must also consider backups, monitoring, consistency, security, and recovery testing.
