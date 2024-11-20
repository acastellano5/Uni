import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getUserAttributes } from "../../lib/useFirebase";

const companyInfo = () => {
  const company = useLocalSearchParams();

  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchContact = async () => {
    const fetchedContact = await getUserAttributes(company.owner);
    setContact(fetchedContact);
  };
  useEffect(() => {
    fetchContact();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(contact)
  }, [ contact ])
  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView className="w-11/12 mx-auto">
          {isLoading ? (
            <ActivityIndicator size="large" color="#063970" />
          ) : (
            <>
              <Image
                source={{
                  uri: company.logo,
                }}
                className="mx-auto mb-3"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  objectFit: "cover",
                }}
              />

              <Text className="text-3xl font-semibold text-center">
                {company.companyName}
              </Text>
              <Text className="text-lg font-semibold text-gray-400 text-center">
                Contact: {contact.fullName}
              </Text>

              <Text className="text-base text-center mt-5">
                {company.description}
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default companyInfo;
