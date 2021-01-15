const express = require("express");
const Actions = require("./actions-model");
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
  const { id } = req.params;
  try {
    const getActions = await Actions.get(id);
    res.status(200).json(getActions);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: `unable to retrieve action by id ${id}` });
  }
});

router.post("/", validateAction, validateProjectId, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    console.log(newAction);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to post new action" });
  }
});

module.exports = router;
