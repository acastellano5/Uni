import { View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
// yeah we gotta use axios so fetch doesn't be mean to me
import axios from 'axios';

const ChatInput = ({ addMessage, addr, model, apiKey }) => {
  
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    console.log(addr, model, apiKey)
    if (!input.trim()) return;
    addMessage("right", input);
    setInput("");
    try {
      const { data } = await axios.post("http://10.0.0.189:8080/api/get_answer", {
        question: input,
        model: "salesianum",
        key: "key1"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
      addMessage("left", data);
    } catch (err) {
      addMessage("left", "Error fetching response.");
      console.error(err);
    }
  };
  return (
    // View with the same height as the input below it, preventing messages from being hidden
    <View className="h-16">
      <View className="absolute bottom-0 w-full" behavior="position" >
        <View className="flex-row items-center justify-between bg-darkWhite p-3">
          <TextInput
            placeholder="Type a message..."
            value={input}
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