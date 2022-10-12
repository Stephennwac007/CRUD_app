const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");
require("dotenv").config();
const app = express();

const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(Cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/Allmovies", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.status(200).send(result);
  });
});

app.post("/api/movies", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log("result: ", result);
  });
});

app.delete("/api/movies/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

// const SqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good mmovies');"
// db.query(SqlInsert, (err, result) => {
//   res.send("hello world");
// })

app.listen((PORT = process.env.PORT), () =>
  console.log("listening on port " + PORT)
);
