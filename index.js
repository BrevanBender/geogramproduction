const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const Post = require("./models/post");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const app = express();

//Connection middleware for express
const cors = require("cors");
//Morgan is a logger
const morgan = require("morgan");

app.use(cors());
//Shorter than default, also including response time.
app.use(morgan("short"));

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

require("./db-utils/connect");

const postController = require("./controllers/postController");

app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/", postController);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("app running: " + port);
});