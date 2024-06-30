import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SetUpLayout = () => {
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
          name="schoolsIndex"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="schoolShow"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verifyEmail"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="processReq"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#000" style="light" />
    </>
  );
};

export default SetUpLayout;
