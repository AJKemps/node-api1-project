const express = require("express");
const shortid = require("shortid");
const port = 8000;
const server = express();

server.listen(port, () => console.log("server running..."));
server.use(express.json());

let user = {
  id: shortid.generate(), // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane", // String, required
};

let users = [user];

server.post("/api/users", (req, res) => {
  newUser = {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: req.body.name, // String, required
    bio: req.body.bio, // String, required
  };

  if (req.body.name === null || req.body.bio === null) {
    return res
      .status(400)
      .json("'errorMessage': 'Please provide name and bio for the user.'");
  } else {
    users.push(newUser);
    return res.status(201).json(users);
  }
});
