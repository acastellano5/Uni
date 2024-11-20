import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PostingLayout = () => {
  return (
    <>
      <Stack screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="jobInfo"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="companyInfo"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createJob"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createCompany"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="editCompany"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default PostingLayout;
