// var https = require("https");
// var http = require("http");
// var fs = require("fs");
// var WebSocketServer = require("websocket").server;
// var { handleMsg, send } = require("./utils.js");

// redo as type: module now
import https from "https";
import http from "http";
import fs from "fs";
import WebSocketServer from "websocket";
import { handleMsg, send } from "./utils.js";


global.config = {};
global.keys = {};
global.messages = {};
loadConfig();


if (config.useHTTPS) var options = { cert: fs.readFileSync(config.HTTPS.cert), key: fs.readFileSync(config.HTTPS.key) }
var httpServer = (config.useHTTPS) ? https.createServer(options) : http.createServer();
var server = new WebSocketServer({httpServer: httpServer});

server.on("request", (req) => {
  var connection = req.accept(null, req.origin);
  connection.data = {}; // initialize the data object
  connection.send("WS echo server");
  connection.on("message", (msg) => {
    msg.connection = connection;
    try {
      msg.data = JSON.parse(msg.utf8Data);
    } catch {
      return send(connection, "err", "Failed to parse JSON.");
    }
    handleMsg(msg);
  });
});


httpServer.listen(config.port);
console.log(`WebSocket server successfully started on port ${config.port}!`)





function loadConfig() {
  console.log("Loading config from './config.json'...")
  config = JSON.parse(fs.readFileSync("config.json"));
  
  console.log(`Config loaded, loading keys from ${config.keys}...`);
  keys = JSON.parse(fs.readFileSync(config.keys));

  console.log(`Keys loaded, loading messages data from ${config.messages}...`);
  messages = JSON.parse(fs.readFileSync(config.messages));


  console.log(`Application loaded! Reloading again in ${config.reloadInterval} seconds...\n`);
  
  setTimeout(() => {
    console.clear();
    console.log("Reloading config...");
    loadConfig();
  }, config.reloadInterval * 1000);
}