import { ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import ChatHeader from "../../components/chat/ChatHeader";
import ChatName from "../../components/chat/ChatName";
import { ChatMessageLeft, ChatMessageRight } from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";


const aiChat = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <ChatHeader title="AI Chat" />
      <KeyboardAvoidingView className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 flex-1">
        <ChatName name="AI Assistant" profileName="aiChat" />
        
        {/* Chat contents */}
        <ScrollView className="mt-5 pl-5 pr-5">
          <ChatMessageLeft message="Hello! How can I help you today?" />
          <ChatMessageRight message="Does Salesianum offer scholarships?" />
          <ChatMessageLeft message="Yes, Salesianum offers scholarships. You can visit the school's website for more information. Dummy text dummy text dummy text dummy text dummy text alsdkfjlkasdfjlasdjflkasdjflasdkjlaskdjflasdkjflkdsjflksdjflksdjflksdjflksdjfklsdfjlksfjlskdjflksdfjlkfalkdsfjlkasdfjksd" />
          <ChatMessageLeft message="Yes, Salesianum offers scholarships. You can visit the school's website for more information. Dummy text dummy text dummy text dummy text dummy text alsdkfjlkasdfjlasdjflkasdjflasdkjlaskdjflasdkjflkdsjflksdjflksdjflksdjflksdjfklsdfjlksfjlskdjflksdfjlkfalkdsfjlkasdfjksd" />
          <ChatMessageLeft message="Yes, Salesianum offers scholarships. You can visit the school's website for more information. Dummy text dummy text dummy text dummy text dummy text alsdkfjlkasdfjlasdjflkasdjflasdkjlaskdjflasdkjflkdsjflksdjflksdjflksdjflksdjfklsdfjlksfjlskdjflksdfjlkfalkdsfjlkasdfjksd" />
          <ChatMessageLeft message="Yes, Salesianum offers scholarships. You can visit the school's website for more information. Dummy text dummy text dummy text dummy text dummy text alsdkfjlkasdfjlasdjflkasdjflasdkjlaskdjflasdkjflkdsjflksdjflksdjflksdjflksdjfklsdfjlksfjlskdjflksdfjlkfalkdsfjlkasdfjksd" />
          <ChatMessageRight message="Does Salesianum offer scholarshipsDoes Salesianum offer scholarDoes Salesianum offer scholarDoes Salesianum offer scholarDoes Salesianum offer scholarDoes Salesianum offer scholar?" />
          <ChatMessageLeft message="Yes, Salesianum offers scholarships. You can visit the school's website for more information. Dummy text dummy text dummy text dummy text dummy text alsdkfjlkasdfjlasdjflkasdjflasdkjlaskdjflasdkjflkdsjflksdjflksdjflksdjflksdjfklsdfjlksfjlskdjflksdfjlkfalkdsfjlkasdfjksd" />
        </ScrollView>

        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default aiChat;

/*

TODO:

Wire it up to the API
(Maybe?) Make <enter> send the message

*/