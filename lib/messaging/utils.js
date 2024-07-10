function handleMsg(msg) {
  // check if user has authenticated, if not authenticate them and return
  try {
    if (!authenticate(msg)) return send(msg.connection, "err", "Authentication failed.");

    // handle message type
    switch (msg.data.type) {
      case "getChat":
        return getChat(msg);
      case "getChats":
        return getChats(msg);
      case "addMsg":
        return addMsg(msg);
      default:
        return send(msg.connection, "err", "Invalid message type.");
    }
  } catch {
    return send(msg.connection, "err", "Something went wrong.");
  }
}


/*

================================================================
                      ~   PLEASE NOTE:   ~

PLEASE DO NOT use this code in production

it is extremely insecure and has literally no authentication

It's also super inefficient and doesn't scale well at all

There is no sort of username checking, no passwords in the
first place, and everything is stored very inefficiently in
JSON format.

Plus you can read / write to any chat, even if you don't
belong to it; You just need to know who the members are

================================================================

*/


function addMsg(msg) {
  try {
    if (!msg.data.members.includes(msg.data.username)) return send(msg.connection, "err", "You are not a member of this chat.");
    
    var chatName = getChatName(msg);
    var newMsg = { sender: msg.data.username, data: msg.data.msg }
    if (!messages[chatName]) messages[chatName] = [];
    messages[chatName].push(newMsg);

    // add this after, since it doesn't really need to be stored
    newMsg.chatName = chatName;
    for (var member of msg.data.members) {
      if (clients[member]) send(clients[member], "msg", newMsg);
    }
    send(msg.connection, "info", "Message added.");
  } catch {
    return send(msg.connection, "err", "Failed to add message.");
  }
}

function getChat(msg) {
  try {
    if (!msg.data.members.includes(msg.data.username)) return send(msg.connection, "err", "You are not a member of this chat.");
    var chatName = getChatName(msg);
    if (!messages[chatName]) return send(msg.connection, "err", "Chat does not exist.");
    send(msg.connection, "chat", messages[chatName]);
  } catch {
    return send(msg.connection, "err", "Failed to get chat.");
  }
}

function getChats(msg) {
  // get a list of all chatnames that the user is involved in
  try {
    var chats = Object.keys(messages).filter((chat) => chat.includes(msg.data.username));
    send(msg.connection, "chats", chats);
  } catch {
    return send(msg.connection, "err", "Failed to get chats.");
  }
}

function getChatName(msg) {
  // sort
  var members = msg.data.members.sort();
  return members.join("-");
}


function authenticate(msg) {
  if (msg.connection.authenticated) return true;
  try {
    if (keys.includes(msg.data.key) && !clients[msg.data.username]) {
      clients[msg.data.username] = msg.connection;
      msg.connection.authenticated = true;
      msg.connection.username = msg.data.username;
      return true;
    }
  } catch {} // returns false anyway
  return false;
}

function send(connection, type, data) {
  try {
    connection.send(JSON.stringify({type, data}));
  } catch {} // not much that can be done here
}

module.exports = { handleMsg, send };