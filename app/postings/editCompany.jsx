import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { jobFieldsData } from "../../assets/data";
import SingleSelect from "../../components/dropdown/SingleSelect";
import LogoUpload from "../../components/imageUpload/LogoUpload";
import { addCompany, getCompanyById, editCompany } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router, useLocalSearchParams } from "expo-router";

const EditCompany = () => {
  const { companyId } = useLocalSearchParams();
  const [form, setForm] = useState({});

  const fetchCompany = async () => {
    const fetchedCompany = await getCompanyById(companyId);
    setForm({
      companyLogo: fetchedCompany.logo,
      location: fetchedCompany.location,
      companyName: fetchedCompany.companyName,
      industry: fetchedCompany.industry,
      description: fetchedCompany.description,
    });
  };
  useEffect(() => {
    fetchCompany();
  }, []);
  const { orgId } = useGlobalContext();

  const onEditPress = async () => {
    await editCompany(companyId, form, orgId);
    router.replace({pathname: "/postings/companyInfo", params: { companyId }});
  };
  const handleBackPress = async () => {
    router.replace({ pathname: "/postings/companyInfo", params: { companyId } })
  }

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" onBackPress={handleBackPress}/>
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView
          className="w-10/12 mx-auto top-[50]"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl text-center font-semibold mb-3">
            Edit Company
          </Text>

          {/* company logo */}
          <View className="items-center">
            <Image
              source={{ uri: form.companyLogo }}
              style={styles.profilePic}
              className="mb-3"
            />
            <LogoUpload
              form={form}
              setForm={setForm}
              containerStyles="w-10/12 mx-auto"
            />
          </View>

          <FormField
            title="Company Name"
            value={form.companyName}
            handleChangeText={(e) => setForm({ ...form, companyName: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Industry"
            placeholder="Select industry"
            data={jobFieldsData}
            selectedValue={form.industry}
            onItemSelect={(item) => {
              setForm({ ...form, industry: item.label });
            }}
            containerStyles="mb-3"
          />

          <FormField
            title="Company Location"
            value={form.location}
            handleChangeText={(e) => setForm({ ...form, location: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            placeholder="Type here..."
            isEditable={true}
            isMultiLine={true}
            maxLength={300}
            otherStyles="mb-3 max-h-40"
          />

          <CustomButton
            title="Update"
            containerStyles="bg-primary py-3 mb-24"
            textStyles="text-white text-base font-semibold"
            handlePress={onEditPress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditCompany;

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
    objectFit: "cover",
  },
});
