import { View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";

const ChatInput = () => {
  const [messages, setMessages] = useState([
    { type: "left", value: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "right", value: input }]);
    setInput("");
    try {
      const res = await fetch("http://localhost:8080/api/get_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "question": input,
          "model": "salesianum",
          "key": "key1"
        })
      });
      const data = await res.json();
      setMessages([...messages, { type: "left", value: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages([...messages, { type: 'right', text: input }, { type: 'left', text: 'Error fetching AI response.' }]);
    }
    console.log(messages);
  };
  return (
    // View with the same height as the input below it, preventing messages from being hidden
    <View className="h-16">
      { console.log(setInput) }
      <View className="absolute bottom-0 w-full" behavior="position" >
        <View className="flex-row items-center justify-between bg-darkWhite p-3">
          <TextInput
            placeholder="Type a message..."
            className="flex-1 w-10/12 bg-gray-200 rounded-full p-2 br-10 mr-3"
            onChangeText={value => setInput(value)}
          />
          <TouchableOpacity onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChatInput;