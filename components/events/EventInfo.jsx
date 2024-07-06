import { View, Text, StyleSheet } from "react-native";
import React from "react";
import EventIcon from "../../components/events/EventIcon";

const EventInfo = ({ event }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      {/* event title */}
      <Text className="text-lg font-semibold mb-2 text-primary">
        {event.name}
      </Text>

      {/* event date and time */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-darkGray text-sm">
          {formatDate(event.startTime)} - {formatDate(event.endTime)}
        </Text>
      </View>

      {/* event location */}
      <Text className="text-darkGray text-base mb-2">Location: {event.location}</Text>

      {/* event info */}
      <>
        <Text className="text-darkGray text-base mb-2">Description:</Text>
        <View className="bg-lightGreen mb-3">
          <Text className="text-[#5e5e5e] p-2 rounded-lg">
            {event.description}
          </Text>
        </View>
      </>
    </View>
  );
};

export default EventInfo;
