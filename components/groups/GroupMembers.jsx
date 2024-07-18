import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import Member from "./Member";
import { getUserAttributes } from "../../lib/useFirebase";

const GroupMembers = ({ members, moderators, onRefresh, refreshing }) => {
  const [loading, setLoading] = useState(true);

  // make requests to fetch members from database
  const [fetchedMembers, setFetchedMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const fetchedUsers = await Promise.all(
        members.map((uid) => getUserAttributes(uid))
      );
      setFetchedMembers(fetchedUsers.filter((user) => user !== null));
      setLoading(false);
    };

    fetchMembers();
  }, [members]);

  // make requests to fetch moderators from database
  const [fetchedModerators, setFetchedModerators] = useState([]);
  useEffect(() => {
    const fetchModerators = async () => {
      setLoading(true);
      const fetchedUsers = await Promise.all(
        moderators.map((uid) => getUserAttributes(uid))
      );
      setFetchedModerators(fetchedUsers.filter((user) => user !== null));
      setLoading(false);
    };

    fetchModerators();
  }, [moderators]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="h-full" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={["#22c55e"]}
        tintColor="#22c55e"
      />
    }>
      <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
        {loading ? (
          <ActivityIndicator size="large" color="#22c55e" />
        ) : (
          <View className="flex-row flex-wrap">
            {fetchedModerators.map(
              (moderator, index) => (
                  <Member
                    key={index}
                    role="Moderator"
                    name={`${moderator.fullName}`}
                    profileImg={ProfilePic}
                    uid={moderator.id}
                  />
              )
            )}

            {fetchedMembers.map((member, index) => (
              <Member
                key={index}
                role="Member"
                name={`${member.fullName}`}
                profileImg={ProfilePic}
                uid={member.id}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default GroupMembers;

const styles = StyleSheet.create({});
