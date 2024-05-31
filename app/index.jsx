import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6 } from "@expo/vector-icons";
// import logo  from "../assets/images/logo.png"
import logo from "../assets/images/logo.png";
import google from "../assets/icons/google.webp"
import CustomButton from "../components/CustomButton";

const Onboarding = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-primary text-4xl font-bold">Uni</Text>
      </View>

      <View className="bg-white mt-5 h-full rounded-t-3xl pt-5">
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

        <View className="mt-5 items-center">
          <CustomButton
            containerStyles="bg-secondary"
            textStyles="text-white"
            title="Log In"
          />

          <CustomButton 
            containerStyles="bg-tertiary mt-5" 
            title="Sign Up" 
          />

          <CustomButton 
            image={google}
            imageStyles="h-[25] w-[25] mr-2"
            containerStyles="bg-tertiary mt-5" 
            title="Log In with Google" 
          />
        </View>
      </View>

      <StatusBar backgroundColor="#000" style="light"/>
    </SafeAreaView>
  );
};

export default Onboarding;
