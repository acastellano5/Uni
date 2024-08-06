import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getUserChatList, getChats } from '../../lib/useFirebase';
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import logo from "../../assets/images/logo.png";

const ChatList = ({ filter }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState([]);
  const [chats, setChats] = useState([]);

  useLayoutEffect(() => {
    const load = async () => {
      setChatList(
        await getUserChatList()
        .catch((err) => {
          console.error(err);
          return [];
        })
      );
    };
    
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setChats((await getChats(chatList, filter)));
      setIsLoading(false);
    };
    
    load();
  }, [chatList, filter]);


  return (
    <View>
      <ScrollView>
        {isLoading ? (
            <View>
              <View style={{ height: 120 }} />
              <ActivityIndicator size="large" color="#22c55e" />
            </View>
          ) : (
            <View>
            {filter == "DMs" ? <AIChatMessageCard lastMsgData={"Hello! How can I help you today?"}></AIChatMessageCard> : null}
            {(chats.length > 0) ? chats.map((chat) => (
              <View>
                <MessageCard lastMsgData={chat.lastMsg.msg} lastMsgTimestamp={chat.lastMsg.timestamp} author={chat.lastMsg.author} users={chat.users} chatID={chat.id} />
                {/* Placeholder at bottom, because of menu */}
                <View style={{ height: 120 }} />
              </View>
            )) : (
              <View className="flex items-center justify-center mt-10">
                <Text className="text-[#333] text-lg font-semibold">Your {filter} will appear here.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

    </View>
  )
}

const MessageCard = ({ lastMsgData, lastMsgTimestamp, author, users, chatID }) => {
  const formatTimestamp = (timestamp) =>  {
    const now = Date.now();
    const msInDay = 24 * 60 * 60 * 1000;
    const today = new Date(now).setHours(0, 0, 0, 0);
    
    const date = new Date(timestamp);
    const isToday = timestamp >= today;
    
    if (isToday) {
      // Time formatting (12-hour format)
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12) || 12; // Convert 24-hour time to 12-hour time
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${formattedHours}:${formattedMinutes} ${period}`;
    } else {
      // Date formatting (MM/DD/YY)
      const month = date.getMonth() + 1; // Months are zero-based
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    }
  }

  return(
     <TouchableOpacity className="w-full flex-row items-center justify-start py-2 mt-2" activeOpacity={.6} onPress={() => router.push({
        pathname: "/chat",
        params: { chatID: chatID }
     })}>
      <View className="rounded-full flex items-center border-2 border-primary ml-5 mr-1 justify-center">
        <FontAwesome name="user-circle" size={50} color="black" />
      </View>
      
      <View className="flex-1 flex items-start justify-center ml-4">
        <Text className="text-[#333] text-base font-semibold capitalize mr-4" numberOfLines={1}>
            { `${author}, ${users.filter((val) => { return val !== author }).join(", ")}` }
        </Text>
        
        <View className="w-full flex-row justify-between items-center">
          <Text className="text-primaryText text-sm flex-1 mr-4" numberOfLines={1}>
            { lastMsgData }
          </Text>
          <Text className="text-primary text-sm font-semibold mr-3" numberOfLines={1}>
            { formatTimestamp(lastMsgTimestamp) }
          </Text>
        </View>
      </View>
     </TouchableOpacity>
  )
}

const AIChatMessageCard = ({}) => {
  const shortStr = (str, len) => {
    return (str.length > len) ? str.slice(0, len).trim() + "..." : str;
  }
  return(
     <TouchableOpacity className="w-full flex-row items-center justify-start py-2 mt-2" activeOpacity={.6} onPress={() => router.push("/aiChat")}>
      <View className="rounded-full flex items-center border-2 border-primary ml-5 mr-1 justify-center bg-[#000000] h-[50px] w-[50px]">
        <Image source={logo} className="h-[30px] w-[30px]" />
      </View>
      
      <View className="flex-1 flex items-start justify-center ml-4">
        <Text className="text-[#333] text-base font-semibold capitalize mr-5" numberOfLines={1}>
          AI Assistant
        </Text>
        
        <View className="w-full flex-row justify-between items-center">
          <Text className="text-primaryText text-sm flex-1 mr-4" numberOfLines={1}>
            Hello! How can I help you today?
          </Text>
          <Text className="text-primary text-sm font-semibold mr-3" numberOfLines={1}>
            Now
          </Text>
        </View>
      </View>
     </TouchableOpacity>
  )
}


export default ChatList;

const styles = StyleSheet.create({})