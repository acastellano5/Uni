import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Stack } from "expo-router";
import GlobalProvider from "../context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
const RootLayout = () => {

  return (
    <GlobalProvider>
      <Stack screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="post" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="aiChat" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="group" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="event" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
      </GlobalProvider>
  );
};

export default RootLayout;
