const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server is running successfully")
})


// mongodb connection
const uri = `mongodb+srv://${process.env.STUDENT_DB}:${process.env.STUDENT_DB_PASS}@cluster0.rencz4l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    console.log("Connected DB Successfully");

    // connecting to database collection
    const studentsCollection = client.db("simple_student_crud").collection("students");

    const student = {
      name: 'saimon',
      age: '22',
      class: 'diploma',
      roll: 941486,
      reg: 858617
    }

    app.post('/student', async (req, res) => {
      const result = await studentsCollection.insertOne(student);
      res.send(result);
    })

    app.get('/students', async(req, res) =>{
      const query = {};
      const result = await studentsCollection.find(query).toArray();
      res.send(result);
    })

    app.put('/student/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: ObjectId(id)};
      const updateDoc = {
        $set: {
          reg: 1111
        }
      }
      const result = await studentsCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

  }
  finally{

  }
}

run().catch(err => console.dir(err));


app.listen(port, () => {
  console.log("server running on port", port);
})