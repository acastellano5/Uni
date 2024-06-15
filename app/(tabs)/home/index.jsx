import { Text, View, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Post from "../../../components/home/Post"
import { useGlobalContext } from "../../../context/globalProvider";
export default function Home() {


  const {loading, isLogged, isVerified} = useGlobalContext();
  console.log("Loading: ",loading);
  console.log("Logged In: ",isLogged);
  console.log("Verified: ",isVerified);
  if (!loading && isLogged && isVerified){
  
  } else {
    router.replace("//index");

  
  }
  return (
    <SafeAreaView className="h-full bg-secondary">

      {/* Header */}
      <Header
        title="Home"
      />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Post containerStyles="w-10/12 mx-auto mb-10"/>

          <Post containerStyles="w-10/12 mx-auto mb-10"/>

          <Post containerStyles="w-10/12 mx-auto mb-10"/>
          <Post containerStyles="w-10/12 mx-auto mb-10"/>

        </ScrollView>
      </View>

    </SafeAreaView>
  );
}
