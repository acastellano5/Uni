import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAttributes } from "../../lib/useFirebase";
import ManageMemberCard from "./ManageMemberCard";
import AddUsers from "./AddUsers";

const editMembers = ({ group }) => {
  const isEffected = false;
  const [loading, setLoading] = useState(true);
  const [ isModalVisible, setIsModalVisible ] = useState(false)

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
  }, [group, isEffected]);

  return (
    <>
      <TouchableOpacity
        className="bg-primary self-start rounded"
        activeOpacity={0.8}
        onPress={() => {
          setIsModalVisible(true)
        }}
      >
        <Text className="text-white py-1 px-2">Add People</Text>
      </TouchableOpacity>

      <View className="flex-row flex-wrap bg-white p-2 rounded mt-3">
        {fetchedModerators.map((moderator, index) => (
          <ManageMemberCard
            person={moderator}
            group={group.id}
            orgId={group}
            reactor={isEffected}
            addUser={false}
            role="Moderator"
            key={index}
          />
        ))}

        {fetchedMembers.map((member, index) => (
          <ManageMemberCard
            person={member}
            group={group}
            orgId={group}
            role="Member"
            addUser={false}
            key={index}
          />
        ))}
      </View>

      <AddUsers
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
      />
    </>
  );
};

export default editMembers;

const styles = StyleSheet.create({});
