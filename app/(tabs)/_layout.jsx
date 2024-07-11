import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { useGlobalContext } from "../../context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
// import { icons } from "../../constants";
// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from '@expo/vector-icons';

const TabIcon = ({ icon, color, name, focused, iconType }) => {

  return (
    <View className="flex items-center justify-center gap-2">
      { iconType === "Ionicons" ? (
        <Ionicons name={`${icon}`} size={24} color={`${color}`} />
      ) : (
        <SimpleLineIcons name={`${icon}`} size={24} color={`${color}`} />
      )}

      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const {loading, isLogged, isVerified} = useGlobalContext();
  if (!loading && isLogged && isVerified){
  
  } else {
    router.replace("//index");

  
  }

  // if (!loading && !isLogged) router.replace('//index');

  return (
    <>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#22c55e",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#FFF",
              borderTopWidth: 1,
              height: 96,
              paddingTop: 10,

              // shadow styling
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="home"
                  iconType="Ionicons"
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="messages"
            options={{
              title: "Messages",
              headerShown: false,

              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="chatbubble"
                  iconType="Ionicons"
                  color={color}
                  name="Messages"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="groups"
            options={{
              title: "Groups",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="organization"
                  iconType="SimpleLineIcons"
                  color={color}
                  name="Groups"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="events"
            options={{
              title: "Events",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="calendar-sharp"
                  iconType="Ionicons"
                  color={color}
                  name="Events"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="social"
            options={{
              title: "Social",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="people-sharp"
                  iconType="Ionicons"
                  color={color}
                  name="Social"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>

        <StatusBar backgroundColor="#000" style="light" />
    </>
  );
};

export default TabLayout;
