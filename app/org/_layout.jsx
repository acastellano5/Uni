import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const OrgLayout = () => {

  return (
      <Stack screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
  );
};

export default OrgLayout;
