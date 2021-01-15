const express = require("express");
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");
const router = express.Router();
const {
  validateActionId,
  validateAction,
  validateProjectId
} = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const getActions = await Actions.get();
    res.status(200).json(getActions);
  } catch (error) {
    res.status(500).json({ errorMessage: "unable to retrieve actions" });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  const id = req.params.id;
  try {
    const validAction = await Actions.get(id);

    res.status(200).json(validAction);
  } catch (error) {
    res.status(500).json({ errorMessage: "not a valid id" });
  }
});

router.post("/", validateAction, validateProjectId, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to post new action" });
  }
});

router.delete("/:id", validateActionId, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAction = await Actions.remove(id);
    if (deletedAction) {
      res.status(200).json(deletedAction);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to delete action" });
  }
});

router.put("/:id", validateAction, validateActionId, async (req, res) => {
  try {
    const id = req.params.id;
    const newAction = req.action;
    const editedAction = await Actions.update(id, newAction);
    res.status(200).json(editedAction);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to remove action" });
  }
});

module.exports = router;
