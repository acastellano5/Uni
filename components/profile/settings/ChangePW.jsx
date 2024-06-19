import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import CustomButton from "../../CustomButton"

const ChangePassword = ({ setScreen }) => {
  return (
    <View className="pt-8 w-11/12 mx-auto">
      <View className="flex-row justify-start">
        {/* button to go back to main settings */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen("main")}>
          <Ionicons name="arrow-back" size={30} color="#545454" />
        </TouchableOpacity>
      </View>

      {/* change password title */}
      <Text className="text-xl font-semibold text-center mb-5">
        Change Password
      </Text>

      {/* change password Fields */}
      <View className="mb-5">
        <FormField title="Current Password" isEditable={true} otherStyles="mb-5"/>

        <FormField title="New Password" isEditable={true}/>
      </View>



      {/* change password button */}
      <CustomButton title="Change Password" containerStyles="bg-primary py-3" textStyles="text-white font-medium"/>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
