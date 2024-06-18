import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import background from "../../../assets/images/soccerbg.png";
  import TabsDisplay from "../../../components/TabsDisplay";
  import EventInfo from "../../../components/events/EventInfo";
  import BackHeader from "../../../components/BackHeader";
  import Attending from "../../../components/events/Attending"
  
  const tabs = ["Info", "Attending"];
  
  const eventsShow = () => {
  
    // setting tabs state
    const [activeTab, setActiveTab] = useState(tabs[0]);
  
    const displayTabContent = () => {
      switch (activeTab) {
        case "Info":
          return <EventInfo />;
  
        case "Attending":
          return <Attending />;
  
        default:
          return null;
      }
    };
    return (
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        {/* club background image */}
        <ImageBackground className="w-full h-[40vh] pb-5" source={background}>
          <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
            {/* back button and ai btn */}
            <BackHeader />
  
            {/* group name and attend button */}
            <View className="flex-row justify-between items-center">
              <View className="bg-tertiary py-2 px-4 rounded">
                <Text className="text-white text-lg font-semibold">
                  Soccer
                </Text>
              </View>

              <TouchableOpacity
              className="bg-primary py-2 px-4 rounded"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">Attending</Text>
            </TouchableOpacity>
            </View>
          </SafeAreaView>
  
          <View style={styles.overlay} />
        </ImageBackground>
  
        {/* club info */}
        <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-11 bottom-10">
          {/* info and member tabs */}
  
          {/* <View className="flex flex-row w-10/12 bg-white mx-auto rounded-lg p-2">
            <CustomButton title="Info" containerStyles="bg-black" textStyles="text-base text-white font-semibold w-3/6 text-center"/>
            <CustomButton title="Members" containerStyles="bg-white" textStyles="text-base text-tertiary font-semibold w-3/6 text-center"/>
          </View> */}
  
          <TabsDisplay
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            containerStyles="py-3"
            textStyles="text-lg"
            tabBarStyles="mb-6"
          />
  
          {displayTabContent()}
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  });
  
  export default eventsShow;
  