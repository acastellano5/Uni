import { Text, View, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Post from "../../../components/post/Post"

export default function Home() {
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
