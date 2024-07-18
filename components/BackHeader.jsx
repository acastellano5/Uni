import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const BackHeader = ({ containerStyles, title, onBackPress }) => {
  return (
    <View
      className={`flex-row justify-between items-center ${containerStyles}`}
    >
      {/* back button */}
      <TouchableOpacity
        className="bg-tertiary w-8 py-1 flex items-center rounded"
        activeOpacity={0.8}
        onPress={() => {
          if (onBackPress) {
            onBackPress()
          } else {
            router.dismiss()
          }
        }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <Text
        className="text-2xl text-white font-semibold mx-auto text-center right-3 w-3/6"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  );
};

export default BackHeader;
