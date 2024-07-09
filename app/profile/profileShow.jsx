import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";
import InfoBox from "../../components/profile/InfoBox";
import PostSection from "../../components/profile/PostSection";
import BackHeader from "../../components/BackHeader";
import { useLocalSearchParams } from "expo-router";
import { getUserAttributes, followUser } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const ProfileShow = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  const params = useLocalSearchParams();
  const { uid } = params;

  // Setting user state and retrieving user data from the database
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      const userResult = await getUserAttributes(uid, orgId);
      setUser(userResult);
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchUser();
  }, [uid]);

  return (
    <SafeAreaView className="h-full bg-black">
      <BackHeader title="My Profile" containerStyles="w-11/12 mx-auto" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {loading ? (
          // Render loader while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* profile image with edit and settings buttons */}
            <View className="items-center justify-center">
              <Image
                source={ProfilePic}
                style={styles.profilePic}
                className="mb-2"
              />
              {/* for passing in fullName */}
              {/* <Text className="text-lg font-medium mb-2">{`${user.fullName}`}</Text> */}

              <Text className="text-lg font-medium mb-2">{user.fullName}</Text>
              <View className="flex-row w-2/3 mx-auto">
                <CustomButton
                  title="Follow"
                  containerStyles="border border-primary py-1 w-3/6"
                  textStyles="text-primary text-sm font-semibold"
                  handlePress={() => {
                    followUser(user.id, orgId)
                    console.log("succesful???")
                  }}
                />

                <CustomButton
                  title="Message"
                  containerStyles="ml-2 border border-primary py-1 w-3/6"
                  textStyles="text-primary text-sm font-semibold"
                />
              </View>
            </View>

            {/* bio section */}
            <View className="bg-white w-11/12 mx-auto mt-5 px-3 py-2 rounded-lg mb-10">
              <Text className="text-lg font-medium mb-1">Bio</Text>
              <View className="bg-lightGreen mb-3 rounded-lg">
                {/* for passing in bio */}
                <Text className="text-[#5e5e5e] p-2">
                  {user.bio ? user.bio : "No bio."}
                </Text>
              </View>

              {/* interests section */}
              {/* for passing in interests */}
              <InfoBox title="Interests" info={user.interests} />

              {/* groups section */}
              {/* <InfoBox title="Groups" info={user.orgs[0].groups}/> */}

              {/* classes section */}
              {/* <InfoBox title="Classes" /> */}

              <PostSection />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#000",
  },
});

export default ProfileShow;
