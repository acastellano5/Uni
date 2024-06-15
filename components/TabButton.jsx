import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const TabButton = ({ name, activeTab, onHandleSearchType, containerStyles, textStyles, activeBackground, background, activeText, text }) => {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab, activeBackground, background)}
      onPress={onHandleSearchType}
      className={containerStyles}
    >
      <Text
        style={styles.btnText(name, activeTab, activeText, text)}
        className={textStyles}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  btn: (name, activeTab, activeColor, unactiveColor) => ({
    backgroundColor: name === activeTab ? activeColor : unactiveColor,
  }),
  btnText: (name, activeTab, activeColor, unactiveColor) => ({
    color: name === activeTab ? activeColor : unactiveColor,
  }),
});
