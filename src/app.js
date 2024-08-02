const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const booksRoute = require("./routes/book/book.routes.js");

// middleware
const app = express();
app.use(express.json());

app.use("/api/v1/books", booksRoute);
app.use("/api/v1/test", booksRoute);



// routes
app.get("/", (req, res) => {
  res.send("Blog app home");
});
app.get("/health", (req, res) => {
  res.status(200).send({ health: "health is good" });
});

// connection url
let connectionUrl = process.env.MONGO_URI;
connectionUrl = connectionUrl.replace(
  "<username>",
  process.env.MONGO_USER_NAME
);

connectionUrl = connectionUrl.replace(
  "<password>",
  process.env.MONGO_USER_PASS
);

connectionUrl = `${connectionUrl}/${process.env.DB_name}?${process.env.QUERY_STRING}`;
console.log(connectionUrl);

const port = process.env.PORT || 5000;

// function main() {
//   mongoose
//     .connect(connectionUrl)
//     .then(() => {
//       console.log("database connected");
//       app.listen(port);
//     })
//     .catch(() => {
//       console.log("connection faild");
//     });
// }

// main();

async function main() {
  try {
    await mongoose.connect(connectionUrl);
    app.listen(port);
    console.log("database connected");
  } catch (error) {
    console.log("connection faild");
  }
}
main();
