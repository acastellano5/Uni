import { StyleSheet, View, TouchableOpacity, TextInput, Text, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import { sendChatMessage } from "../../lib/useFirebase";

const ChatInput = ({ id }) => {
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      var sent = await sendChatMessage(id, input)
      if (!sent) return alert("Failed to send message");

      setInput("");
    } catch (err) {
      alert("Failed to send message");
    }
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Function to handle keyboard visibility change
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (

    <View style={styles.chatInputContainer}>
      <TextInput
        style={styles.chatInput}
        placeholder="Type a message..."
        value={input}
        multiline={true}
        onChangeText={value => setInput(value)}
        onSubmitEditing={sendMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText} className="text-primary">
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 45,
    borderTopWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    fontWeight: "bold",
  },
})