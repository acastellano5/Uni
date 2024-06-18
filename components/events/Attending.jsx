import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AttendeeCard from "./AttendeeCard";

const Attending = () => {
  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <Text className="text-lg font-semibold text-primary mb-1">Attendees</Text>
      <View>
        <AttendeeCard isFirst={true}/>
        <AttendeeCard isFirst={false}/>
        <AttendeeCard isFirst={false}/>
        <AttendeeCard isFirst={false}/>
      </View>
    </View>
  );
};

export default Attending;

const styles = StyleSheet.create({});
