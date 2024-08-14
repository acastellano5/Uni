import { Text, View, StyleSheet } from 'react-native'

const ChatMessageLeft = ({ message }) => {
  return (
    <View className="flex-row items-center justify-start mt-3" style={styles.messageLeft}>
      <View className="bg-lightYellow py-2 px-3 rounded-lg">
        <Text className="text-[#5e5e5e]">{message}</Text>
      </View>
    </View>
  )
}

const ChatMessageRight = ({ message }) => {
  return (
    <View className="flex-row items-center justify-end mt-3" style={styles.messageRight}>
      <View className="bg-primary py-2 px-3 rounded-lg">
        <Text className="text-white">{message}</Text>
      </View>
    </View>
  )
}

export { ChatMessageLeft, ChatMessageRight };

const styles = StyleSheet.create({
  messageLeft: {
    // max width, break words if necessary and add padding
    maxWidth: "80%",
    wordBreak: "break-word",
    borderRadius: 10
  },
  messageRight: {
    maxWidth: "80%",
    wordBreak: "break-word",
    borderRadius: 10,
    alignSelf: "flex-end"
  }
});