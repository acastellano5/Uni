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
import ParentFilter from "./ParentFilter"
import FacultyFilter from "./FacultyFilter";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Filter = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
  category,
  setUsers
}) => {
  const displayFilterContent = () => {
    switch (category) {
      case "Student":
        return <StudentFilter setUsers={setUsers} dismissFilter={onRequestClose}/>;

      case "Alumni":
        return <AlumniFilter setUsers={setUsers} dismissFilter={onRequestClose}/>;

      case "Faculty/Staff":
        return <FacultyFilter setUsers={setUsers} dismissFilter={onRequestClose}/>;

      case "Parent": 
      return <ParentFilter setUsers={setUsers} dismissFilter={onRequestClose}/>;

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
            <TouchableOpacity onPress={onRequestClose} activeOpacity={0.8}>
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
