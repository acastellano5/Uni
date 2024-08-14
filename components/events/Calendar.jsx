import { router } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Agenda } from "react-native-calendars";

const Calendar = ({ events, currentUserId, onRefresh, refreshing }) => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(timeToString(Date.now()));

  useEffect(() => {
    const initializeItems = () => {
      setItems(events);

      const today = timeToString(Date.now());
      const firstDateWithEvents = Object.keys(events).find(
        (date) => events[date]?.length > 0
      );
      setSelectedDate(firstDateWithEvents || today);
    };

    initializeItems();
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

  const renderItem = useCallback((item) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        className="bg-primary"
        onPress={() =>
          router.push({
            pathname: "/event",
            params: { eventId: item.eventId, author: item.author },
          })
        }
      >
        <Text className="text-white font-bold">{item.name}</Text>
        <Text className="text-white font-semibold">
          {currentUserId === item.authorId ? "My Event" : item.author}
        </Text>
        <Text style={styles.itemData} className="text-white">
          {item.time}
        </Text>
      </TouchableOpacity>
    </View>
  ), [currentUserId]);

  const renderEmptyDate = useCallback(() => (
    <View style={styles.emptyDate}></View>
  ), []);

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        showClosingKnob={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#063970"]} tintColor="#063970"/>
        }
        theme={{
          selectedDayBackgroundColor: "#063970",
          calendarBackground: "#F5F5F5",
          dotColor: "#063970",
          agendaDayTextColor: "#063970",
          todayTextColor: "#063970",
          agendaDayNumColor: "#063970",
          agendaTodayColor: "#063970",
          agendaKnobColor: "#C9C9C9",
        }}
      />
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
