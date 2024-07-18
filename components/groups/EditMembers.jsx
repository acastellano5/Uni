import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAttributes } from "../../lib/useFirebase";
import ManageMemberCard from "./ManageMemberCard";

const editMembers = ({ group }) => {
  const [loading, setLoading] = useState(true);

  // make requests to fetch members from database
  const [fetchedMembers, setFetchedMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const fetchedUsers = await Promise.all(
        group.members.map((uid) => getUserAttributes(uid))
      );
      setFetchedMembers(fetchedUsers.filter((user) => user !== null));
      setLoading(false);
    };

    fetchMembers();
  }, [group]);

  // make requests to fetch moderators from database
  const [fetchedModerators, setFetchedModerators] = useState([]);
  useEffect(() => {
    const fetchModerators = async () => {
      setLoading(true);
      const fetchedUsers = await Promise.all(
        group.moderators.map((uid) => getUserAttributes(uid))
      );
      setFetchedModerators(fetchedUsers.filter((user) => user !== null));
      setLoading(false);
    };

    fetchModerators();
  }, [group]);

  return (
    <>
      <TouchableOpacity
        className="bg-primary self-start rounded"
        activeOpacity={0.8}
      >
        <Text className="text-white py-1 px-2">Add Users</Text>
      </TouchableOpacity>

      <View className="flex-row flex-wrap bg-white p-2 rounded mt-3">
        {fetchedModerators.map((moderator, index) => (
          <ManageMemberCard person={moderator} key={index}/>
        ))}

        {fetchedMembers.map((member, index) => (
          <ManageMemberCard person={member} key={index}/>
        ))}
      </View>



    </>
  );
};

export default editMembers;

const styles = StyleSheet.create({});
