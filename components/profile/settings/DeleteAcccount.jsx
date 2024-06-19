import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import CustomButton from "../../CustomButton"

const DeleteAccount = ({ setScreen }) => {
  return (
    <View className="pt-8 w-11/12 mx-auto">
      <View className="flex-row justify-start">
        {/* button to go back to main settings */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen("main")}>
          <Ionicons name="arrow-back" size={30} color="#545454" />
        </TouchableOpacity>
      </View>

      {/* delete account title */}
      <Text className="text-xl font-semibold text-center mb-5">
        Delete Account
      </Text>

      {/* email and password Fields */}
      <View className="mb-5">
        <FormField title="Email Address" isEditable={true} otherStyles="mb-5"/>

        <FormField title="Password" isEditable={true}/>
      </View>



      {/* delete account button */}
      <CustomButton title="Delete" containerStyles="bg-red-500 py-3" textStyles="text-white font-medium"/>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
