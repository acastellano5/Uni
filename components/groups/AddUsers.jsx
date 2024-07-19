import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { getUsers } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import ManageMemberCard from "./ManageMemberCard";
import { AntDesign } from "@expo/vector-icons";

const AddUsers = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
}) => {
  const { orgId } = useGlobalContext();

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [isResults, setIsResults] = useState(false);

  const handleClearSearch = async () => {
    setSearchValue("");
  };

  const onSubmitSearch = async () => {
    try {
      console.log(searchValue);
      const users = await getUsers(orgId, searchValue);
      console.log(users);
      setIsResults(true);
      setResults(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
      <View className="mt-5 w-10/12 mx-auto">
        <TouchableOpacity onPress={onRequestClose} className="self-end">
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-3xl text-center font-semibold mt-5 mb-3">
        Add People
      </Text>

      <SearchBar
        placeholder="Search people"
        textValue={searchValue}
        onClearSearch={handleClearSearch}
        handleChangeText={(e) => setSearchValue(e)}
        handleSubmitEditing={onSubmitSearch}
        needFilter={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
        <View className="w-10/12 mx-auto">
          {isResults ? (
            results.length > 0 ? (
              results.map((person, index) => (
                <ManageMemberCard person={person} key={index} addUser={true} />
              ))
            ) : (
              <Text className="text-center text-darkGray text-base mt-5">
                No people found
              </Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddUsers;

const styles = StyleSheet.create({});
