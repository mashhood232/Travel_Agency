const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig");
const cors = require('cors')
const path = require("path");
const port = process.env.PORT || 5000;

const tourRoutes= require("./routes/tour")
const usersRoute = require("./routes/auth");
// const reviewsRoute = require("./routes/reviewsRoute");


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'Photos')));

app.get('/', (req, res) => {
  res.send('Server is Up!');
});

app.use("/api", usersRoute);
app.use('/api/tour', tourRoutes);
// app.use("/api/reviews", reviewsRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
