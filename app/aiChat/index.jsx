import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import ChatHeader from "../../components/chat/ChatHeader";

const aiChat = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <ChatHeader chatName="AI Assistant" />
    </SafeAreaView>
  )
}

export default aiChat

const styles = StyleSheet.create({})