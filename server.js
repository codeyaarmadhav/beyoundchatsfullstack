const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import article routes
const articleRoutes = require("./routes/articleRoutes");

//Use the routes
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
