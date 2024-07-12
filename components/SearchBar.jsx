import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
}) => {
  const isDisabled = isFilterDisabled;
  return (
    <View
      className={`w-10/12 mx-auto flex-row justify-between items-center ${containerStyles}`}
    >
      {/* search field */}
      <View className={`flex-row px-4 py-3 bg-white rounded-md border border-tertiary shadow ${needFilter ? 'w-10/12' : 'w-full'}`}>
        {/* search icon */}
        <TouchableOpacity
          className="absolute left-2 top-3"
          onPress={handleSubmitEditing}
          activeOpacity={0.8}
        >
          <FontAwesome name="search" size={17} color="#CDCDE0" />
        </TouchableOpacity>

        {/* search text input */}
        <TextInput
          placeholder={placeholder}
          className="mr-3 left-4"
          onChangeText={handleChangeText}
          value={textValue}
          onSubmitEditing={handleSubmitEditing}
        />

        {/* clear search field button */}
        {textValue ? (
          <TouchableOpacity
            className="absolute right-2 top-2"
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
