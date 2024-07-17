import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import React, { useState, useEffect } from "react";
import GroupToggle from "./GroupToggle";
import {
  getUpcomingGroupEvents,
  getPastGroupEvents,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import GroupEventIcon from "./GroupEventIcon";

const GroupEvents = ({ group }) => {
  const { orgId } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Previous");
  const [loading, setLoading] = useState(true);
  const [groupEvents, setGroupEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      let events = [];
      if (activeTab === "Previous") {
        events = await getPastGroupEvents(group.id, orgId);
      } else if (activeTab === "Upcoming") {
        events = await getUpcomingGroupEvents(group.id, orgId);
      }

      setGroupEvents(events);
      setLoading(false);
    };

    fetchEvents();
  }, [activeTab]);

  return (
    <View className="w-11/12 mx-auto">
      <GroupToggle activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : (
        <View className="flex-row flex-wrap mt-3">
          {groupEvents.map((event, index) => (
            <GroupEventIcon key={index} event={event} groupName={group.name}/>
          ))}
        </View>
      )}
    </View>
  );
};

export default GroupEvents;

const styles = StyleSheet.create({});
