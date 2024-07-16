import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Agenda } from "react-native-calendars";
import { getEventByUser, getGroupById, getUserAttributes } from "../../lib/useFirebase";
import { getCurrentUser } from "../../lib/firebase";
import { useGlobalContext } from "../../context/globalProvider";

const Calendar = ({ events }) => {
  // get orgId from global context
  const { orgId } = useGlobalContext();

  const [currentUserId, setCurrentUserId] = useState("");
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

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

  // fetch and render events
  useEffect(() => {
    setLoading(true)
    const formatFetchedEvents = async () => {
      try {
          const formattedEvents = await formatEvents(events); // Format events to the required format
          setItems(formattedEvents); // Set the formatted events to state
        } catch (error) {
          console.error("Error formatting events:", error);
        } finally {
          setLoading(false)
        }
    };

    formatFetchedEvents();
  }, [events]);

  useEffect(() => {
    loadItems({ timestamp: new Date().getTime() });
  }, []);

  // Function to load items for the calendar
  const loadItems = (day) => {
    const newItems = { ...items };

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }
    }

    // Ensure all dates have an empty array if no events
    Object.keys(newItems).forEach((key) => {
      if (!newItems[key]) {
        newItems[key] = [];
      }
    });

    setItems(newItems);
  };

// Function to format the events retrieved from the API
const formatEvents = async (events) => {
  const formatted = {};
  for (const event of events) {
    const { startTime, endTime, name, eventId, authorType, authorId } = event;
    const date = new Date(startTime.seconds * 1000).toISOString().split("T")[0];
    let author = "";

    if (!formatted[date]) {
      formatted[date] = [];
    }

    if (authorType === "group") {
      const group = await getGroupById(authorId, orgId); // Use 'await' inside an async function
      author = group.name;
    } else if (authorType === "user") {
      const user = await getUserAttributes(authorId, orgId);
      author = user.fullName;
    }

    // Format start and end time without seconds
    const startTimeFormatted = new Date(startTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTimeFormatted = new Date(endTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    formatted[date].push({
      name,
      eventId,
      author,
      time: `${startTimeFormatted} - ${endTimeFormatted}`,
    });
  }
  return formatted;
};

  

  // Function to render each item in the agenda
  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          className="bg-primary"
          onPress={() => router.push({
            pathname: "./events/eventsShow",
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
    );
  };

  // Function to render an empty date in the agenda
  const renderEmptyDate = () => {
    return <View style={styles.emptyDate}></View>;
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" /> // Loading indicator
      ) : (
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={Date.now()}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={(r1, r2) => r1.name !== r2.name}
          showClosingKnob={true} // Ensures the knob is visible
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

// Function to convert time to string format for the agenda
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