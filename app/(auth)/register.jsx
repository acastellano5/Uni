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
import db from '@react-native-firebase/database';
import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId: '571895727465-ip6t1dtiqdmabqnlrp9brb2tc1uujg83.apps.googleusercontent.com',
});
const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const registerAndGoToMainFlow = async () => {
    
    console.log(form.email);
    console.log(form.password);
    if (form.email && form.password) {
        try {
          console.log("die");
            const response = await auth().createUserWithEmailAndPassword(form.email,form.password)
            console.log("HEYYOO");

           
                router.push("/(tabs)/home")
                console.log("HEYYOO");
              
              
              
        } catch (error) {
            Alert.alert("Bro LACKIN,",error)
        }
    }
  }
  // if (1==1) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-primary text-2xl font-bold">Log In</Text>
      </View>



      {/* Heading */}
      <View className="bg-white mt-5 h-full rounded-t-3xl pt-5">
        <View className="items-center">
          <Image
            source={logo}
            resizeMode="contain"
            className="h-[100px] w-[100]"
          />
          <Text className="text-primary text-5xl font-bold mt-5">Uni</Text>
          <Text className="text-tertiary text-lg">Log in to continue</Text>
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
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3 w-5/6"
            labelStyles="text-m"
          />
        </View>


        <View className="w-5/6 mx-auto mt-3 items-end">
          <Text className="font-bold text-yellow-500">Forgot Password?</Text>
        </View>




        {/* Form buttons */}
        <View className="mt-9 items-center">
          <CustomButton
            title="Log In"
            containerStyles="bg-secondary w-5/6"
            textStyles="text-white font-bold"
            handlePress={() => {
              console.log("Gay.");
            registerAndGoToMainFlow();
            }}
            />

          <Text className="text-tertiary my-4">OR</Text>

          <CustomButton 
            image={google}
            imageStyles="h-[25] w-[25] mr-2"
            containerStyles="bg-tertiary w-5/6" 
            title="Log In with Google" 
            handlePress={() => {onGoogleButtonPress().then(() => router.push("/(tabs)/home"))}}
          />

          <Text className="mt-9 text-base">Don't have an account?{' '}

            <Text className="text-yellow-500 font-bold">Sign up</Text>
          </Text>
        </View>
        
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Register;
