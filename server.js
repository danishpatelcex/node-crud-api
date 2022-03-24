const express = require("express");
const bodyParser = require("body-parser");
let cors = require('cors');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://reactapp:Qf66vE7AL7h5v2Bn@cluster0.mcot8.mongodb.net/news?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 8080;

require("./app/routes/app.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});