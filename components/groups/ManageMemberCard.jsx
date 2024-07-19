import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/globalProvider";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { AntDesign } from "@expo/vector-icons";
import { removeGroupMember } from "../../lib/useFirebase";
import { router } from "expo-router";

const ManageMemberCard = ({ person, groupId, orgId, addUser, role }) => {
  const { user } = useGlobalContext();
  const currentUserId = user.uid;
  return (
    <View className="flex-row justify-between items-center w-full">
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/profile/profileShow",
              params: { uid: currentUserId },
            })
          }
        >
          <Image source={ProfilePic} style={styles.profilePic} />
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2"
          onPress={() =>
            router.push({
              pathname: "/profile/profileShow",
              params: { uid: currentUserId },
            })
          }
        >
          {role ? <Text className="text-sm text-darkGray">{role}</Text> : null}
          <Text>{person.fullName}</Text>
        </TouchableOpacity>
      </View>

      {addUser ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            alert("booyah");
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="#22c55e" />
        </TouchableOpacity>
      ) : currentUserId !== person.id ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            removeGroupMember(groupId, person, orgId);
          }}
        >
          <AntDesign name="closecircleo" size={24} color="red" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ManageMemberCard;

const styles = StyleSheet.create({
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
