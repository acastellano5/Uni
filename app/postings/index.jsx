import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import TabsDisplay from "../../components/TabsDisplay";
import JobsFeed from "../../components/postings/JobsFeed";
import CompaniesFeed from "../../components/postings/CompaniesFeed";

const Index = () => {
  const tabs = ["Jobs", "Companies"];
  const [activeTab, setActiveTab] = useState(tabs[0]); // Active tab state

  const displayContent = () => {
    switch (activeTab) {
      case "Jobs":
        return <JobsFeed />;

      case "Companies":
        return <CompaniesFeed />;
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {/* tabs for switching between feeds */}
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12 mb-5"
        />

        {displayContent()}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
