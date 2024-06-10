import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import ClubSection from "../../components/ClubSection";

export default function Clubs() {
  return (
    <SafeAreaView className="h-full bg-black">
      {/* Header */}
      <Header title="Clubs" textStyles="right-2" />

      <View className="bg-white mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search bar */}
          <SearchBar />

          {/* clubs */}
          <View className="w-10/12 mx-auto mt-5">
            <ClubSection category="Technology" />

            <ClubSection category="Arts" />

            <ClubSection category="Athletic" />

            <ClubSection category="Academic" />

            <ClubSection category="Service" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
