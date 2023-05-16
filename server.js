const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { expressjwt: jwt } = require("express-jwt")
const path = require("path")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/beer-recipe-finder",
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/auth", require("./routes/authRouter.js"))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === 'UnauthorizedError'){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(9000, () => {
  console.log("Server is running on port 9000")
})