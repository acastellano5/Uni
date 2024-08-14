import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ChatTabs = ({ tabs, activeTab, setActiveTab }) => {

  return (
    <View className="flex-row justify-between items-center w-10/12 mx-auto mt-5">
      { tabs.map((tab, index) => (
        <TouchableOpacity 
        key={index} 
        activeOpacity={0.8}
        className={`${activeTab === tab ? "bg-primary" : ""} py-2 px-3 rounded-lg`}
        onPress={() => setActiveTab(tab)}
        >
            <Text
            className={`${activeTab === tab ? "text-white" : "text-darkGray"} text-base font-semibold`}>
                { tab }
            </Text>
        </TouchableOpacity>
      )) }
    </View>
  )
}

export default ChatTabs

const styles = StyleSheet.create({})