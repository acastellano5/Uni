import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Item = ({ name }) => {
  return (
    <View style={styles.itemStyles}>
      <View className="bg-lightGreen rounded-lg py-3">
        <Text className="text-center">{name}</Text>
      </View>
    </View>
  );
};

const InfoBox = ({ title, info }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-medium mb-1">{title}</Text>
      <View className="flex-row flex-wrap">
        {info && info.length > 0 ? (
          info.map((item, index) => <Item key={index} name={item} />)
        ) : (
          <View style={styles.noInfoContainer}>
            <Text style={styles.noInfoText}>No information available</Text>
          </View>
        )}
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
  noInfoContainer: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noInfoText: {
    fontSize: 16,
    color: "#888",
  },
});
