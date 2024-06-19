import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import CustomButton from "../../CustomButton"

const UpdateEmail = ({ setScreen }) => {
  return (
    <View className="pt-8 w-11/12 mx-auto">
      <View className="flex-row justify-start">
        {/* button to go back to main settings */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => setScreen("main")}>
          <Ionicons name="arrow-back" size={30} color="#545454" />
        </TouchableOpacity>
      </View>

      {/* update email address title */}
      <Text className="text-xl font-semibold text-center mb-5">
        Update Email Address
      </Text>

      {/* update Email Address Fields */}
      <View className="mb-5">
        <FormField title="Current Email Address" isEditable={false} value="johndoe54@gmail.com" otherStyles="mb-5"/>

        <FormField title="New Email Address" isEditable={true}/>
      </View>



      {/* update button */}
      <CustomButton title="Update" containerStyles="bg-primary py-3" textStyles="text-white font-medium"/>
    </View>
  );
};

export default UpdateEmail;

const styles = StyleSheet.create({});
