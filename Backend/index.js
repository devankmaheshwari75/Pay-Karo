const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { db } = require("./db");
db();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({  
  origin: '*'  
})); 

app.get("/", (req, res) => {
  res.send("hey there ");
});

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
