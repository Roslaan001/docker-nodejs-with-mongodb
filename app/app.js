let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// URLs
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoUrlDockerCompose = "mongodb://admin:password@mongodb:27017";

// pick URL based on environment (inside Docker vs local)
// if HOSTNAME is set, assume we are in Docker
let mongoUrl = process.env.HOSTNAME ? mongoUrlDockerCompose : mongoUrlLocal;

// Mongo options
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// database & collection
let databaseName = "user-account";
let collectionName = "users";

// serve homepage
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// serve a test image
app.get("/profile-picture", function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

// insert a record
app.post("/api/add", async function (req, res) {
  let client;
  try {
    client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    let db = client.db(databaseName);
    let result = await db.collection(collectionName).insertOne({
      name: req.body.name,
      email: req.body.email,
    });
    res.json({ message: "User added successfully!", id: result.insertedId });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Database insert failed" });
  } finally {
    if (client) client.close();
  }
});

// fetch all records
app.get("/api/all", async function (req, res) {
  let client;
  try {
    client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    let db = client.db(databaseName);
    let users = await db.collection(collectionName).find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Database fetch failed" });
  } finally {
    if (client) client.close();
  }
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
