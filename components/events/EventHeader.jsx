import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";
import { deleteUserEvent, deleteGroupEvent } from "../../lib/useFirebase";

const EventHeader = ({ event, moderatorStatus }) => {
  const { user, orgId } = useGlobalContext();

  const handleEventDelete = async () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            if (event.authorType === "user") {
              deleteUserEvent(event.eventId, orgId);
            } else if (event.authorType === "group") {
              deleteGroupEvent(event.authorId, event.eventId, orgId);
            }
          } catch (error) {
            console.log("Error deleting event: ", error);
          } finally {
            router.dismiss();
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-row items-center justify-between">
      {/* back button */}
      <TouchableOpacity
        className="bg-tertiary w-8 py-1 flex items-center rounded"
        activeOpacity={0.8}
        onPress={() => router.dismiss()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      {/* delete event button */}
      {event.authorId === user.uid || moderatorStatus ? (
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-tertiary p-1 px-2 rounded-lg"
          onPress={handleEventDelete}
        >
          <FontAwesome name="trash-o" size={24} color="red" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default EventHeader;

const styles = StyleSheet.create({});
