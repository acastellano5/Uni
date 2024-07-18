import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Calendar from "../../../components/events/Calendar";
import Header from "../../../components/Header";
import TabsDisplay from "../../../components/TabsDisplay";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/globalProvider";
import { getCurrentUser } from "../../../lib/firebase";
import { getEventByUser, getCommunityEvents, getUserAttributes, getGroupById } from "../../../lib/useFirebase";

const tabs = ["My Events", "Community"];

const EventsPage = () => {
  const { orgId } = useGlobalContext();

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [events, setEvents] = useState(null);
  // const [ myEvents, setMyEvents ] = useState(null)
  // const [ communityEvents, setCommunityEvents ] = useState(null)
  const [eventsLoading, setEventsLoading] = useState(true);

  // fetch the current user id and set it to state
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.uid);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  const fetchEvents = async () => {
    setEventsLoading(true)
    let events = []

    if (activeTab === "My Events") {
      try {
        events = await getEventByUser(currentUserId, orgId)
        events = await formatEvents(events)
        setEvents(events)
      } catch (error) {
        console.log("Error fetching my events:", error)
      }
    } else {
      try {
        events = await getCommunityEvents(orgId)
        events = await formatEvents(events)
        setEvents(events)
      } catch (error) {
        console.log("Error fetching community events:", error)
      }
    }

    setEventsLoading(false)
  }

  useEffect(() => {
    if (currentUserId) {
      fetchEvents();
    }
  }, [currentUserId, activeTab]);



  const formatEvents = async (events) => {
    const formatted = {};
    const promises = events.map(async (event) => {
      const { startTime, endTime, name, eventId, authorType, authorId } = event;
      const date = new Date(startTime.seconds * 1000).toISOString().split("T")[0];
      let author = "";

      if (!formatted[date]) {
        formatted[date] = [];
      }

      if (authorType === "group") {
        const group = await getGroupById(authorId, orgId);
        author = group.name;
      } else if (authorType === "user") {
        const user = await getUserAttributes(authorId, orgId);
        author = user.fullName;
      }

      const startTimeFormatted = new Date(startTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTimeFormatted = new Date(endTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      formatted[date].push({
        name,
        eventId,
        authorId,
        author,
        time: `${startTimeFormatted} - ${endTimeFormatted}`,
      });
    });

    await Promise.all(promises);
    return formatted;
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
          containerStyles="py-2 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        {eventsLoading ? (
          <ActivityIndicator size="large" color="#22c55e" />
        ) : (
          <Calendar events={ events } currentUserId={currentUserId}/>
        )}
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={styles.createButton}
        activeOpacity={0.8}
        className="bg-white shadow-lg"
        onPress={() => {
          router.push("/event/create");
        }}
      >
        <Feather name="plus" size={24} color="#22c55e" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 18,
    overflow: "hidden", // Ensures the child components are not clipped
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventsPage;
