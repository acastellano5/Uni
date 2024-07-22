import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { followUser, unfollowUser } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";

const FollowingCard = ({ person, isFollowing, setIsVisible }) => {
  const { orgId } = useGlobalContext();
  const [following, setFollowing] = useState(isFollowing);

  const onFollowOrUnfollow = async () => {
    if (following) {
      Alert.alert(
        `Unfollow ${person.fullName}`,
        `Are you sure you want to unfollow ${person.fullName}?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await unfollowUser(person.id, orgId);
              setFollowing(false);
            },
          },
        ]
      );
    } else {
      await followUser(person.id, orgId);
      setFollowing(true);
    }
  };

  const onClickProfile = () => {
    setIsVisible(false);
    router.push({
      pathname: "/profile/profileShow",
      params: { uid: person.id },
    });
  };

  return (
    <View className="flex-row justify-between items-center w-full mb-3">
      <View className="flex-row items-center" style={{ maxWidth: "55%" }}>
        <TouchableOpacity
          onPress={onClickProfile}
        >
          <Image source={ProfilePic} style={styles.profilePic} />
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2"
          onPress={onClickProfile}
        >
          <Text numberOfLines={1} ellipsizeMode="tail">
            {person.fullName}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onFollowOrUnfollow}
        className="border border-primary p-2 rounded"
      >
        <Text className="text-primary">
          {following ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowingCard;

const styles = StyleSheet.create({
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
