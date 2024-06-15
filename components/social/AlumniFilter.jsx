import { Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import { interestsData, classData, collegesData, statesData, jobFieldsData } from "../../assets/data/filter"
import CustomButton from "../CustomButton";

const AlumniFilter = () => {

  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">Alumni</Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>
    
    <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown filterCategory="Class" data={classData}/>
        <MultiSelectDropDown filterCategory="Interests" data={interestsData}/>
        <SingleSelectDropdown filterCategory="State" data={statesData}/>
        <SingleSelectDropdown filterCategory="Field" data={jobFieldsData}/>
        <SingleSelectDropdown filterCategory="College" data={collegesData}/>
    </View>


    <CustomButton title="Apply" containerStyles="bg-primary py-3 w-4/12 mx-auto" textStyles="text-white font-semibold"/>    
    </>
  );
};

export default AlumniFilter;
