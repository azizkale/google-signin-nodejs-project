const express = require("express");
const app = express();
const morgan = require("morgan");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  return ticket;
}

app.use(morgan("combined"));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const { data } = req.query;
  console.log(data);
  const result = JSON.parse(data);
  res.render("../index",result);
});

app.post("/login", async (req, res) => {
  const { credential } = req.body;
  const payload = await verify(credential);
  if(!payload) res.redirect('/login');
  console.log(payload.payload);
  res.redirect(`/?data=${JSON.stringify(payload.payload)}`);
});

app.get("/login", (req, res) => {
  console.log(req.body);
  res.render("../login");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
