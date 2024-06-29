import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({ title, data, onItemSelect, focusedColor, placeholder, containerStyles, isSearchable }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: focusedColor }]} className="text-base mb-1">
        {title}
      </Text>
    );
  };

  return (
    <View style={[styles.container]} className={containerStyles}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: focusedColor }]}
        placeholderStyle={[styles.placeholderStyle, isFocus && { color: focusedColor }]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        search={isSearchable}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onItemSelect ? onItemSelect(item) : null;
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // Your existing styles
  },
  dropdown: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    zIndex: 999,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#7B7B8B",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
