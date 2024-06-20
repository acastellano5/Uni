import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Stack } from "expo-router";
import GlobalProvider from "../context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
const RootLayout = () => {

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="aiChat" options={{ headerShown: false }} />
      </Stack>
      </GlobalProvider>
  );
};

export default RootLayout;
