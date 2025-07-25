import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import BackHeader from "../../components/BackHeader";
import { useGlobalContext } from "../../context/globalProvider";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {
  createEvent,
  getGroupById,
  getUserAttributes,
  getUserRole,
} from "../../lib/useFirebase";
import { getCurrentUser } from "../../lib/firebase";
import { router, useLocalSearchParams } from "expo-router";
import ImageUpload from "../../components/imageUpload/ImageUpload";

const CreateEvent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orgId } = useGlobalContext();
  const { eventType, groupId } = useLocalSearchParams();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      const role = await getUserRole(orgId);
      setUserRole(role);
      setCurrentUser(user);
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const [form, setForm] = useState({
    name: "",
    location: "",
    startTime: null,
    endTime: null,
    description: "",
    image: "",
    isOrgCert: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setForm({
      ...form,
      isOrgCert: isEnabled,
    });
  }, [isEnabled]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [tempStartTime, setTempStartTime] = useState(new Date());
  const [tempEndTime, setTempEndTime] = useState(new Date());

  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || tempStartTime;
    setTempStartTime(currentDate);
  };

  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || tempEndTime;
    setTempEndTime(currentDate);
  };

  const confirmStartTime = () => {
    setForm({
      ...form,
      startTime: tempStartTime,
    });
    setShowStartTimePicker(false);
  };

  const clearStartTime = () => {
    setTempStartTime(new Date());
    setShowStartTimePicker(false);
    setForm({
      ...form,
      startTime: null,
    });
  };

  const confirmEndTime = () => {
    setForm({
      ...form,
      endTime: tempEndTime,
    });
    setShowEndTimePicker(false);
  };

  const clearEndTime = () => {
    setTempEndTime(new Date());
    setShowEndTimePicker(false);
    setForm({
      ...form,
      endTime: null,
    });
  };

  const onCreatePress = async () => {
    const { name, location, startTime, endTime, description } = form;

    // Check if required fields are filled
    if (!name || !startTime || !endTime) {
      Alert.alert(
        "Error",
        "Event name, start time, and end time are required."
      );
      return;
    }

    let attendees = currentUser.uid;
    let authorId;
    let type;
    let author;
    if (eventType === "group") {
      type = "group";
      authorId = groupId;
      author = await getGroupById(groupId, orgId);
      author = author.name;
    } else {
      type = "user";
      authorId = currentUser.uid;
      author = await getUserAttributes(authorId);
      author = author.fullName;
    }
    const event = await createEvent(
      type,
      orgId,
      name,
      location,
      startTime,
      endTime,
      attendees,
      authorId,
      description
    );
    router.replace({
      pathname: "/event",
      params: { eventId: event.eventId, author },
    });
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#063970" />
          </View>
        ) : (
          <ScrollView
            className="mt-10 w-10/12 mx-auto"
            showsVerticalScrollIndicator={false}
          >
            {/* create event heading */}
            <Text className="text-3xl text-center font-semibold mb-5">
              Create Event
            </Text>

            {/* event name field */}
            <FormField
              title="Event Name*"
              placeholder="Event Name"
              value={form.name}
              isEditable={true}
              otherStyles={"mb-3"}
              handleChangeText={(e) => {
                setForm({
                  ...form,
                  name: e,
                });
              }}
            />

            {/* event location field */}
            <FormField
              title="Location"
              placeholder="Location"
              value={form.location}
              isEditable={true}
              otherStyles={"mb-3"}
              handleChangeText={(e) => {
                setForm({
                  ...form,
                  location: e,
                });
              }}
            />

            {/* description field */}
            <FormField
              title="Description"
              placeholder="Max 300 characters"
              isEditable={true}
              isMultiLine={true}
              value={form.description}
              maxLength={300}
              otherStyles="mb-5"
              handleChangeText={(e) => {
                setForm({
                  ...form,
                  description: e,
                });
              }}
            />

            {/* time fields */}
            <View className="mb-3 items-start">
              {/* select start time field */}
              <CustomButton
                handlePress={() => setShowStartTimePicker(true)}
                title="Select Start Time*"
                containerStyles="border border-primary w-full mb-2"
                textStyles="text-primary text-base py-2"
              />
              {showStartTimePicker && (
                <View className="flex-row mb-3 right-2">
                  <DateTimePicker
                    testID="startTimePicker"
                    value={tempStartTime}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    accentColor="#063970"
                    onChange={onChangeStartTime}
                  />
                  <CustomButton
                    title="OK"
                    handlePress={confirmStartTime}
                    containerStyles="border border-primary p-2 ml-2"
                    textStyles="text-primary"
                  />
                  <CustomButton
                    title="Clear"
                    handlePress={clearStartTime}
                    containerStyles="border border-darkGray p-2 ml-1"
                    textStyles="text-darkGray"
                  />
                </View>
              )}
              {form.startTime && (
                <Text>{`Selected Start Time: ${format(
                  form.startTime,
                  "PPp"
                )}`}</Text>
              )}
            </View>

            {/* select end time field */}
            <View className="mb-1">
              <CustomButton
                handlePress={() => setShowEndTimePicker(true)}
                title="Select End Time*"
                containerStyles="border border-primary w-full mb-3"
                textStyles="text-primary text-base py-2"
              />
              {showEndTimePicker && (
                <View className="flex-row mb-3 right-2">
                  <DateTimePicker
                    testID="endTimePicker"
                    value={tempEndTime}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    accentColor="#063970"
                    onChange={onChangeEndTime}
                  />
                  <CustomButton
                    title="OK"
                    handlePress={confirmEndTime}
                    containerStyles="border border-primary p-2 ml-2"
                    textStyles="text-primary"
                  />
                  <CustomButton
                    title="Clear"
                    handlePress={clearEndTime}
                    containerStyles="border border-darkGray p-2 ml-1"
                    textStyles="text-darkGray"
                  />
                </View>
              )}
              {form.endTime && (
                <Text>{`Selected End Time: ${format(
                  form.endTime,
                  "PPp"
                )}`}</Text>
              )}
            </View>

            <ImageUpload title="Event Banner" form={form} setForm={setForm} />

            {userRole === "Admin" ? (
              <View className="flex-row justify-between mb-5">
                <Text className="text-base">Make an org event</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#063970" }}
                  thumbColor={isEnabled ? "#FFF" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            ) : null}

            {/* create event button */}
            <CustomButton
              title="Create"
              containerStyles="bg-primary py-2 mb-20"
              textStyles="text-white text-base"
              handlePress={onCreatePress}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
