import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ProfileLayout = () => {
  return (
    <>
      <Stack screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
          name="profileShow"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="editProfile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default ProfileLayout;
