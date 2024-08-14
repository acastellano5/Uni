import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getUserAttributes } from "../../lib/useFirebase";
import ManageMemberCard from "./ManageMemberCard";
import AddUsers from "./AddUsers";
import { useGlobalContext } from "../../context/globalProvider";

const editMembers = ({ group, fetchGroup }) => {
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingModerators, setLoadingModerators] = useState(true);
  const { orgId } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch members from the database
  const [fetchedMembers, setFetchedMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedUsers = await Promise.all(
        group.members.map((uid) => getUserAttributes(uid))
      );
      setFetchedMembers(fetchedUsers.filter((user) => user !== null));
      setLoadingMembers(false);
    };

    fetchMembers();
  }, [group]);

  // Fetch moderators from the database
  const [fetchedModerators, setFetchedModerators] = useState([]);
  useEffect(() => {
    const fetchModerators = async () => {
      const fetchedUsers = await Promise.all(
        group.moderators.map((uid) => getUserAttributes(uid))
      );
      setFetchedModerators(fetchedUsers.filter((user) => user !== null));
      setLoadingModerators(false);
    };

    fetchModerators();
  }, [group]);

  // Update the main loading state when both operations are done
  useEffect(() => {
    if (!loadingMembers && !loadingModerators) {
      setLoading(false);
    }
  }, [loadingMembers, loadingModerators]);

  return (
    <>
      <TouchableOpacity
        className="bg-primary self-start rounded"
        activeOpacity={0.8}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text className="text-white py-1 px-2">Add People</Text>
      </TouchableOpacity>
      <View className="flex-row flex-wrap bg-white pt-3 px-2 rounded mt-3">
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="small" color="#063970" />
          ) : (
            <>
              {fetchedModerators.map((moderator, index) => (
                <ManageMemberCard
                  person={moderator}
                  groupId={group.id}
                  orgId={orgId}
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
            </>
          )}
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
