import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../BackHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditInfo from './EditInfo'
import EditMembers from './EditMembers'
import TabsDisplay from '../TabsDisplay'

const ManageGroup = ({group, setGroupContent}) => {

    const tabs = ["Info", "Members"]
    const [ activeTab, setActiveTab ] = useState(tabs[0])
    const [ groupInfo, setGroupInfo ] = useState({
        category: group.category,
        description: group.description,
        image: group.image,
        name: group.name
    })


    useEffect(() => {
        console.log(groupInfo)
    }, [groupInfo])
    const displayContent = () => {
        switch (activeTab) {
            case "Info":
                return <EditInfo group={group} groupInfo={groupInfo} setGroupInfo={setGroupInfo}/>
        
            case "Members":
            return <EditMembers group={group}/>
            
            default:
                return <Text>It doesn't work</Text>
        }
    }

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" displayAI={false} onBackPress={() => setGroupContent("show group")}/>
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
          <View className="w-10/12 mx-auto">
            <Text className="text-3xl text-center font-semibold mb-2">
              Manage Group
            </Text>

            <TabsDisplay
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            containerStyles="w-3/6 p-2"
            tabBarStyles="mb-3"
            textStyles="text-base"
            />

            {displayContent()}
            
          </View>
      </View>
    </SafeAreaView>
  )
}

export default ManageGroup

const styles = StyleSheet.create({})