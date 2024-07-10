function handleMsg(msg) {
  // check if user has authenticated, if not authenticate them and return
  try {
    if (!authenticate(msg)) return send(msg.connection, "err", "Authentication failed.");

    // handle message type
    switch (msg.data.type) {
      case "getMessages":
        return getMessages(msg);
      case "addMessage":
        return addMessage(msg);
      default:
        return send(msg.connection, "err", "Invalid message type.");
    }
  } catch {
    return send(msg.connection, "err", "Something went wrong.");
  }
}





function addMessage(msg) {
  try {
    // check if chat exists, if not, create it
    var chatname = msg.data.members.join("-");
    //// should probably check if the users exist
    if (!messages[chatname]) messages[chatname] = [];
    messages[chatname].push({sender: msg.data.author, message: msg.data.message});
  } catch {
    return send(msg.connection, "err", "Failed to add message.");
  }
}

function getMessages(msg) {

}


function authenticate(msg) {
  try {
    if (keys.includes(msg.data.key)) return true;
  } catch {} // returns false anyway
  return false;
}

function send(connection, type, data) {
  try {
    connection.send(JSON.stringify({type, data}));
  } catch {} // not much that can be done here
}

module.exports = { handleMsg, send };