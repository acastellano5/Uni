import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const MultiSelectComponent = ({title, placeholder, data, focusedColor, defaultSelected, onItemSelect, containerStyles}) => {
  const [selected, setSelected] = useState(defaultSelected || []);
  const [isFocus, setIsFocus] = useState(false);

  // useEffect(() => {
  //   if (defaultSelected) {
  //     const formattedSelected = defaultSelected.map(item => item.toLowerCase().replace(/ /g, '_'));
  //     setSelected(formattedSelected);
  //   }
  // }, [defaultSelected]);

  // useEffect(() => {
  //   console.log(selected)
  // }, [selected])

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: {focusedColor} }]} className="mb-1 text-base">{title}</Text>
    );

    return null;
  };

  return (
    <View style={styles.container} className={containerStyles}>
    {renderLabel()}
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: {focusedColor} }]}
        placeholderStyle={[styles.placeholderStyle, isFocus && { color: {focusedColor} }]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelected(item);
          onItemSelect ? onItemSelect(item) : null;
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
    color: "#063970"
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
    borderColor: "#063970"
  },
  label: {
    zIndex: 999,
  }
});
