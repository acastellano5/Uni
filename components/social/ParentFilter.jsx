import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import { interestsData } from "../../assets/data";
import CustomButton from "../CustomButton";
import { filterUsers, getAllGroups } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const ParentFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext();

  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    interests: [],
    group: "",
  });

  const handleApply = async () => {
    const users = await filterUsers("Parent", form, orgId);
    setUsers(users);
    dismissFilter();
  };

  useEffect(() => {
    const fetchGroupsData = async () => {
      let groups = await getAllGroups(orgId, "Parent");
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
              Parent
            </Text>
            <Ionicons name="filter-circle-outline" size={32} color="black" />
          </View>

          <View className="w-11/12 mx-auto mb-5">
            <MultiSelectDropDown
              title="Interests"
              placeholder="Filter by Interests"
              data={interestsData}
              containerStyles="mb-2"
              onItemSelect={(e) => {
                setForm({ ...form, interests: e });
              }}
            />
            <SingleSelectDropdown
              data={groupsData}
              focusedColor="#22c55e"
              title="Group"
              placeholder="Filter By Group"
              onItemSelect={(e) => {
                setForm({ ...form, group: e.value });
              }}
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

export default ParentFilter;
