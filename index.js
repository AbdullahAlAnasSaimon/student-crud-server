const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Server is running successfully")
})

app.listen(port, () => {
  console.log("server running on port", port);
})