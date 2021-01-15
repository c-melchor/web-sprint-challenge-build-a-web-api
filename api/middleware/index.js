const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`New ${req.method} request to ${req.url} at ${time}`);
  next();
}

async function validateActionId(req, res, next) {
  const { id } = req.params;
  const validId = await Actions.get(id);
  if (validId) {
    next();
  } else {
    res.status(404).json({ errorMessage: `ID ${id} does not exist!` });
  }
}

async function validateAction(req, res, next) {
  try {
    const action = await req.body;
    if (action && action.notes && action.description) {
      req.action = action;
      next();
    } else if (!action.notes) {
      res.status(404).json({ errorMessage: "Please provide notes" });
    } else if (!action.description) {
      res.status(404).json({ errorMessage: "Please provide a description" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Unable to post action" });
  }
}

async function validateProjectId(res, req, next) {
  const projId = await req.req.body.project_id;
  const validProjId = await Projects.get(projId);
  try {
    if (!validProjId) {
      res.res
        .status(404)
        .json({ errorMessage: `Project with id ${projId} does not exist` });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(404)
      .json({ errorMessage: `Project with id ${validProjId} does not exist` });
  }
}

module.exports = {
  logger,
  validateActionId,
  validateAction,
  validateProjectId
};
