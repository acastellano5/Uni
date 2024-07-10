# WebSocket Chat Backend

This project is a WebSocket chat backend written in Node.js. Please note that this code is intended for demonstration purposes only. It has been hastily written and may contain security vulnerabilities and inefficiencies.

## Usage

To use this WebSocket chat backend, follow the steps below:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `npm test`.

# How-to

To use the app, you need to connect to it via the port configured in `config.json`. The app works through stringified JSON payloads. The following are the available methods:

## Methods

### addMsg

The `addMsg` method allows you to add a new message to the chat. The `username` and `key` values are required for authentication. The `type` indicates the method to be called. The members array contains the usernames of the chat members, including the sender's. The `msg` value contains the message to be sent.

```JSON
{
  "username": "test",
  "key": "key1",
  "type": "addMsg",
  "members": [ "test", "test2" ],
  "msg": "Hello, world!"
}
```

If a chat does not exist, it will be created, and a message with the following structure will be sent to all online members of the chat:
  
```JSON
{
  "type":"msg",
  "data": {
    "sender":"test",
    "data":"Hello World",
    "chatName":"test-test2"
  }
}
```

### getChat

The `getChat` method retrieves the chat history. This is particularly useful for when a user re-opens the chat window and needs to retrieve the chat history and see what was missed.

```JSON
{
  "username": "test",
  "key": "key1",
  "type": "getChat",
  "members": [ "test", "test2" ]
}
```

The chat in question is identified by its members; In this example, the system will retrieve the `test-test2` chat.

This will return an array of messages in the following format:

```JSON
{
  "type":"chat",
  "data": [
    { "sender":"test", "data":"Hello World", "chatName":"test-test2" },
    { "sender":"test2", "data":"Hi everyone!", "chatName":"test-test2" }
  ]
}
```

### getChats

The `getChats` method retrieves all of the chat names that the user is involved in. This should be used when the chat window starts up, then the frontend can get the data for each of the chats.

```json
{
  "username": "test",
  "key": "key1",
  "type": "getChats"
}
```

The response is structured as follows:

```json
{
  "type":"chats",
  "data": [ "test-test2", "test-test3" ]
}
```


## Types of responses

The server can respond with several message types:

### info

These can be disregarded, but are helpful for confirming things like message deliveries and such.

### err

These are important, as it tells the user that something went wrong. They typically contain details in the `data` field.

### msg

These signify a single message sent to the user.

### chat

These messages contain an array of messages, typically representing a chat's history.

### chats

These contain an array of chat names that the user is involved in.



---

Please note that due to the nature of this project, it is recommended to use it for demonstration purposes only and not in production environments.


