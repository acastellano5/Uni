import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React from "react";

const companyInfo = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView className="w-11/12 mx-auto">
          <Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/meta-logo-facebook-rebrand-concept-icon-blue-color-social-media-new-name-text-kyiv-ukraine-october-233509975.jpg",
            }}
            className="mx-auto mb-3 object-cover"
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />

          <Text className="text-3xl font-semibold text-center">Microsoft</Text>
          <Text className="text-lg font-semibold text-gray-400 text-center">
            Contact: Andrew Castellano
          </Text>

          <Text className="text-base text-center mt-5">
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

export default companyInfo;
