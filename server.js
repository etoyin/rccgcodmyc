require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
const userRouter = require("./app/routes/user.router");
//const transcriptRouter = require("./app/routes/transcript.router");

app.use(cors());

app.use(bodyParser.json());


app.use("/", userRouter);
//app.use("/api/transcript", transcriptRouter)


const PORT = process.env.PORT || process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());