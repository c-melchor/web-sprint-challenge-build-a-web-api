const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to retrieve actions" });
    });
});

module.exports = router;
