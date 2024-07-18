import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../assets/images/soccerbg.png";
import TabsDisplay from "../../components/TabsDisplay";
import EventInfo from "../../components/events/EventInfo";
import Attending from "../../components/events/Attending";
import { router, useLocalSearchParams } from "expo-router";
import {
  getEventById,
  isAttended,
  isUserModerator,
  attendEvent,
  unAttendEvent,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import AttendBtn from "../../components/events/AttendBtn";
import EventHeader from "../../components/events/EventHeader";

const tabs = ["Info", "Attending"];

const EventsShow = () => {
  const { orgId, user } = useGlobalContext();
  const params = useLocalSearchParams();
  const { eventId, author } = params;

  const [event, setEvent] = useState(null);
  const [isAttending, setIsAttending] = useState(null);
  const [isModerator, setIsModerator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const fetchEventInfo = useCallback(async () => {
    const event = await getEventById(eventId, orgId);
    if (event) {
      const attendingEvent = await isAttended(eventId);
      const moderatorStatus =
        event.authorType === "group"
          ? await isUserModerator(event.authorId, orgId)
          : false;

      setEvent(event);
      setIsAttending(attendingEvent);
      setIsModerator(moderatorStatus);
      setLoading(false);
    } else {
      router.dismiss()
    }
  }, [eventId, orgId]);

  useEffect(() => {
    fetchEventInfo();
  }, [fetchEventInfo]);

  const handleAttendingStatusChange = useCallback(
    async (attending) => {
      if (attending) {
        await attendEvent(orgId, eventId);
      } else {
        await unAttendEvent(orgId, eventId);
      }
      fetchEventInfo();
    },
    [orgId, eventId, fetchEventInfo]
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <ImageBackground className="w-full h-[40vh] pb-5" source={background}>
        <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
          <EventHeader event={event} moderatorStatus={isModerator}/>
          <View className="flex-row justify-between items-center">
            <View
              className="bg-tertiary py-2 px-4 rounded"
              style={styles.authorContainer}
            >
              <Text
                style={styles.authorText}
                className="text-white text-lg font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {event.authorId === user.uid ? "My Event" : author}
              </Text>
            </View>

            <AttendBtn
              attendingStatus={isAttending}
              onAttendingStatusChange={handleAttendingStatusChange}
              eventId={event.eventId}
            />
          </View>
        </SafeAreaView>
        <View style={styles.overlay} />
      </ImageBackground>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-11 bottom-10">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-lg"
          tabBarStyles="mb-6 w-11/12"
        />
        {activeTab === "Info" ? (
          <EventInfo event={event} />
        ) : (
          <Attending attendees={event.attendees} />
        )}
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
  authorContainer: {
    maxWidth: "65%",
  },
});

export default EventsShow;
