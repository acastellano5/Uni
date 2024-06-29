import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const EventsLayout = () => {
  return (
    <Stack screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="eventsShow" options={{ headerShown: false }} />
    </Stack>
  )
}

export default EventsLayout