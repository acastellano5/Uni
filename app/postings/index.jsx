import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import TabsDisplay from "../../components/TabsDisplay";
import JobsFeed from "../../components/postings/JobsFeed";
import CompaniesFeed from "../../components/postings/CompaniesFeed";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const Index = () => {
  const tabs = ["Jobs", "Companies"];
  const { tab } = useLocalSearchParams()
  const [activeTab, setActiveTab] = useState(tab || tabs[0]); // Active tab state

  const displayContent = () => {
    switch (activeTab) {
      case "Jobs":
        return <JobsFeed />;

      case "Companies":
        return <CompaniesFeed />;
    }
  };

  const handleAddPress = () => {
    if (activeTab === "Jobs") {
      router.push('/postings/createJob')
    } else {
      router.push('/postings/createCompany')
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" onBackPress={() => router.push('/home')}/>
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {/* tabs for switching between feeds */}
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12 mb-3"
        />

        {displayContent()}

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={handleAddPress}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#063970",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
