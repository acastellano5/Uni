import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAttributes } from "../../lib/useFirebase";
import ManageMemberCard from "./ManageMemberCard";
import AddUsers from "./AddUsers";
import { useGlobalContext } from "../../context/globalProvider";

const editMembers = ({ group, fetchGroup }) => {
  const isEffected = false;
  const [loading, setLoading] = useState(true);
  const { orgId } = useGlobalContext()
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
        <View className="flex-row flex-wrap bg-white pt-3 px-2 rounded mt-3">
        <ScrollView showsVerticalScrollIndicator={false}>
        {fetchedModerators.map((moderator, index) => (
          <ManageMemberCard
            person={moderator}
            groupId={group.id}
            orgId={orgId}
            reactor={isEffected}
            addUser={false}
            fetchGroup={fetchGroup}
            role="Moderator"
            key={index}
          />
        ))}

        {fetchedMembers.map((member, index) => (
          <ManageMemberCard
            person={member}
            groupId={group.id}
            orgId={orgId}
            role="Member"
            addUser={false}
            fetchGroup={fetchGroup}
            key={index}
          />
        ))}
        </ScrollView>
      </View>

      <AddUsers
        visible={isModalVisible}
        setIsVisible={setIsModalVisible}
        animationType="slide"
        presentationStyle="formSheet"
        fetchGroup={fetchGroup}
        groupId={group.id}
      />
    </>
  );
};

export default editMembers;

const styles = StyleSheet.create({});
