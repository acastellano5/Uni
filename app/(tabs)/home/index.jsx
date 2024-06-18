import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Post from "../../../components/post/Post";
import { Feather } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/globalProvider";
import TabsDisplay from "../../../components/TabsDisplay";


const tabs = ["Following", "School"];

export default function Home() {
  // auth stuff
  const { loading, isLogged, isVerified } = useGlobalContext();
  console.log("Loading: ", loading);
  console.log("Logged In: ", isLogged);
  console.log("Verified: ", isVerified);
  if (!loading && isLogged && isVerified) {
  } else {
    router.replace("//index");
  }


  // tab functionality

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Following":
        return <Text>following</Text>;

      case "School":
        return <Text>school</Text>;

      default:
        return null;
    }
  };


  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <Header title="Home" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
      <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        <ScrollView showsVerticalScrollIndicator={false} className="mt-3">


          <Post containerStyles="w-10/12 mx-auto mb-10" />
          <Post containerStyles="w-10/12 mx-auto mb-10" />
          <Post containerStyles="w-10/12 mx-auto mb-10" />
          <Post containerStyles="w-10/12 mx-auto mb-10" />
        </ScrollView>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.9} onPress={() => router.push('/post/create')} className="shadow-lg">
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>



        {displayTabContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
