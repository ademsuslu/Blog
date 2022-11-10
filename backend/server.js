const express = require("express");

const cors = require("cors");
const colors = require("colors");
const connectDb = require("./config/db.js");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // what is extended whta do this do
app.use("/api/blogs", require("./routes/blogRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));

app.use(errorHandler);
let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server runnng on ${PORT}`);
});
