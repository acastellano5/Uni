import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import FormField from "../FormField";
import MultiSelect from "../dropdown/MultiSelect";
import { interestsData } from "../../assets/data/filter";

const Interests = ({ handleNextPress, handleSkipPress }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Page title */}
      <Text className="text-4xl font-semibold text-center mb-5">
        Bio & Interests
      </Text>

      {/* Form Inputs */}
      <FormField
        title="Bio"
        placeholder="Type here"
        isEditable={true}
        isMultiLine={true}
        maxLength={300}
        otherStyles="mb-3"
      />

      <MultiSelect filterCategory="Interests" data={interestsData} />

      {/* Next and Skip Buttons */}
      <View className="flex-row justify-center mt-10">
        <CustomButton
          title="Skip"
          containerStyles="bg-tertiary py-2 px-8"
          textStyles="text-base"
          handlePress={handleSkipPress}
        />

        <CustomButton
          title="Next"
          containerStyles="bg-primary py-2 px-8 ml-3"
          textStyles="text-base"
          handlePress={handleNextPress}
        />
      </View>
    </ScrollView>
  );
};

export default Interests;

const styles = StyleSheet.create({});
