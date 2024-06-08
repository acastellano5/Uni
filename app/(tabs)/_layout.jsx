import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalProvider, { useGlobalContext } from "../../context/globalProvider";
// import { icons } from "../../constants";
// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ icon, color, name, focused }) => {

  return (
    <View className="flex items-center justify-center gap-2">

      <Ionicons name={`${icon}`} size={24} color={`${color}`} />

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

  // if (!loading && !isLogged) router.replace('//index');

  return (
    <>
      <GlobalProvider>
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
                  color={color}
                  name="Messages"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="clubs"
            options={{
              title: "Clubs",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon="library"
                  color={color}
                  name="Clubs"
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
                  color={color}
                  name="Social"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>

        <StatusBar backgroundColor="#000" style="light" />
      </GlobalProvider>
    </>
  );
};

export default TabLayout;
