import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import logo from "../../assets/images/logo.png";
import google from "../../assets/icons/google.webp";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import { resetPass } from "../../lib/firebase";
const forgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  // if (1==1) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-primary text-2xl font-bold">Reset Password</Text>
      </View>



      {/* Heading */}
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        <View className="items-center">
          <Image
            source={logo}
            resizeMode="contain"
            className="h-[100px] w-[100]"
          />
          <Text className="text-primary text-5xl font-bold mt-5">Uni</Text>
          <Text className="text-tertiary text-lg">Enter Email to continue</Text>
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

          
        </View>


        




        {/* Form buttons */}
        <View className="mt-9 items-center">
          <CustomButton
            title="Log In"
            containerStyles="bg-secondary w-5/6 min-h-[50px]"
            textStyles="text-white font-bold"
            handlePress={()=> resetPass(form.email)}
          />

         

          <Text className="mt-9 text-base">Wrong Place?{' '}

            <Text className="text-yellow-500 font-bold" onPress={() => router.push("../../../log-in")}>Back To Login</Text>
          </Text>
        </View>
        
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default forgotPassword;
