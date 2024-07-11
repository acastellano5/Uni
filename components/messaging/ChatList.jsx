import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import CustomButton from '../CustomButton'
import { handleMsg,send } from '../../lib/messaging/utils'
import firestore, { onSnapshot, orderBy } from '@react-native-firebase/firestore'
import { collection, query } from '@react-native-firebase/firestore'
const postsLoading = false
const refreshing = true
const ChatList = ({ filter }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [chats, setChats] = useState([]);
    console.log(chats.length);

    useLayoutEffect(() => {
        const chatQuery = firestore().collection('Messages').orderBy('from', 'desc')

        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
            const chatRooms = querySnapshot.docs.map(doc => doc.data())
            
            var socket;
            socket = new WebSocket("ws://localhost:8080");
            socket.onopen = function () {
            const chatData =socket.send(JSON.stringify({
                "username": "nate",
                "key": "key1",
                "type": "getChats"
                })

            
            )
              };
            
            socket.onmessage = function (event) {
                var message = event.data;
                console.log(JSON.parse(message));
                setChats(JSON.parse(message))
              };
        
              socket.onclose = function () {
                setTimeout(connectWebSocket, 2000);
              };
              
            const test = handleMsg(  {  "username": "test", "key": "key1", "type": "getChats"})
            console.log(test);
            setChats(chatRooms)
            setIsLoading(false)
        })
    }, [])


  return (
    <View>
        <ScrollView>
        {!refreshing && postsLoading ? (
            <ActivityIndicator size="large" color="#22c55e" />
          ) : (
            chats.map((chat, index) => (
              <MessageCard
                message={chat}
                writer="w-10/12 mx-auto mb-10"
              />
            ))
          )}
        </ScrollView>

    </View>
  )
}
const MessageCard = ({message,writer}) => {
    return(
       <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">

        </View>
        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-[#333] text-base font-semibold capitalize">
                {message}

            </Text>
            <Text className="text-primaryText text-sm">
                {writer}
            </Text>
            <Text className="text-primary px-4 text-base font-semibold"> 27 min</Text>
            

        </View>

       </TouchableOpacity>
    )
}
export default ChatList

const styles = StyleSheet.create({})