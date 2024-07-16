import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { attendEvent, unAttendEvent } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const AttendBtn = ({ attendingStatus, setAttendingStatus, eventId }) => {

    const { orgId } = useGlobalContext()

  return (
    <TouchableOpacity
      className="bg-primary py-2 px-4 rounded"
      activeOpacity={0.8}
      onPress={() => {
        if (attendingStatus) {
          Alert.alert(
            "Leave Event",
            "Are you sure you want to leave this event?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async () => {
                  unAttendEvent(orgId, eventId);
                  setAttendingStatus(false);
                },
              },
            ]
          );
        } else {
          attendEvent(orgId, eventId);
          setAttendingStatus(true);
        }
      }}
    >
      <Text className="text-white text-lg font-semibold">
        {attendingStatus ? "Attending" : "Attend"}
      </Text>
    </TouchableOpacity>
  );
};

export default AttendBtn;

const styles = StyleSheet.create({});
