import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CustomButton from "../../CustomButton"
import { router } from "expo-router";
const AddParent = ({ setScreen })=>{
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
        Add Parent Email
      </Text>

      {/* change password Fields */}
      <View className="mb-5">
        <FormField title="Parent Email Address" isEditable={true}  />
      </View>



      {/* change password button */}
      <CustomButton title="Add" containerStyles="bg-primary py-3" textStyles="text-white font-medium" />
    </View>
  );
};

export default AddParent;

const styles = StyleSheet.create({});
