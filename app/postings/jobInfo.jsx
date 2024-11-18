import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React from "react";

const jobInfo = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView className="w-11/12 mx-auto">
          <Text className="text-3xl font-semibold">Software Engineer</Text>
          <Text className="text-2xl font-semibold">Microsoft</Text>
          <Text className="text-xl font-semibold">San Francsico, CA</Text>
          <Text className="text-lg font-semibold text-gray-400">Posted by Andrew Castellano</Text>

          <Text className="text-base font-semibold mt-5 mb-3">Description</Text>
          <Text className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            fugit accusantium facilis, nulla accusamus quae quam distinctio,
            impedit ipsa quibusdam, necessitatibus deleniti atque incidunt
            cumque temporibus sunt. Quo, quam eligendi! Culpa deserunt hic
            obcaecati, enim adipisci, dolorum molestiae ullam rem velit aut sint
            iusto dolores. Eaque, iusto et vel consequatur fuga esse dolorem cum
            placeat similique nam sit dicta illo. Suscipit reprehenderit dolorem
            sint molestias quae fugiat quia ducimus debitis nisi atque quidem ad
            dolore modi, quasi aliquid, culpa eum obcaecati officiis rerum,
            recusandae dolorum excepturi similique fuga in. Quaerat!
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default jobInfo;
