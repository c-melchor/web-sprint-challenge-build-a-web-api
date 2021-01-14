const express = require("express");
const actionsRouter = require("../api/actions/actions-router");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use("/api/actions", actionsRouter);

module.exports = server;
