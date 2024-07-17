import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const GroupToggle = ( { activeTab, setActiveTab } ) => {
  
    return (
      <View
        className="flex-row bg-white rounded items-center p-2 justify-center"
        style={{ maxWidth: "50%" }}
      >
        <TouchableOpacity
          className={`${
            activeTab === "Previous" ? "bg-primary" : null
          } p-2 rounded`}
          onPress={() => {
              setActiveTab("Previous")
          }}
        >
          <Text className={`${activeTab === "Previous" ? "text-white" : null}`}>
            Previous
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          className={`${
            activeTab === "Upcoming" ? "bg-primary" : null
          } p-2 rounded`}
          onPress={() => {
              setActiveTab("Upcoming")
          }}
        >
          <Text className={`${activeTab === "Upcoming" ? "text-white" : null}`}>
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

export default GroupToggle

const styles = StyleSheet.create({})