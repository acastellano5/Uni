import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../FormField";
import CustomButton from "../../CustomButton"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { delUser } from "../../../lib/firebase";
import { Redirect } from "expo-router";
import { router } from "expo-router"; 
const delAccount= (email, password)=>{
  const user = auth().currentUser
  const cred = auth.EmailAuthProvider.credential(email, password)
  user.reauthenticateWithCredential(cred).then( ()=>{
    delUser()
    router.back('//index')


  }).catch(function(error) {
    console.log("error");
    Alert.alert("Error","Check Your Parameters")
  })
}
const DeleteAccount = ({ setScreen }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
      <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"

            isEditable={true}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            isEditable={true}
          />
      </View>



      {/* delete account button */}
      <CustomButton title="Delete" containerStyles="bg-red-500 py-3" textStyles="text-white font-medium" handlePress={()=>{delAccount(form.email.toLowerCase(),form.password)}}/>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
