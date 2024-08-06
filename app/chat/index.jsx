import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatName from "../../components/chat/ChatName";
import {
  ChatMessageLeft,
  ChatMessageRight,
} from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useLocalSearchParams } from "expo-router";
import { getChat } from "../../lib/useFirebase";

const chat = () => {
  const scrollViewRef = useRef();
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState([]);
  const { chatID } = useLocalSearchParams();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const addMessage = (type, message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: type, value: message },
    ]);
  };

  useLayoutEffect(() => {
    const load = async () => {
      setChat(await getChat(chatID));
    }
    load();
  }, [chatID]);

  useEffect(() => {
    if (chat) {
      setIsLoading(true);
      setMessages(chat.messages);
      setIsLoading(false);
    }
  }, [chat]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={20}
      >
        <ChatHeader title="Messages" />

        <View className="bg-darkWhite mt-5 pt-5 h-full rounded-t-3xl">
          <ChatName name={isLoading ? "Loading" : chat.users.filter((val) => { return val !== "You" }).join(", ")} profileName="" />
          <ScrollView
            className="mt-5 pl-5 pr-5 flex-1"
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {/* Small piece of text with message "This chat is non-persistent" */}
            <Text className="text-[#333] text-sm text-center text-[#888888] mb-3 mt-1">
              Your chats are private, and are only reviewed if they are flagged by our system.
            </Text>
            {(isLoading) ? (
              <View>
                <View style={{ height: 120 }} />
                <ActivityIndicator size="large" color="#22c55e" />
              </View>
            ) : (
              <View>
                {messages.map((message, index) =>
                  (message.author !== "You") ? (
                    <View>
                      <ChatMessageLeft message={message.msg} />
                      {/* If next message is a different author OR is undefined, put this author's name below this message */}
                      {(index + 1 === messages.length || messages[index + 1].author !== message.author) ? (
                        <Text className="text-[#333] text-sm text-left text-[#888888] mt-1 w-[60%]" numberOfLines={1}>
                          {message.author}
                        </Text>
                      ) : null}
                    </View>
                  ) : (
                    <View>
                      <ChatMessageRight message={message.msg} />
                      {/* If next message is a different author OR is undefined, blah blah blah */}
                      {(index + 1 === messages.length || messages[index + 1].author !== message.author) ? (
                        <Text className="text-[#333] text-sm text-right text-[#888888] mt-1 float-right text-end">
                          You
                        </Text>
                      ) : null}
                    </View>
                  )
                )}
              </View>
            )}
          </ScrollView>
          <ChatInput
            addMessage={addMessage}
            addr="https://server.benti.dev:9443/api/get_answer"
            model="salesianum"
            apiKey="key1"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
