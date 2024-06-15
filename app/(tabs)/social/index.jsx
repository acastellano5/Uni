import { Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import CustomButton from "../../../components/CustomButton";
import TabButton from "../../../components/TabButton";
import Filter from "../../../components/social/Filter"
import ProfileCard from "../../../components/social/ProfileCard";


export default function Home() {
  const [activeTab, setActiveTab] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <Header />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* search bar */}
          <SearchBar
            placeholder="Search"
            filterOnPress={() => setIsFilterVisible(true)}
            isFilterDisabled={!activeTab}
          />

          <View className="w-10/12 mx-auto flex-row justify-center items-center mt-5">
            {/* search categories */}
            <TabButton
              name="Students"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary"
              textStyles=""
              onHandleSearchType={() => setActiveTab("Students")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
            <TabButton
              name="Alumni"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary ml-2"
              textStyles=""
              onHandleSearchType={() => setActiveTab("Alumni")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
            <TabButton
              name="Faculty/Staff"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary ml-2"
              textStyles=""
              onHandleSearchType={() => setActiveTab("Faculty/Staff")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
          </View>




          <Filter
            visible={isFilterVisible}
            onRequestClose={() => setIsFilterVisible(false)}
            animationType="slide"
            presentationStyle="formSheet"
            category={activeTab}
          />



          <View className="mt-5 w-11/12 mx-auto flex-row flex-wrap">
            <ProfileCard/>

            <ProfileCard/>

            <ProfileCard/>

            <ProfileCard/>
            <ProfileCard/>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
