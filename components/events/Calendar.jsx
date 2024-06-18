import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

const Calendar = () => {
  const [items, setItems] = useState({
    "2024-06-18": [
      {
        name: "Football Practice",
        time: "3:00pm - 3:30pm",
      },
    ],
    "2024-06-20": [
      {
        name: "Hackathon",
        time: "8:00am - 4:00pm",
      },
      {
        name: "Prom",
        time: "7:00pm - 11:00pm",
      },
    ],
  });

  useEffect(() => {
    loadItems({ timestamp: new Date().getTime() });
  }, []);

  const loadItems = (day) => {
    const newItems = { ...items };

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }
    }
    setItems(newItems);
  };

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          className="bg-primary"
        >
          <Text style={styles.itemName} className="text-white font-semibold">
            {item.name}
          </Text>
          <Text style={styles.itemData} className="text-white font-semibold">
            {item.time}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return <View style={styles.emptyDate}></View>;
  };

  return (
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
