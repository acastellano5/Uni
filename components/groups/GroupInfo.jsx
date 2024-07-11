import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import EventIcon from "../events/EventIcon"
import PostSection from '../profile/PostSection'
import { getPostByGroup } from "../../lib/useFirebase"
import { useGlobalContext } from "../../context/globalProvider"

const GroupInfo = ({ group }) => {

  const { orgId } = useGlobalContext()
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const fetchGroupPosts = async () => {
      let groupPosts = await getPostByGroup(group.id, orgId)
      groupPosts = groupPosts.map((post) => {
        return {
          ...post,
          type: "group",
          authorName: group.name,
          authorId: group.id,
          authorType: group.category,
        };
      })

      setPosts(groupPosts)
    }
    fetchGroupPosts()
  }, [group])


  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <Text className="text-base font-semibold mb-2">Description</Text>


      <View className="bg-lightGreen mb-3">
        <Text className="text-[#5e5e5e] p-2 rounded-lg">{group.description}</Text>
      </View>



      <PostSection posts={posts}/>


      {/* maybe switch to posts instead of events section? or both? */}
      {/* <Text className="text-base font-semibold mb-2 pl-1">Events</Text>

        <View className="flex-row flex-wrap">
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
            <EventIcon/>
        </View> */}


    </View>
  )
}

export default GroupInfo