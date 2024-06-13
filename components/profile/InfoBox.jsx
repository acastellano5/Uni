import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Item = () => {
  return (
    <View style={styles.itemStyles} >
      <View className="bg-lightGreen rounded-lg py-3">
        <Text className="text-center">Soccer</Text>
      </View>
    </View>
  );
};

const InfoBox = ({ title }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-medium mb-1">{title}</Text>
      <View className="flex-row flex-wrap">
        <Item />
        <Item />
        <Item />
      </View>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  itemStyles: {
    width: "33%",
    padding: 3,
  },
});
