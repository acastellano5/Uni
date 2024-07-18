import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const GroupLayout = () => {
  return (
    <>
      <Stack screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default GroupLayout;
