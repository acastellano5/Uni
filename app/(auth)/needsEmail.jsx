import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import logo from "../../assets/images/logo.png";
import google from "../../assets/icons/google.webp";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import { sendResetEmail } from "../../lib/firebase";
const needsEmail = () => {
  const [form, setForm] = useState({
    email: "",
  });

  // if (1==1) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-primary text-2xl font-bold">Please Verify Email Address</Text>
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
          <Text className="text-tertiary text-lg">Verify Email to continue</Text>
        </View>



        {/* Form Fields */}
        


        




        {/* Form buttons */}
       
        
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default needsEmail;
