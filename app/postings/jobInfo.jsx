import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getUserAttributes } from "../../lib/useFirebase"

const jobInfo = () => {
  const job = useLocalSearchParams()
  const [ contact, setContact ] = useState("")

  const fetchContact = async () => {
    const user = await getUserAttributes(job.postedBy)
    setContact(user)
  }

  useEffect(() => {
    fetchContact()
  }, [])

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView className="w-11/12 mx-auto">
          <Text className="text-3xl font-semibold">{job.jobRole}</Text>
          <Text className="text-2xl font-semibold">{ job.company }</Text>
          <Text className="text-xl font-semibold">{ job.location }</Text>
          <Text className="text-lg font-semibold text-gray-400">Posted by {contact.fullName}</Text>

          <Text className="text-base font-semibold mt-5 mb-3">Description</Text>
          <Text className="text-base">
            { job.description }
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default jobInfo;
