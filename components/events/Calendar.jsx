import { router } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Agenda } from "react-native-calendars";
import { getEventByUser, getGroupById, getUserAttributes } from "../../lib/useFirebase";
import { getCurrentUser } from "../../lib/firebase";
import { useGlobalContext } from "../../context/globalProvider";

const Calendar = ({ events }) => {
  const { orgId } = useGlobalContext();
  const [currentUserId, setCurrentUserId] = useState("");
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(timeToString(Date.now()));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.uid);
        const formattedEvents = await formatEvents(events);
        setItems(formattedEvents);

        // Determine the first date with events if today has no events
        const today = timeToString(Date.now());
        if (!formattedEvents[today] || formattedEvents[today].length === 0) {
          const firstDateWithEvents = Object.keys(formattedEvents).find(date => formattedEvents[date].length > 0);
          setSelectedDate(firstDateWithEvents || today);
        } else {
          setSelectedDate(today);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [events]);

  const loadItems = useCallback((day) => {
    const newItems = { ...items };
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      newItems[strTime] = newItems[strTime] || [];
    }
    setItems(newItems);
  }, [items]);

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
        author,
        time: `${startTimeFormatted} - ${endTimeFormatted}`,
      });
    });

    await Promise.all(promises);
    return formatted;
  };

  const renderItem = useCallback((item) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        className="bg-primary"
        onPress={() => router.push({
          pathname: "/event",
          params: { eventId: item.eventId, author: item.author }
        })}
      >
        <Text className="text-white font-bold">{item.name}</Text>
        <Text className="text-white font-semibold">{item.author}</Text>
        <Text style={styles.itemData} className="text-white">
          {item.time}
        </Text>
      </TouchableOpacity>
    </View>
  ), []);

  const renderEmptyDate = useCallback(() => (
    <View style={styles.emptyDate}></View>
  ), []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : (
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={selectedDate}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={(r1, r2) => r1.name !== r2.name}
          showClosingKnob={true}
          theme={{
            selectedDayBackgroundColor: "#22c55e",
            calendarBackground: "#F5F5F5",
            dotColor: "#22c55e",
            agendaDayTextColor: "#22c55e",
            todayTextColor: "#22c55e",
            agendaDayNumColor: "#22c55e",
            agendaTodayColor: "#22c55e",
            agendaKnobColor: "#C9C9C9",
          }}
        />
      )}
    </View>
  );
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemData: {
    marginTop: 5,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Calendar;
