import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import ChatHeader from "../../components/chat/ChatHeader";
import ChatName from "../../components/chat/ChatName";
import {
  ChatMessageLeft,
  ChatMessageRight,
} from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getUserNameMatches, createChat } from "../../lib/useFirebase";
import { router } from "expo-router"


export default function newMessage() {
  const [members, setMembers] = useState([
    { fullName: "You", id: auth().currentUser.uid }
  ]);
  const [userNameMatches, setUserNameMatches] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      if (searchValue.trim() == "") {
        setUserNameMatches([]);
        return;
      }
      
      const matches = await getUserNameMatches(searchValue.trim());
      setUserNameMatches(matches);
    }
    load();
  }, [searchValue]);

  const addMember = (member) => {
    console.log("pressed!");
    if (members.includes(member)) return;
    setMembers([...members, member]);
    // clear the search bar
    setSearchValue("");
  }

  const removeMember = (member) => {
    setMembers(members.filter((val) => { return val !== member} ))
  }

  const attemptCreateChat = async () => {
    var result = await createChat(members, message);
    if (typeof(result) == "string") return alert(result);

    router.replace({
      pathname: "/chat",
      params: { chatID: result.id }
    });
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ChatHeader title="Messages" />
        <ScrollView className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
          {/* Text saying "New Message" */}
          <Text className="text-center font-semibold text-lg text-dark mt-4">
            New Message
          </Text>

          {/* Textbox for searching members, with Add button next to it */}
          <View className="flex-row justify-between items-center w-11/12 mx-auto bg-white rounded-xl px-3 py-2 mt-2">
            <TextInput
              placeholder="Search users..."
              className="w-10/12"
              onChangeText={value => setSearchValue(value)}
              value={searchValue}
            />
            {/* <TouchableOpacity>
              <Text className="font-semibold text-dark">Add</Text>
            </TouchableOpacity> */}
          </View>
          {/* Dropdown of matched usernames for the user to add, dynamic size depending on contents */}
          <ScrollView className="w-[100%] mt-2" style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
            {/* matched usernames dropdown, each of them being a button to add it */}
            {userNameMatches.map((user) => {
              return (
                <View key={user.id} className="flex-row items-center justify-between w-11/12 mx-auto bg-white rounded-xl px-3 py-2 mt-2">
                  <Text className="font-semibold text-dark">{user.fullName}</Text>
                  <TouchableOpacity className="bg-primary rounded-md w-[25px] h-[25px] flex items-center justify-center" onPress={() => { addMember(user) }}>
                    <Text className="font-semibold text-white text-center">+</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>

          <Text className="text-left font-semibold text-lg text-dark ml-5 mt-5">
            Members:
          </Text>

          {/* List of members */}
          <ScrollView className="w-11/12 mx-auto bg-[#bbbbbb] rounded-xl px-3 py-2 mt-2" style={{height: 200}} nestedScrollEnabled={true}>
            {members.map((member) => {
              return (
                <View key={member.id} className="flex-row items-center justify-between w-11/12 mx-auto bg-white rounded-xl px-3 py-2 mt-2">
                  <Text className="font-semibold text-dark">{member.fullName}</Text>
                  {(member.fullName !== "You") ? (
                  <TouchableOpacity className="bg-red-400 rounded-md w-[25px] h-[25px] flex items-center justify-center" onPress={() => { removeMember(member) }}>
                    <Text className="font-semibold text-white text-center">-</Text>
                  </TouchableOpacity>
                  ) : null}
                </View>
              )
            })}
            <View className="h-[20px]"></View>
          </ScrollView>

          <Text className="text-left font-semibold text-lg text-dark ml-5 mt-5">
            Message:
          </Text>
          <TextInput
            className="w-11/12 mx-auto bg-white rounded-xl px-3 py-2 mt-2"
            placeholder="Type your message here..."
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            onChangeText={value => setMessage(value)}
          />
            
          {/* Send button */}
          <TouchableOpacity
            className={`rounded-xl w-11/12 mx-auto py-2 mt-2 ${(members.length > 1 && message.trim().length > 0) ? "bg-primary" : "bg-[#bbbbbb]"}`}
            disabled={!(members.length > 1 && message.trim().length > 0)}
            onPress={() => { attemptCreateChat(members, message) }}
          >
            <Text className={`${(members.length > 1 && message.trim().length > 0) ? "text-white" : "text-dark"} text-center font-semibold`}>Send</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});