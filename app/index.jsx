import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6 } from "@expo/vector-icons";
import logo from "../assets/images/logo.png";
import google from "../assets/icons/google.webp"
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { loginWithGoogle, getClubs } from "../lib/firebase";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context/globalProvider";
const Onboarding = () => {
/*if (1==1) {
  router.push("/(tabs)/home");
}*/
const {loading, isLogged, isVerified} = useGlobalContext();
/*console.log("Loading: ",loading);
console.log("Logged In: ",isLogged);
console.log("Verified: ",isVerified);/*

/*Writing this for testing vars

console.log(loading);
console.log(isVerified);
console.log(isLogged);*/

if (!loading && isLogged && isVerified){
  router.replace("/(tabs)/home");

} else {

}

  return (
    
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-primary text-4xl font-bold">Uni</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        {/* Heading */}
        <>
          <Image
            source={logo}
            resizeMode="contain"
            className="h-[40] w-[40] ml-7"
          />
        </>

        <View className="mt-10 mb-5 flex-row justify-center">
          <FontAwesome6 name="school" size={175} color="black" />
        </View>

        <Text className="text-4xl text-center font-semibold">
          Let's connect{"\n"}together
        </Text>



        {/* Buttons */}
        <View className="mt-5 items-center">
          <CustomButton
            containerStyles="bg-secondary w-9/12 min-h-[50px]"
            textStyles="text-white"
            title="Log In"
            handlePress={() => router.push("/(auth)/log-in")}
          />

          <CustomButton 
            containerStyles="bg-tertiary mt-5 w-9/12 min-h-[50px]" 
            title="Sign Up" 
            handlePress={() => router.push("/(auth)/register")}

          />

          <CustomButton 
            image={google}
            imageStyles="h-[25] w-[25] mr-2"
            containerStyles="bg-tertiary mt-5 w-9/12 min-h-[50px]" 
            title="Log In with Google" 
            handlePress={() => {loginWithGoogle().then(() => router.push("/(tabs)/home"))}}

          />
        </View>
      </View>

      <StatusBar style="light"/>
    </SafeAreaView>
  );
};

export default Onboarding;