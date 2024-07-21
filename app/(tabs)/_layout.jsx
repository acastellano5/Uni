import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { router } from "expo-router";
import Home from "./home";
import Messages from "./messages";
import Groups from "./groups";
import EventsPage from "./events";
import Social from "./social";
import { Image, Text, View } from "react-native";
import { useGlobalContext } from "../../context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { icons } from "../../constants";
// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";

const TabIcon = ({ icon, color, name, focused, iconType }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      {iconType === "Ionicons" ? (
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
  const { loading, isLogged, isVerified } = useGlobalContext();
  if (!loading && isLogged && isVerified) {
  } else {
    router.replace("//index");
  }
  const Tab = createBottomTabNavigator();
  // if (!loading && !isLogged) router.replace('//index');

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#22c55e",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#FFF",
            borderTopWidth: 1,
            height: 96,
            paddingTop: 10,
          },
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
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
        <Tab.Screen
          name="Messaging"
          component={Messages}
          options={{
            tabBarLabel: "Home",
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
        <Tab.Screen
          name="Groups"
          component={Groups}
          options={{
            tabBarLabel: "Home",
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
        <Tab.Screen
          name="Events"
          component={EventsPage}
          options={{
            tabBarLabel: "Home",
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
        <Tab.Screen
          name="Social"
          component={Social}
          options={{
            tabBarLabel: "Home",
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
      </Tab.Navigator>
      <StatusBar backgroundColor="#000" style="light" />
    </>
  );
};

export default TabLayout;
