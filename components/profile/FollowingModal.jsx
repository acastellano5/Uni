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
import { Ionicons } from "@expo/vector-icons";

const FollowingModal = ({
  visible,
  setIsVisible,
  animationType,
  presentationStyle,
  following,
  fetchFollowing,
}) => {
  const { orgId, user } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const onCloseModal = () => {
    setIsVisible(false);
    fetchFollowing();
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResult([]);
    setIsSearchResult(false);
  };

  const onValidateSearch = () => {
    setSearchValue("");
  };

  const onSubmitSearch = async () => {
    const users = await getUsersFollowing(orgId, searchValue, user.uid);
    setSearchResult(users);
    setSearchValue("");
    setIsSearchResult(true);
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
            onValidateSearch={onValidateSearch}
            needFilter={false}
            containerStyles="w-full"
          />

          <View className="bg-white pt-3 px-2 rounded mt-3">
            <ScrollView showsVerticalScrollIndicator={false}>
              {visible ? (
                !isSearchResult ? (
                  following.length > 0 ? (
                    following.map((user, index) => (
                      <FollowingCard
                        person={user}
                        key={index}
                        isFollowing={true}
                      />
                    ))
                  ) : (
                    <Text className="text-base text-darkGray text-center mb-3">
                      You are not following anyone.
                    </Text>
                  )
                ) : searchResult.length > 0 ? (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleClearSearch}
                      className="self-start mb-3"
                    >
                      <Ionicons name="chevron-back" size={24} color="#545454" />
                    </TouchableOpacity>
                    {searchResult.map((user, index) => (
                      <FollowingCard
                        person={user}
                        key={index}
                        isFollowing={true}
                      />
                    ))}
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleClearSearch}
                      className="self-start mb-3"
                    >
                      <Ionicons name="chevron-back" size={24} color="#545454" />
                    </TouchableOpacity>
                    <Text className="text-base text-darkGray text-center mb-3">
                      No users found.
                    </Text>
                  </View>
                )
              ) : null}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FollowingModal;

const styles = StyleSheet.create({});
