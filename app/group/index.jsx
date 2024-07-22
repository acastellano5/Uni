import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ShowGroup from "../../components/groups/ShowGroup";
import ManageGroup from "../../components/groups/ManageGroup";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/globalProvider";
import { getGroupById } from "../../lib/useFirebase";

const index = () => {
  const { orgId } = useGlobalContext();
  const { id } = useLocalSearchParams();
  const [group, setGroup] = useState(null);
  const [groupContent, setGroupContent] = useState("show group");


  const fetchGroup = async () => {
    if (!id) {
      console.log("ID is not available");
      return;
    }

    try {
      const groupData = await getGroupById(id, orgId);
      if (groupData) {
        setGroup(groupData);
      } else {
        console.log("No group data found");
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };


  useEffect(() => {
    fetchGroup();
  }, [id]);


  const displayGroupContent = () => {
    switch (groupContent) {
      case "show group":
        return <ShowGroup group={group} fetchGroup={fetchGroup} setGroupContent={setGroupContent}/>;

      case "manage group":
        return <ManageGroup group={group} fetchGroup={fetchGroup} setGroupContent={setGroupContent}/>;

      default:
        return <Text>didn't work</Text>;
    }
  };

  return <>
  {displayGroupContent()}
  </>;
};

export default index;

const styles = StyleSheet.create({});
