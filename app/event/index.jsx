import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../assets/images/soccerbg.png";
import TabsDisplay from "../../components/TabsDisplay";
import EventInfo from "../../components/events/EventInfo";
import BackHeader from "../../components/BackHeader";
import Attending from "../../components/events/Attending";
import { router, useLocalSearchParams } from "expo-router";
import { getEventById, isAttended, isUserModerator } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import AttendBtn from "../../components/events/AttendBtn";
import EventHeader from "../../components/events/EventHeader";

const tabs = ["Info", "Attending"];

const eventsShow = () => {
  // get orgId from global context
  const { orgId } = useGlobalContext();

  // retrieve params from request
  const params = useLocalSearchParams();
  const { eventId, author } = params;

  // fetch event by id
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true); // loader state
  const [isAttending, setIsAttending] = useState(null);
  const [ isModerator, setIsModerator ] = useState(false)

  useEffect(() => {
    const fetchEventInfo = async () => {
      // fetch event
      const event = await getEventById(eventId, orgId);
      setEvent(event);

      // fetch is attending status
      const attendingEvent = await isAttended(eventId);
      setIsAttending(attendingEvent);


      // fetch if user is moderator
      if (event.authorType === "group") {
        const moderatorStatus = await isUserModerator(event.authorId, orgId)
        setIsModerator(moderatorStatus)
      }

      setLoading(false); // set loading to false after data is fetched
    };
    fetchEventInfo();
  }, []);

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Info":
        return <EventInfo event={event} />;

      case "Attending":
        return <Attending attendees={event.attendees} />;

      default:
        return null;
    }
  };

  if (loading) {
    // display loader while fetching data
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      {/* club background image */}
      <ImageBackground className="w-full h-[40vh] pb-5" source={background}>
        <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
          {/* header */}
          <EventHeader event={event} moderatorStatus={isModerator}/>

          {/* group name and attend button */}
          <View className="flex-row justify-between items-center">
            <View
              className="bg-tertiary py-2 px-4 rounded"
              style={styles.authorContainer}
            >
              <Text
                style={styles.authorText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {author}
              </Text>
            </View>

            <AttendBtn
              attendingStatus={isAttending}
              setAttendingStatus={setIsAttending}
              eventId={event.eventId}
            />
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authorText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    maxWidth: 175, // set your desired max width here
  },

  authorContainer: {
    maxWidth: "70%",
  },
});

export default eventsShow;
