import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Calendar from "../../../components/events/Calendar";
import Header from "../../../components/Header";
import TabsDisplay from "../../../components/TabsDisplay";

const tabs = ["Your Events", "School"];

const EventsPage = () => {
  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // change between content via tabs
  const displayTabContent = () => {
    switch (activeTab) {
      case "Your Events":
        return <Calendar />;

      case "School":
        return <Calendar />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} className="bg-secondary">
      {/* header */}
      <Header />

      <View style={styles.contentContainer} className="mt-5">
        {/* tabs */}
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-2"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />

        {displayTabContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 18,
    overflow: 'hidden', // Ensures the child components are not clipped
  },
});

export default EventsPage;
