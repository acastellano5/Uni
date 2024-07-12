import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const LikeButton = () => {
  return (
    <View className="flex-row items-center">
      <FontAwesome name="heart-o" size={24} color="black" />
      <Text className="text-base ml-2">234</Text>
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({});
