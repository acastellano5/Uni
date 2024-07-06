import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../../assets/images/soccerbg.png";
import TabsDisplay from "../../../components/TabsDisplay";
import EventInfo from "../../../components/events/EventInfo";
import BackHeader from "../../../components/BackHeader";
import Attending from "../../../components/events/Attending";
import { useLocalSearchParams } from "expo-router";
import { getEventById } from "../../../lib/useFirebase";
import { useGlobalContext } from "../../../context/globalProvider";

const tabs = ["Info", "Attending"];

const eventsShow = () => {

  // get orgId from global context
  const { orgId } = useGlobalContext();

  // retrieve params from request
  const params = useLocalSearchParams();
  const { eventId, author } = params;

  // fetch event by id
  const [ event, setEvent ] = useState({})

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEventById(eventId, orgId)
      setEvent(event)
      console.log(event)
    }

    fetchEvent()
  }, [])

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Info":
        return <EventInfo event={event}/>;

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
              <Text className="text-white text-lg font-semibold">{author}</Text>
            </View>

            <TouchableOpacity
              className="bg-primary py-2 px-4 rounded"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">
                Attending
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.overlay} />
      </ImageBackground>

      {/* club info */}
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-11 bottom-10">
        {/* info and member tabs */}

        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-lg"
          tabBarStyles="mb-6 w-11/12"
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
