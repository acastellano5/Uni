import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import {
  interestsData,
  classData,
  collegesData,
  statesData,
  jobFieldsData,
} from "../../assets/data";
import CustomButton from "../CustomButton";
import { filterUsers, getAllGroups } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
const AlumniFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext();

  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    class: "",
    interests: [],
    state: "",
    field: "",
    college: "",
    group: "",
  });

  const handleApply = async () => {
    const users = await filterUsers("Alumni", form, orgId);
    setUsers(users);
    dismissFilter();
  };

  useEffect(() => {
    const fetchGroupsData = async () => {
      let groups = await getAllGroups(orgId, "Alumni");
      groups = groups.map((group) => ({
        label: group.name,
        value: group.id,
      }));

      setGroupsData(groups);
      setLoading(false);
    };

    fetchGroupsData();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <View className="mt-3 mb-3 flex-row justify-center items-center">
            <Text className="text-3xl font-semibold text-center mr-2">
              Alumni
            </Text>
            <Ionicons name="filter-circle-outline" size={32} color="black" />
          </View>

          <View className="w-11/12 mx-auto mb-5">
            <SingleSelectDropdown
              data={classData}
              onItemSelect={(e) => {
                setForm({ ...form, class: e.value });
              }}
              containerStyles="mb-2"
              title="Class"
              placeholder="Filter by Class"
            />
            <MultiSelectDropDown
              title="Interests"
              containerStyles="mb-2"
              onItemSelect={(e) => {
                setForm({ ...form, interests: e });
              }}
              placeholder="Filter by Interests"
              data={interestsData}
            />
            <SingleSelectDropdown
              data={groupsData}
              title="Groups"
              containerStyles="mb-2"
              placeholder="Filter by Groups"
              onItemSelect={(e) => {
                setForm({ ...form, group: e.value });
              }}
            />
            <SingleSelectDropdown
              data={statesData}
              containerStyles="mb-2"
              onItemSelect={(e) => setForm({ ...form, state: e.value })}
              title="State"
              placeholder="Filter by State"
            />
            <SingleSelectDropdown
              data={jobFieldsData}
              containerStyles="mb-2"
              onItemSelect={(e) => setForm({ ...form, field: e.value })}
              title="Field"
              placeholder="Filter by Field"
            />
            <SingleSelectDropdown
              data={collegesData}
              onItemSelect={(e) => setForm({ ...form, college: e.value })}
              title="College"
              placeholder="Filter by College"
              isSearchable={true}
            />
          </View>

          <CustomButton
            title="Apply"
            containerStyles="bg-primary py-3 w-4/12 mx-auto"
            textStyles="text-white font-semibold"
            handlePress={handleApply}
          />
        </>
      ) : null}
    </>
  );
};

export default AlumniFilter;
