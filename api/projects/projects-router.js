const express = require("express");
const Projects = require("../projects/projects-model");
const router = express.Router();

const { validateProjectId } = require("../middleware");

router.get("/", (req, res, next) => {});
