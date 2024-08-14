import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useLocalSearchParams } from "expo-router";

const VerifyEmail = () => {
  const params = useLocalSearchParams();
  const { role } = params;

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9 pt-10">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            <View className="mt-10">
              <Text className="text-lg text-center text-gray-700 font-bold">
                  Please go to your email to verify your email address.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
