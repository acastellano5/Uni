import { Tabs } from "expo-router";

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="messages" />
            <Tabs.Screen name="clubs" />
            <Tabs.Screen name="events" />
            <Tabs.Screen name="social" />

        </Tabs>
    )
}