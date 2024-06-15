import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import StudentFilter from "./StudentFilter";
import AlumniFilter from "./AlumniFilter";
import FacultyFilter from "./FacultyFilter";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Filter = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
  category,
}) => {
  const displayFilterContent = () => {
    switch (category) {
      case "Students":
        return <StudentFilter />;

      case "Alumni":
        return <AlumniFilter />;

      case "Faculty/Staff":
        return <FacultyFilter />;

      default:
        return null;
    }
  };

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
            <TouchableOpacity onPress={onRequestClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>


          {displayFilterContent()}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({});
