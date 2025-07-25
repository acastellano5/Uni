import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropDown from "../dropdown/SingleSelect";

const GroupFilter = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
  onFilterSelect, // added prop to handle filter selection
  groupTypes,
}) => {
  // Transform groupTypes into the desired format
  const formattedGroupTypes = groupTypes.map((type) => ({
    label: type,
    value: type,
  }));
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
      <SafeAreaView>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View className="mt-5 w-11/12 mx-auto items-end">
            <TouchableOpacity onPress={onRequestClose} activeOpacity={0.8}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="mt-3 mb-3 flex-row justify-center items-center">
            <Text className="text-3xl font-semibold text-center mr-2">
              Groups
            </Text>
            <Ionicons name="filter-circle-outline" size={32} color="black" />
          </View>

          <View className="w-11/12 mx-auto mb-5">
            <SingleSelectDropDown
              title="Category"
              placeholder="Filter by Category"
              data={formattedGroupTypes}
              onItemSelect={async (item) => {
                await onFilterSelect(item.value); // call onFilterSelect with selected category
                onRequestClose(); // close the modal
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default GroupFilter;

const styles = StyleSheet.create({});
