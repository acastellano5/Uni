import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const CommentButton = ({ setIsModalVisible }) => {
  return (
    <View className="flex-row items-center ml-5">
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <FontAwesome name="commenting-o" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CommentButton;

const styles = StyleSheet.create({});
