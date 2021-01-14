const express = require("express");
const actionsRouter = require("../api/actions/actions-router");
const server = express();
const { logger } = require("./middleware");

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(logger);
server.use("/api/actions", actionsRouter);

module.exports = server;
