const path = require("path");
const express = require("express");
const cors = require("./middleware/cors");

const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const friendRequestRoutes = require('./routes/friendRequest');
const undo = require('./routes/undo');


mongoose
  .connect(
    "mongodb+srv://sambit:" +
      process.env.MOPNGO_ATLAS_PW +
      "@issuetracking-dfrtt.mongodb.net/todoDB?retryWrites=true"
  )
  .then(() => {
    console.log("connected to database!!!");
  })
  .catch(() => {
    console.log("some error occured!!");
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors.cors);

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friendRequest", friendRequestRoutes);
app.use("/api/undo", undo);


module.exports = app;
/* QNQZtJOwjrq7jv1x */
