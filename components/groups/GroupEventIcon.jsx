import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import EventImg from "../../assets/images/pingpongbg.png";
import { format } from "date-fns";
import { router } from "expo-router";

const GroupEventIcon = ({ event, groupName }) => {
  

  return (
    <View className="w-1/3 p-1">
      <TouchableOpacity className="bg-white rounded" activeOpacity={0.8} onPress={() => {
        router.push({
            pathname: "/event",
            params: { eventId: event.eventId, author:  groupName}
        })
      }}>
        <Image
          source={EventImg}
          className="w-full h-[10vh] object-cover rounded-t mb-3"
        />
        <Text className="px-2">{format(event.startTime.seconds * 1000, "PP")}</Text>
        <Text className="px-2 mt-1 mb-2">{ event.name }</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupEventIcon;

const styles = StyleSheet.create({});
