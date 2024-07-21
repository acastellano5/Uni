import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../SearchBar";
import FollowingCard from "./FollowingCard";
import { getUsersFollowing } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const FollowingModal = ({
  visible,
  setIsVisible,
  animationType,
  presentationStyle,
  following,
  fetchFollowing,
}) => {
    const { orgId } = useGlobalContext
  const [searchValue, setSearchValue] = useState("");

  const onCloseModal = () => {
    setIsVisible(false);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const onSubmitSearch = async () => {
    const users = await getUsersFollowing(orgId, searchValue)
    console.log("*******")
    console.log(users)
    console.log("*******")
    setSearchValue("");
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onCloseModal}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
        <View className="h-full bg-darkWhite">
        <View className="mt-5 w-10/12 mx-auto">
        <TouchableOpacity onPress={onCloseModal} className="self-end">
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-3xl text-center font-semibold mt-5 mb-3">
          Following
        </Text>

        <SearchBar
          placeholder="Search people"
          textValue={searchValue}
          onClearSearch={handleClearSearch}
          handleChangeText={(e) => setSearchValue(e)}
          handleSubmitEditing={onSubmitSearch}
          needFilter={false}
          containerStyles="w-full"
        />

        <View className="bg-white pt-3 px-2 rounded mt-3">
          <ScrollView showsVerticalScrollIndicator={false}>
            {visible
              ? following.map((user, index) => (
                  <FollowingCard person={user} key={index} isFollowing={true}/>
                ))
              : null}
          </ScrollView>
        </View>
      </View>
        </View>
    </Modal>
  );
};

export default FollowingModal;

const styles = StyleSheet.create({});
