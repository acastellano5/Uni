import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getUserAttributes, deleteCompany, getCompanyById } from "../../lib/useFirebase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../../context/globalProvider";

const companyInfo = () => {
  const { companyId } = useLocalSearchParams();
  const [contact, setContact] = useState({});
  const [ company, setCompany ] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalContext();

  const fetchContact = async (ownerId) => {
    const fetchedContact = await getUserAttributes(ownerId);
    setContact(fetchedContact);
  };

  const fetchCompany = async () => {
    const fetchedCompany = await getCompanyById(companyId)
    fetchContact(fetchedCompany.owner)
    setCompany(fetchedCompany)
  }

  useEffect(() => {
    fetchCompany();
    setIsLoading(false);
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the company "${company.companyName}"?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteCompany(company.companyID);
              router.replace("/postings");
            } catch (error) {
              console.error("Error deleting company:", error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({pathname: '/postings/editCompany', params: { companyId: company.companyID }})
  } 

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

              <View className="flex-row justify-center items-center">
                <Text className="text-3xl font-semibold text-center mr-3">
                  {company.companyName}
                </Text>
                {user.uid === company.owner ? (
                  <View className="d-flex flex-row">
                    <TouchableOpacity className="mr-1" activeOpacity={0.8} onPress={handleEdit}>
                      <Feather name="edit" size={24} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleDelete}
                    >
                      <FontAwesome name="trash-o" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

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
