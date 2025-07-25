import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import logo from "../../assets/images/logo.png";
import google from "../../assets/icons/google.webp";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router, Redirect } from "expo-router";
import { loginWithEmail, loginWithGoogle } from "../../lib/firebase";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function verifyEmail(email) {
    router.push("/(auth)/needsEmail");
  }

  const handleLoginPress = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const stuff = await loginWithEmail(form.email, form.password);

      console.log(stuff, "is the Result");
      if (stuff === "nV") {
        router.push("/(auth)/verifyEmail");
      } else {
        if (stuff === "Setup") {
          router.push("./accountSetUp/");
        } else {
          if (stuff === "NoOrgs") {
            router.push("./accountSetUp/schoolsIndex");
          } else {
            router.push("../(tabs)/home");
          }
        }
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-greenTheme text-2xl font-bold">Log In</Text>
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

        <View className="w-5/6 mx-auto mt-3 items-end">
          <Text
            className="font-bold text-yellow-500"
            onPress={() => router.push("./forgotPassword")}
          >
            Forgot Password?
          </Text>
        </View>

        {/* Form buttons */}
        <View className="mt-9 items-center">
          <CustomButton
            title="Log In"
            containerStyles="bg-secondary w-5/6 min-h-[50px]"
            textStyles="text-white font-bold"
            handlePress={handleLoginPress}
          />

          <Text className="text-tertiary my-4">OR</Text>

          <CustomButton
            image={google}
            imageStyles="h-[25] w-[25] mr-2"
            containerStyles="bg-tertiary w-5/6 min-h-[50px]"
            title="Log In with Google"
            handlePress={() =>
              loginWithGoogle().then(() => router.push("/(tabs)/home"))
            }
          />

          <Text className="mt-9 text-base">
            Don't have an account?{" "}
            <Text
              className="text-yellow-500 font-bold"
              onPress={() => router.push("./register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default LogIn;
