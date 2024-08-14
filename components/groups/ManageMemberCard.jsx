import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/globalProvider";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { AntDesign } from "@expo/vector-icons";
import {
  removeGroupMember,
  addGroupMember,
  isUserInGroup,
  isUserModerator,
} from "../../lib/useFirebase";
import { router } from "expo-router";

const ManageMemberCard = ({
  person,
  groupId,
  orgId,
  addUser,
  role,
  fetchGroup
}) => {
  const { user } = useGlobalContext();
  const currentUserId = user.uid;
  const [isMember, setIsMember] = useState(null);
  const [isModerator, setIsModerator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ userRole, setUserRole ] = useState(role)

  const fetchStatus = async () => {
    const memberStatus = await isUserInGroup(groupId, orgId, person.id);
    setIsMember(memberStatus)

    const moderatorStatus = await isUserModerator(groupId, orgId, person.id);
    setIsModerator(moderatorStatus);

    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, [ person ]);

  useEffect(() => {
    if (isMember) {
        setUserRole("Member")
    } else if (isModerator) {
        setUserRole("Moderator")
    } else {
        setUserRole(null)
    }
  }, [ isMember, isModerator ])

  const onRemoveUser = async () => {
    await removeGroupMember(orgId, groupId, person.id);
    fetchGroup();
  };

  const onAddUser = async () => {
    Alert.alert(
      `Add ${person.fullName}`,
      `How would you like to add ${person.fullName}`,
      [
        {
          text: "Moderator",
          onPress: async () => {
            await addGroupMember(groupId, person.id, orgId, true);
            fetchGroup();
            setUserRole("Moderator")
            setIsModerator(true)
          },
        },
        {
          text: "Member",
          onPress: async () => {
            await addGroupMember(groupId, person.id, orgId, false);
            fetchGroup();
            setUserRole("Member")
            setIsMember(true)
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    !loading ? (
      <View className="flex-row justify-between items-center w-full mb-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/profile/profileShow",
                params: { uid: person.id },
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
                params: { uid: person.id },
              })
            }
          >
            {userRole ? <Text className="text-sm text-darkGray">{userRole}</Text> : null}
            <Text>{person.fullName}</Text>
          </TouchableOpacity>
        </View>
  
        {addUser ? (
          isMember || isModerator ? (
            <AntDesign name="checkcircle" size={24} color="#063970" />
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={onAddUser}>
              <AntDesign name="pluscircleo" size={24} color="#063970" />
            </TouchableOpacity>
          )
        ) : (
          currentUserId !== person.id ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onRemoveUser}>
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
          ) : null
        )}
      </View>
    ) : null
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
