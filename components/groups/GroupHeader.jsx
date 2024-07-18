import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import logo from "../../assets/images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const GroupHeader = ({ containerStyles, title, isModerator, setGroupContent }) => {
  return (
    <View
      className={`flex-row justify-between items-center ${containerStyles}`}
    >
      {/* back button */}
      <TouchableOpacity
        className="bg-tertiary w-8 py-1 flex items-center rounded"
        activeOpacity={0.8}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-2xl text-white font-semibold">{title}</Text>

        {isModerator ? (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setGroupContent("manage group")}
            className="bg-tertiary w-8 py-1 flex items-center rounded"
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        ) : null}
    </View>
  );
};

export default GroupHeader;
