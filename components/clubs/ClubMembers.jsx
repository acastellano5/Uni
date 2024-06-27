import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import Member from "./Member";
import { getUserAttributes } from "../../lib/firebase";

const ClubMembers = ({ members }) => {
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // make requests to fetch user info from database
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

  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : (
        <View className="flex-row flex-wrap">
          {fetchedMembers.map((member, index) => (
            <Member key={index} role="Member" name={`${member.firstName} ${member.lastName}`} profileImg={ProfilePic} uid={member.uid} />
          ))}
        </View>
      )}
    </View>
  );
};

export default ClubMembers;

const styles = StyleSheet.create({});
