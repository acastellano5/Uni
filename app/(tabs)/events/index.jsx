import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Calendar from "../../../components/events/Calendar";
import Header from "../../../components/Header";
import TabsDisplay from "../../../components/TabsDisplay";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/globalProvider";
import { getCurrentUser } from "../../../lib/firebase";
import { getEventByUser } from "../../../lib/useFirebase";
import { useFocusEffect } from "expo-router";

const tabs = ["Your Events", "Community"];

const EventsPage = () => {
  const { orgId } = useGlobalContext();

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [events, setEvents] = useState(null);

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
    if (currentUserId && activeTab === "Your Events") {
      try {
        const userEvents = await getEventByUser(currentUserId, orgId);
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    } else if (currentUserId && activeTab === "Community") {
      console.log("render community events here");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents()
    }, [currentUserId, activeTab])
  );



  // change between content via tabs
  const displayTabContent = () => {
    switch (activeTab) {
      case "Your Events":
        return <Calendar events={events} />;

      case "Community":
        return <Calendar events={events} />;

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
        {events ? (
          displayTabContent()
        ) : (
          <ActivityIndicator size="large" color="#22c55e" />
        )}
      </View>

      {/* Create Button */}
      {activeTab === "Your Events" ? (
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
      ) : null}
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
