import { Text, View, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Post from "../../components/Post"

export default function Home() {
  return (
    <SafeAreaView className="h-full bg-black">

      {/* Header */}
      <Header
        title="Home"
        textStyles="right-2"
      />

      <View className="bg-white mt-5 h-full rounded-t-3xl pt-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Post/>

          <Post/>

          <Post/>
          <Post/>

        </ScrollView>
      </View>

    </SafeAreaView>
  );
}
