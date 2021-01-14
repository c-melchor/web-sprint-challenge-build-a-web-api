const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const { validateActionId } = require("../middleware");

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to retrieve actions" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: `unable to retrieve action by id ${id}` });
    });
});

module.exports = router;
