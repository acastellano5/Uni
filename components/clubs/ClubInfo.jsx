import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import EventIcon from "../../components/events/EventIcon"

const ClubInfo = () => {
  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <Text className="text-base font-semibold mb-2">Description</Text>


      <View className="bg-[#ddf5e2b2] mb-3">
        <Text className="text-[#5e5e5e] p-2 rounded-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</Text>
      </View>


      <Text className="text-base font-semibold mb-2 pl-1">Events</Text>

        <View className="flex-row flex-wrap">
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
        </View>


    </View>
  )
}

export default ClubInfo