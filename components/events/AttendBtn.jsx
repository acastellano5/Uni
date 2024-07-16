import React, { useCallback } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { attendEvent, unAttendEvent } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const AttendBtn = ({ attendingStatus, onAttendingStatusChange, eventId }) => {
  const { orgId } = useGlobalContext();

  const handleAttendToggle = useCallback(async () => {
    if (attendingStatus) {
      Alert.alert(
        "Leave Event",
        "Are you sure you want to leave this event?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              await unAttendEvent(orgId, eventId);
              onAttendingStatusChange(false);
            },
          },
        ]
      );
    } else {
      await attendEvent(orgId, eventId);
      onAttendingStatusChange(true);
    }
  }, [attendingStatus, orgId, eventId, onAttendingStatusChange]);

  return (
    <TouchableOpacity
      className="bg-primary py-2 px-4 rounded"
      activeOpacity={0.8}
      onPress={handleAttendToggle}
    >
      <Text className="text-white text-lg font-semibold">
        {attendingStatus ? "Attending" : "Attend"}
      </Text>
    </TouchableOpacity>
  );
};

export default AttendBtn;
