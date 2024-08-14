import { StyleSheet, View, ActivityIndicator, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import GroupToggle from "./GroupToggle";
import {
  getUpcomingGroupEvents,
  getPastGroupEvents,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import GroupEventIcon from "./GroupEventIcon";

const GroupEvents = ({ group, onRefresh, refreshing }) => {
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
  }, [activeTab, group]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="h-full" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={["#063970"]}
        tintColor="#063970"
      />
    }>
      <View className="w-11/12 mx-auto">
      <GroupToggle activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <ActivityIndicator size="large" color="#063970" />
      ) : (
        <View className="flex-row flex-wrap mt-3">
          {groupEvents.length > 0 ? (
            groupEvents.map((event, index) => (
              <GroupEventIcon
                key={index}
                event={event}
                groupName={group.name}
              />
            ))
          ) : (
            <Text className="w-fit mx-auto mt-3 text-base text-darkGray">No events</Text>
          )}
        </View>
      )}
    </View>
    </ScrollView>
  );
};

export default GroupEvents;

const styles = StyleSheet.create({});
