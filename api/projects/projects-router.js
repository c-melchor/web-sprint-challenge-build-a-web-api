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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProjectById = await Projects.get(id);
    if (!getProjectById) {
      res
        .status(404)
        .json({ errorMessage: `Unable to find a project with id ${id}` });
    } else {
      res.status(200).json(getProjectById);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to retrive project" });
  }
});

module.exports = router;
