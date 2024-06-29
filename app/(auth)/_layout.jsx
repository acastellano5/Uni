import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Loader from "../../components/Loader";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="log-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="accountSetUp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#000" style="light" />
    </>
  );
};

export default AuthLayout;
