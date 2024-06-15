import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const create = () => {
  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
          <View className="w-10/12 mx-auto top-[50]">
            <Text className="text-3xl text-center font-semibold">
              Create Post
            </Text>
            <FormField
              title="Post"
              otherStyles="mb-3"
              placeholder="Post url..."
              labelStyles="text-base font-medium"
            />
            <FormField
              title="Caption"
              otherStyles=" mb-5"
              placeholder="Caption..."
              labelStyles="text-base font-medium"
            />
            <CustomButton
              title="Create"
              containerStyles="bg-primary py-3"
              textStyles="text-white text-base font-semibold"
            />
          </View>
      </View>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
