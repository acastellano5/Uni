import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  placeholder,
  containerStyles,
  filterOnPress,
  isFilterDisabled,
  handleChangeText,
  textValue,
  handleSubmitEditing,
  onClearSearch,
  needFilter,
  onValidateSearch,
  fieldStyles,
  iconColor,
  placeholderColor,
  placeholderStyles
}) => {
  const isDisabled = isFilterDisabled;
  return (
    <View
      className={`w-10/12 mx-auto flex-row justify-between items-center ${containerStyles}`}
    >
      {/* search field */}
      <View className={`flex-row px-4 py-3 bg-white rounded-md border border-tertiary shadow ${needFilter ? 'w-10/12' : 'w-full'} ${fieldStyles}`}>
        {/* search icon */}
        <TouchableOpacity
          className={`absolute left-2 ${placeholderStyles === "text-base" ? "top-4" : "top-3" }`}
          onPress={handleSubmitEditing}
          activeOpacity={0.8}
        >
          <FontAwesome name="search" size={17} color={`${iconColor ? iconColor: "#CDCDE0" }`} />
        </TouchableOpacity>

        {/* search text input */}
        <TextInput
          placeholder={placeholder}
          className={`mr-3 left-4 ${placeholderStyles}`}
          onChangeText={handleChangeText}
          value={textValue}
          placeholderTextColor={placeholderColor}
          onSubmitEditing={() => {
            if (textValue.trim() === "") {  
              Alert.alert("Validation Error", "Search field cannot be empty.");
              onValidateSearch()
              return;  
            }  
            handleSubmitEditing()
          }}
        />

        {/* clear search field button */}
        {textValue ? (
          <TouchableOpacity
            className={`absolute right-2 ${placeholderStyles === "text-base" ? "top-3" : "top-2" }`}
            activeOpacity={0.8}
            onPress={onClearSearch}
          >
            <Ionicons name="close-circle-outline" size={24} color="#CDCDE0" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* filter button */}
      {needFilter ? (
        <TouchableOpacity
          className={`bg-white p-3 rounded-md border border-tertiary shadow ${
            isDisabled ? "opacity-50" : "opacity-100"
          }`}
          onPress={filterOnPress}
          disabled={isDisabled}
          activeOpacity={0.8}
        >
          <Ionicons name="filter" size={19} color="#CDCDE0" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
