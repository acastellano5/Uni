import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import CustomButton from '../CustomButton'
import firestore, { onSnapshot, orderBy } from '@react-native-firebase/firestore'
import { collection, query } from '@react-native-firebase/firestore'
const ChatList = ({ filter }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [chats, setChats] = useState(null)

    useLayoutEffect(() => {
        const chatQuery = firestore().collection('Messages').orderBy('from', 'desc')

        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
            const chatRooms = querySnapshot.docs.map(doc => doc.data())
            setChats(chatRooms)
            setIsLoading(false)
        })
    }, [])


  return (
    <View>
        <ScrollView>
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        </ScrollView>

    </View>
  )
}
const MessageCard = () => {
    return(
       <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">

        </View>
        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-[#333] text-base font-semibold capitalize">
                Message

            </Text>
            <Text className="text-primaryText text-sm">
                Lorem
            </Text>
            <Text className="text-primary px-4 text-base font-semibold"> 27 min</Text>
            

        </View>

       </TouchableOpacity>
    )
}
export default ChatList

const styles = StyleSheet.create({})