# Practical 11 — MongoDB Primary–Secondary (Replica Set) replication

MongoDB uses replica sets. One member is primary and accepts writes; secondary members replicate the operation log. This is not a legacy standalone master/slave configuration.

## Local test setup outline
Use three separate data directories and ports on one machine for a lab (or three servers). Start each `mongod` with the same replica-set name, for example `rs0`, and unique ports/data paths. Example pattern (Linux shell; adjust paths and binary):
```bash
mongod --replSet rs0 --port 27017 --dbpath /data/rs0-1 --bind_ip localhost
mongod --replSet rs0 --port 27018 --dbpath /data/rs0-2 --bind_ip localhost
mongod --replSet rs0 --port 27019 --dbpath /data/rs0-3 --bind_ip localhost
```
Start each in a separate terminal. Connect to one member:
```javascript
rs.initiate({
  _id: "rs0",
  members: [
    {_id: 0, host: "localhost:27017"},
    {_id: 1, host: "localhost:27018"},
    {_id: 2, host: "localhost:27019"}
  ]
});
rs.status();
```
After initiation, connect using a replica-set-aware connection string or connect to the primary. Insert:
```javascript
use CollegeDB
db.ReplicationDemo.insertOne({Student_ID: 1, Name: "Aarav", Marks: 82})
rs.status()
```
Read from a secondary for demonstration (secondary reads may require setting read preference):
```javascript
db.getMongo().setReadPref("secondary")
db.ReplicationDemo.find()
```
Restore default read preference as needed. Confirm replication after allowing time for replication.

## Primary failure
If the primary becomes unavailable, the remaining voting members hold an election. A new primary can be elected if a majority of voting members is available. Writes pause during election; without a majority, the set cannot elect a primary. A single-node “replica set” does not provide meaningful fault tolerance.
