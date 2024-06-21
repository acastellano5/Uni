import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const ChatName = ({ name, profileName }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-center" onPress={() => router.push(`/profiles/${profileName}`)}>
      <FontAwesome name="user-circle" size={30} color="black" />
      <Text className="text-2xl font-semibold text-center ml-3">{name}</Text>
    </TouchableOpacity>
  )
}

export default ChatName;