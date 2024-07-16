import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAttributes } from "../../lib/useFirebase";

import AttendeeCard from "./AttendeeCard";

const Attending = ({ attendees }) => {
  const [attending, setAttending] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await Promise.all(
        attendees.map((uid) => getUserAttributes(uid))
      );
      setAttending(fetchedAttendees);
      setLoading(false); // Set loading to false after fetching
    };

    fetchAttendees();
  }, [attendees]);

  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <Text className="text-lg font-semibold text-primary mb-1">Attendees</Text>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#22c55e" /> // Show loader while loading
        ) : (
          attendees.length > 0 ? (
            attending.map((attendee, index) => (
              <AttendeeCard key={index} isFirst={index === 0} attendee={attendee}/>
            ))
          ) : (
            <Text className="text-center my-3 text-base text-darkGray">No attendees yet</Text>
          )
        )}
      </View>
    </View>
  );
};

export default Attending;

const styles = StyleSheet.create({});
