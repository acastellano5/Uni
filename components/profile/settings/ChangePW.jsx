import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CustomButton from "../../CustomButton"
const changePW= (oldPword, newPassword)=>{
  const user = auth().currentUser
  const cred = auth.EmailAuthProvider.credential(user.email, oldPword)
  user.reauthenticateWithCredential(cred).then( ()=>{
    user.updatePassword(newPassword)
    router.back('//home')


  }).catch(function(error) {
    console.log("error");
    Alert.alert("Error","Check Your Parameters")
  })
}
const ChangePassword = ({ setScreen }) => {
  const [form, setForm] = useState({
    email: "",
    emailTwo: "",
  });
  console.log(auth().currentUser);
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
        <FormField title="Current Password" isEditable={true} otherStyles="mb-5" handleChangeText={(e) => setForm({ ...form, email: e })}        />

        <FormField title="New Password" isEditable={true} handleChangeText={(e) => setForm({ ...form, emailTwo: e })}        />
      </View>



      {/* change password button */}
      <CustomButton title="Change Password" containerStyles="bg-primary py-3" textStyles="text-white font-medium" handlePress={()=>changePW(form.email, form.emailTwo)}/>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
