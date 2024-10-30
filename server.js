const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const users = require("./routes/api/users");
const projects = require("./routes/api/projects");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongourl = require("./config/config").mongoURI;
mongoose
  .connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", users);
app.use("/api/projects", projects);

const port = require("./config/config").port;
app.listen(port, () => console.log(`Server running on port ${port}`));
