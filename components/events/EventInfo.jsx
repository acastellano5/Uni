import { View, Text, StyleSheet } from "react-native";
import React from "react";
import EventIcon from "../../components/events/EventIcon";

const EventInfo = ({ event }) => {
  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      {/* event title */}
      <Text className="text-lg font-semibold mb-2 text-primary">
        {event.name}
      </Text>

      {/* event date and time */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-darkGray text-base">September 23, 2024</Text>
        <Text className="text-darkGray text-base">4:30 pm</Text>
      </View>

      {/* event location */}
      <Text className="text-darkGray text-base mb-2">Abessinio Stadium</Text>


        {/* event info */}


      <>
        <Text className="text-darkGray text-base mb-2">Description:</Text>
        <View className="bg-lightGreen mb-3">
          <Text className="text-[#5e5e5e] p-2 rounded-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever.
          </Text>
        </View>
      </>
    </View>
  );
};

export default EventInfo;
