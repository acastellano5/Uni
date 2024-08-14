import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Image, RefreshControl } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getUserChatList, getChatPreviews, sendChatMessage } from '../../lib/useFirebase';
import { FontAwesome, Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import logo from "../../assets/images/logo.png";

const ChatList = ({ filter }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState([]);
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const load = async () => {
      for (var chat of chats) await chat.unsubscribe();
      setChatList(await getUserChatList());
    };
    
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      
      // sort by timestamp value
      var newChats = (await getChatPreviews(chatList, reloadChatPreview)).sort((a, b) => (a.lastMsg && b.lastMsg) ? b.lastMsg.timestamp - a.lastMsg.timestamp : 0);
      setChats(newChats);
      

      setIsLoading(false);
      setRefreshing(false);
    };
    
    load();
  }, [chatList]);

  const onRefresh = React.useCallback(async () => {
    for (var chat of chats) await chat.unsubscribe();
    setChatList(await getUserChatList());
  });

  const reloadChatPreview = async (id, newMsg) => {
    setChats((prevChats) => {
      const newChats = [...prevChats];
      for (let i = 0; i < newChats.length; i++) {
        if (newChats[i].id === id) newChats[i].lastMsg = newMsg;
      }
      return newChats.sort((a, b) => (a.lastMsg && b.lastMsg) ? b.lastMsg.timestamp - a.lastMsg.timestamp : 0);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      for (var chat of chats) chat.unsubscribe();
    });

    return unsubscribe;
  }, []);


  return (
    <View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {isLoading ? (
            <View>
              <View style={{ height: 120 }} />
              <ActivityIndicator size="large" color="#063970" />
            </View>
          ) : (
            <View>
              {/* <View className="flex items-center justify-center mt-2 mb-[-20px]">
                <Text className="text-[#333] text-sm text-center text-[#888888] mb-3 mt-1">
                  Swipe down to refresh
                </Text>
              </View> */}
              {/* New message */}
              <NewMessageCard filter={filter} />
              {filter == "DMs" ? <AIChatMessageCard lastMsgData={"Hello! How can I help you today?"}></AIChatMessageCard> : null}
              {(chats.filter(chat => chat.type == filter).length > 0) ? chats.map((chat) => (
                (chat.type == filter) ? (
                  <View key={chat.id}>
                    <MessageCard lastMsgData={chat.lastMsg.msg} lastMsgTimestamp={chat.lastMsg.timestamp} author={chat.lastMsg.author} users={chat.users} chatID={chat.id} />
                  </View>
                ) : null
              )) : (
                <View className="flex items-center justify-center mt-10">
                  <Text className="text-[#333] text-lg font-semibold">Your {filter} will appear here.</Text>
                </View>
              )}
              <View style={{ height: 120 }} />
            </View>
          )}
      </ScrollView>
    </View>
  )
}

const MessageCard = ({ lastMsgData, lastMsgTimestamp, author, users, chatID }) => {
  const formatTimestamp = (timestamp) => {
    timestamp = timestamp.toMillis();
    const now = Date.now();
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;
    const msInMinute = 60 * 1000;
    const today = new Date(now).setHours(0, 0, 0, 0);

    const date = new Date(timestamp);
    const diffInMs = now - timestamp;
    const diffInMinutes = Math.floor(diffInMs / msInMinute);
    const diffInHours = Math.floor(diffInMs / msInHour);
    const isToday = timestamp >= today;

    if (diffInMs <= 5 * msInHour) {
      if (diffInMinutes < 1) {
        return "Now";
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else {
        return `${diffInHours}h ago`;
      }
    } else if (isToday) {
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
  };


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
            { `${(author !== "You") ? `${author}, ` : ""}${users.filter((val) => { return (val !== author && val !== "You") }).join(", ")}` }
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

const NewMessageCard = ({ filter }) => {
  return(
     <TouchableOpacity className="w-full flex-row items-center justify-start py-2 mt-0" activeOpacity={.6} onPress={() => router.push({
        pathname: "/newMessage",
        params: { filter: filter }
     })}>
      <View className="rounded-full flex items-center border-2 border-primary ml-5 mr-1 justify-center bg-[#000000] h-[50px] w-[50px]">
        <Feather name="message-circle" size={30} color="white" />
      </View>
      
      <View className="flex-1 flex items-start justify-center ml-4">
        <Text className="text-[#333] text-base font-semibold capitalize mr-5" numberOfLines={1}>
          New Message...
        </Text>
      </View>
     </TouchableOpacity>
  )
}


export default ChatList;

const styles = StyleSheet.create({})