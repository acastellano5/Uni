import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getUserChatList, getChats } from '../../lib/useFirebase';


const ChatList = ({ filter }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState([]);
  const [chats, setChats] = useState([]);

  useLayoutEffect(() => {
    const load = async () => {
      setIsLoading(true);

      setChatList(await getUserChatList());
    };
    
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      console.log(chatList);
      setChats((await getChats(chatList, filter)));

      setIsLoading(false);
    };
    
    load();
  }, [chatList, filter]);

  useEffect(() => {
    console.log("asdf :")
    console.log(chats);
  }, [chats]);


  return (
    <View>
      <ScrollView>
        {isLoading ? (
            <ActivityIndicator size="large" color="#22c55e" />
          ) : (
            chats.map((chat) => (
              <Text>{JSON.stringify(chat)}</Text>
              // <MessageCard lastMsgData={chat.lastMsg.data} lastMsgTimestamp={chat.lastMsg.timestamp} />
            ))
        )}
      </ScrollView>

    </View>
  )
}
const MessageCard = ({ lastMsgData, lastMsgTimestamp }) => {
    return(
       <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">
        </View>
        
        <View className="flex-1 flex items-start justify-center ml-4">
          <Text className="text-[#333] text-base font-semibold capitalize">
              { lastMsgData }
          </Text>
          <Text className="text-primaryText text-sm">
              {/* {writer} */}
          </Text>
          <Text className="text-primary px-4 text-base font-semibold">
              { new Date(lastMsgTimestamp).toLocaleTimeString() }
          </Text>
        </View>

       </TouchableOpacity>
    )
}


export default ChatList;

const styles = StyleSheet.create({})