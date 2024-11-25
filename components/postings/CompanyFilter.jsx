import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { SafeAreaView } from "react-native-safe-area-context";
  import SingleSelectDropdown from "../../components/dropdown/SingleSelect";
  import { jobFieldsData } from "../../assets/data";
  import CustomButton from "../CustomButton";
  
  const Filter = ({
    visible,
    onRequestClose,
    animationType,
    presentationStyle,
    setSelectedIndustry
  }) => {
    const [form, setForm] = useState({
      field: "",
    });
  
    const handleApply = () => {
      setSelectedIndustry(form.field)
      onRequestClose()
    }
  
    return (
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        animationType={animationType}
        presentationStyle={presentationStyle}
      >
        <SafeAreaView>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View className="mt-5 w-11/12 mx-auto items-end mb-3">
              <TouchableOpacity onPress={onRequestClose} activeOpacity={0.8}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
  
            <Text className="text-3xl text-center font-semibold mb-3">Company Filter</Text>
  
            <View className="w-11/12 mx-auto mb-5">
              <SingleSelectDropdown
                data={jobFieldsData}
                onItemSelect={(e) => setForm({ ...form, field: e.value })}
                containerStyles="mb-3"
                title="Company Type"
                placeholder="Filter by type"
              />
  
              {/* Apply Button */}
              <CustomButton
                title="Apply"
                containerStyles="bg-primary py-3 w-4/12 mx-auto"
                textStyles="text-white font-semibold"
                handlePress={handleApply}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };
  
  export default Filter;
  
  const styles = StyleSheet.create({});
  