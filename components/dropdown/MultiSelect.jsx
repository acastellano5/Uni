import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { interestsData } from "../../assets/data/filter"

const MultiSelectComponent = ({filterCategory, data, focusedColor}) => {
  const [selected, setSelected] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: {focusedColor} }]} className="mb-1 text-base">{filterCategory}</Text>
    );

    return null;
  };

  return (
    <View style={styles.container}>
    {renderLabel()}
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: {focusedColor} }]}
        placeholderStyle={[styles.placeholderStyle, isFocus && { color: {focusedColor} }]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={`Filter by ${filterCategory}`}
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#7B7B8B"
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#22c55e"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderColor: "#22c55e"
  },
  label: {
    zIndex: 999,
  }
});
