import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatName from "../../components/chat/ChatName";
import {
  ChatMessageLeft,
  ChatMessageRight,
} from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";

const aiChat = () => {
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([
    { type: "left", value: "Hello! How can I help you today?" },
  ]);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const addMessage = (type, message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: type, value: message },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={20}
      >
        <ChatHeader title="AI Chat" />

        <View className="bg-darkWhite mt-5 pt-5 h-full rounded-t-3xl">
          <ChatName name="AI Assistant" profileName="aiChat" />
          <ScrollView
            className="mt-5 pl-5 pr-5 flex-1"
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {messages.map((message, index) =>
              message.type == "left" ? (
                <ChatMessageLeft key={index} message={message.value} />
              ) : (
                <ChatMessageRight key={index} message={message.value} />
              )
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

export default aiChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
