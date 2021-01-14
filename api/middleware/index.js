const Actions = require("../actions/actions-model");

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

module.exports = { logger, validateActionId };
