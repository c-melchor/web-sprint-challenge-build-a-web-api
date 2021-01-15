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

router.post("/", async (req, res) => {
  try {
    const newProject = await Projects.insert(req.body);
    if (!newProject.name || !newProject.description) {
      res.status(404).json({ errorMessage: "Missing a required field" });
    } else {
      res.status(201).json(newProject);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to post project" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProject = await Projects.remove(id);
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to delete project" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const editedProject = await Projects.update(id, req.body);
    res.status(200).json(editedProject);
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to edit project" });
  }
});

module.exports = router;
