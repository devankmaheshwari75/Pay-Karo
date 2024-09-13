const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const { db } = require("./db");
db();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hey there ");
});

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
