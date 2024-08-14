import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const VerifyEmail = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9 pt-10">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            <View className="mt-10">
              <Text className="text-lg text-center text-gray-700 font-bold">Please wait while the school processes your request</Text>
              <Text className="text-lg text-center text-gray-700 mt-3 font-bold">Come back later</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;
