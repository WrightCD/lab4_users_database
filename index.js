const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/lab4", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database!"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const serverPort = 3000;

app.listen(serverPort, () =>
  console.log(`Server has started on Port:${serverPort}`)
);
