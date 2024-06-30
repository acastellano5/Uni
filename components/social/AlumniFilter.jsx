import { Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import { interestsData, classData, collegesData, statesData, jobFieldsData } from "../../assets/data"
import CustomButton from "../CustomButton";

const AlumniFilter = () => {

  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">Alumni</Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>
    
    <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown data={classData} focusedColor="#22c55e" title="Class" placeholder="Filter by Class"/>
        <MultiSelectDropDown title="Interests" placeholder="Filter by Interests" data={interestsData}/>
        <SingleSelectDropdown data={statesData} focusedColor="#22c55e" title="State" placeholder="Filter by State"/>
        <SingleSelectDropdown data={jobFieldsData} focusedColor="#22c55e" title="Field" placeholder="Filter by Field"/>
        <SingleSelectDropdown data={collegesData} focusedColor="#22c55e" title="College" placeholder="Filter by College"/>
    </View>


    <CustomButton title="Apply" containerStyles="bg-primary py-3 w-4/12 mx-auto" textStyles="text-white font-semibold"/>    
    </>
  );
};

export default AlumniFilter;
