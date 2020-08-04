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

  try {
    if (req.body.name === undefined || req.body.bio === undefined) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      users.push(newUser);
      return res.status(201).json(users);
    }
  } catch {
    return res.statusMessage(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    return res.status(201).json(users);
  } catch {
    return res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  let userID = req.params.id;

  console.log(userID);

  let reqUser = users.find((user) => user.id === userID);

  console.log(reqUser);

  try {
    reqUser
      ? res.status(201).send(reqUser)
      : res
          .status(404)
          .send({ message: "The user with the specified ID does not exist." });
  } catch {
    return res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});
