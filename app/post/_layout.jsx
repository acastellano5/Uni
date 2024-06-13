import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PostLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default PostLayout;
