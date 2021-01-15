const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const {
  validateActionId,
  validateAction,
  validateProjectId
} = require("../middleware");

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

router.post("/", validateAction, validateProjectId, async (req, res) => {
  try {
    const newAction = await req.action;
    Actions.insert(newAction, newAction.project_id);
    res.status(200).json(newAction);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to post action" });
  }
});

module.exports = router;
