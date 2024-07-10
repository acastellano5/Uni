import { ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import ChatHeader from "../../components/chat/ChatHeader";
import ChatName from "../../components/chat/ChatName";
import { ChatMessageLeft, ChatMessageRight } from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";


const aiChat = () => {
  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  });
  const [messages, setMessages] = useState([
    { type: "left", value: "Hello! How can I help you today?" },
  ]);
  const addMessage = (type, message) => {
    setMessages((prevMessages) => [...prevMessages, { type: type, value: message }]);
  };
  return (
    <SafeAreaView className="h-full bg-black">
      <ChatHeader title="AI Chat" />
      <KeyboardAvoidingView className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 flex-1">
        <ChatName name="AI Assistant" profileName="aiChat" />
        
        {/* Chat contents */}
        <ScrollView className="mt-5 pl-5 pr-5" ref={scrollViewRef}>
          {
            messages.map((message, index) => {
              if (message.type == "left") {
                return <ChatMessageLeft key={index} message={message.value} />;
              } else {
                return <ChatMessageRight key={index} message={message.value} />;
              }
            })
          }
        </ScrollView>

        <ChatInput addMessage={addMessage} addr="https://server.benti.dev:9443/api/get_answer" model="salesianum" apiKey="key1" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default aiChat;

/*

TODO:
Maybe make chat persistent? (idk how to do that...)

*/