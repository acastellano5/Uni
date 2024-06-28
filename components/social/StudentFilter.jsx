import { Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import { interestsData, classData, activitiesData } from "../../assets/data/filter"
import CustomButton from "../CustomButton";

const StudentFilter = () => {

  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">Student</Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>
    
    <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown data={classData.slice(0, 4)} focusedColor="#22c55e" title="Class" placeholder="Filter By Class"/>
        <MultiSelectDropDown filterCategory="Interests" data={interestsData}/>
        <MultiSelectDropDown filterCategory="Clubs/Activites" data={activitiesData}/>  
    </View>

    <CustomButton title="Apply" containerStyles="bg-primary py-3 w-4/12 mx-auto" textStyles="text-white font-semibold"/>  
    </>
  );
};

export default StudentFilter;
