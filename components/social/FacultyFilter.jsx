import { Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import {
  interestsData,
  classData,
  departmentsData,
  activitiesData,
} from "../../assets/data";
import CustomButton from "../CustomButton";
import { useGlobalContext } from "../../context/globalProvider";
import { filterUsers } from "../../lib/useFirebase";

const FacultyFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext();

  const [form, setForm] = useState({
    department: "",
    interests: [],
    group: "",
  });

  const handleApply = async () => {
    const users = await filterUsers("Faculty/Staff", form, orgId);
    setUsers(users);
    dismissFilter();
  };

  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">
          Faculty/Staff
        </Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>

      <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown
          data={departmentsData}
          focusedColor="#22c55e"
          title="Department"
          placeholder="Filter by Department"
          onItemSelect={(e) => {
            setForm({ ...form, department: e.value });
          }}
        />
        <MultiSelectDropDown
          title="Interests"
          placeholder="Filter by Interests"
          data={interestsData}
          onItemSelect={(e) => {
            setForm({ ...form, interests: e });
          }}
        />
        <SingleSelectDropdown
          data={activitiesData}
          focusedColor="#22c55e"
          title="Groups"
          placeholder="Filter by Groups"
          onItemSelect={(e) => {
            setForm({ ...form, group: e.value });
          }}
        />
        {/* <MultiSelectDropDown title="Groups" placeholder="Filter by Groups" data={activitiesData}/>    */}
      </View>
      <CustomButton
        title="Apply"
        containerStyles="bg-primary py-3 w-4/12 mx-auto"
        textStyles="text-white font-semibold"
        handlePress={handleApply}
      />
    </>
  );
};

export default FacultyFilter;
