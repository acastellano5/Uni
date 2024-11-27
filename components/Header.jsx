import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import { useGlobalContext } from "../context/globalProvider";
import { getUserAttributes } from "../lib/useFirebase";
import defaultPic from "../assets/images/profilepic.jpeg"

const Header = ({ textStyles }) => {
  const { user } = useGlobalContext()
  const [ profilePic, setProfilePic ] = useState("")

  useEffect(() => {
    const fetchUserPic = async () => {
      const userAttr = await getUserAttributes(user.uid)
      setProfilePic(userAttr.profilePicture)
    }

    fetchUserPic()
  }, [ ])

  return (
    <View className="flex-row justify-between w-11/12 mx-auto items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/profile/profileShow")}
      >
         <Image
              source={profilePic ? { uri: profilePic } : defaultPic}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
      </TouchableOpacity>

        <Text
          className={`text-2xl font-semibold text-center text-white ${textStyles}`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Salesianum
        </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/postings")}
      >
        <Entypo name="briefcase" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
