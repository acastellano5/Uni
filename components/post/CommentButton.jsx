import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const CommentButton = () => {
  return (
    <View className="flex-row items-center ml-10">
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <FontAwesome name="commenting-o" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-base ml-2">234</Text>
    </View>
  );
};

export default CommentButton;

const styles = StyleSheet.create({});
