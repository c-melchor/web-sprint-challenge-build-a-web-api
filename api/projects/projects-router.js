const express = require("express");
const Projects = require("../projects/projects-model");
const router = express.Router();

const { validateProjectId } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const getProjects = await Projects.get();
    res.status(200).json(getProjects);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to retrive projects" });
  }
});

module.exports = router;
