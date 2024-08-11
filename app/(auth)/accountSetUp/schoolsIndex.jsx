import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { router } from "expo-router";
import { getAllOrgs } from "../../../lib/useFirebase";

const SchoolCard = ({ handleJoin }) => {
  const [orgs, setOrgs] = useState([])
  
  useEffect(()=> {
    const orgs =  [getAllOrgs().then((result)=> {setOrgs(result)})];


  },[])
  console.log(orgs,"Orgs");

  return (
    <View className="flex-row items-center bg-white rounded-lg p-3 mb-3">
      <Image
        source={{
          uri: "https://agency-m.com/sites/default/files/Salesianum-port01-square-1.png",
        }}
        style={styles.schoolPicture}
      />

      <View className="ml-5 items-start">
        <Text className="text-base font-semibold">Salesianum School</Text>
        <Text className="font-medium text-darkGray mb-2">Wilmington, DE</Text>
        <TouchableOpacity
          className="bg-primary py-1 px-3 rounded-sm"
          activeOpacity={0.8}
          onPress={handleJoin}
        >
          <Text className="text-white">Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SchoolsIndex = () => {
  return (
    <>
      <SafeAreaView className="bg-black h-full">
        <View className="pl-9">
          <Text className="text-primary text-4xl font-bold">Uni</Text>
        </View>

        <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
          <SearchBar placeholder="Search high schools" containerStyles="mb-5" />
          <View className="w-10/12 mx-auto">
            <ScrollView showsVerticalScrollIndicator={false} className="h-full">
              <SchoolCard handleJoin={() => router.push("./schoolShow")} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SchoolsIndex;

const styles = StyleSheet.create({
  schoolPicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
