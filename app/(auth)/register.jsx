import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import logo from "../../assets/images/logo.png";
import google from "../../assets/icons/google.webp";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import auth from '@react-native-firebase/auth';
import { Redirect, router } from "expo-router";
import { loginWithGoogle } from "../../lib/firebase";
import db from '@react-native-firebase/database';
import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import { signUpWithEmail } from "../../lib/firebase";

GoogleSignin.configure({
  webClientId: '571895727465-ip6t1dtiqdmabqnlrp9brb2tc1uujg83.apps.googleusercontent.com',
});

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignUpPress = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const stuff = await signUpWithEmail(form.email, form.password);
      console.log(stuff);
      if (stuff) {
        router.push("/(auth)/verifyEmail");
      }
    } catch (error) {
      console.log("Error signing up", error);
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-greenTheme text-2xl font-bold">Sign Up</Text>
      </View>

      {/* Heading */}
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        <View className="items-center">
          <Image
            source={logo}
            resizeMode="contain"
            className="h-[100px] w-[100]"
          />
          <Text className="text-greenTheme text-5xl font-bold mt-5">Centro</Text>
          <Text className="text-tertiary text-lg">Sign up for Centro</Text>
        </View>

        {/* Form Fields */}
        <View className="items-center">
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5 w-5/6"
            keyboardType="email-address"
            labelStyles="text-m"
            isEditable={true}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3 w-5/6"
            labelStyles="text-m"
            isEditable={true}
          />
        </View>

        {/* Form buttons */}
        <View className="mt-9 items-center">
          <CustomButton
            title="Sign Up"
            containerStyles="bg-secondary w-5/6 min-h-[50px]"
            textStyles="text-white font-bold"
            handlePress={handleSignUpPress}
          />

          <Text className="text-tertiary my-4">OR</Text>

          <CustomButton
            image={google}
            imageStyles="h-[25] w-[25] mr-2"
            containerStyles="bg-tertiary w-5/6 min-h-[50px]"
            title="Log In with Google"
            handlePress={() => {
              loginWithGoogle().then(() => router.push("//index"));
            }}
          />

          <Text className="mt-9 text-base">
            Already have an account?{" "}
            <Text
              className="text-yellow-500 font-bold"
              onPress={() => router.push("./log-in")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Register;
