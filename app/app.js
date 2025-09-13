let express = require("express");
let path = require("path");
let fs = require("fs");
let { MongoClient } = require("mongodb");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongo connection URLs
const mongoUrlLocal = "mongodb://admin:password@localhost:27017/admin";
const mongoUrlDocker = "mongodb://admin:password@mongodb:27017/admin";

// Use environment variable if set, otherwise pick local vs docker
const mongoUrl =
  process.env.MONGO_URL ||
  (process.env.DOCKER ? mongoUrlDocker : mongoUrlLocal);

// Mongo options
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Database & collection
const databaseName = "user-account";
const collectionName = "users";

// serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// serve a test image
app.get("/profile-picture", (req, res) => {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

// insert a record
app.post("/api/add", async (req, res) => {
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
app.get("/api/all", async (req, res) => {
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

// start server
app.listen(3000, () => {
  console.log("App listening on port 3000!");
  console.log("MongoDB URL:", mongoUrl);
});
