const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server is running successfully")
})

// mongodb connection
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);


app.listen(port, () => {
  console.log("server running on port", port);
})