var https = require("https");
var http = require("http");
var fs = require("fs");
var WebSocketServer = require("websocket").server;
var { handleMsg, send } = require("./utils.js");
const { connect } = require("http2");


global.config = {};
global.keys = {};
global.messages = {};
global.clients = {};
loadConfig();


if (config.useHTTPS) var options = { cert: fs.readFileSync(config.HTTPS.cert), key: fs.readFileSync(config.HTTPS.key) }
var httpServer = (config.useHTTPS) ? https.createServer(options) : http.createServer();
var server = new WebSocketServer({httpServer: httpServer});



server.on("request", (req) => {
  var connection = req.accept(null, req.origin);
  send(connection, "info", "Connected to server.");

  connection.on("message", (msg) => {
    msg.connection = connection;
    try {
      msg.data = JSON.parse(msg.utf8Data);
    } catch {
      return send(connection, "err", "Failed to parse JSON.");
    }
    handleMsg(msg);
  });
  connection.on("close", () => {
    delete clients[connection.username];
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
    save();
    loadConfig();
  }, config.reloadInterval * 1000);
}

function save() {
  fs.writeFileSync(config.messages, JSON.stringify(messages));
  fs.writeFileSync(config.keys, JSON.stringify(keys));
  console.log("Data saved!");
}