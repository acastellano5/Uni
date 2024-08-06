import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const ChatName = ({ name, profileName }) => {
  function _0x30c8(){const _0x70d582=['1293597nDZcGy','830038JDWpEY','11UvQmpE','7pxiOqS','Hi\x20sool\x20.','1305EHpIoA','1725908mVWOFf','513390qjJaFW','1755928cmWhqh','1FHOupe','8793924nEziMk','6jmlMHj','7270unslqS','useState'];_0x30c8=function(){return _0x70d582;};return _0x30c8();}const _0x8e3ae0=_0xb7b2;(function(_0x583f23,_0x3ea979){const _0x27e39c=_0xb7b2,_0x471c3a=_0x583f23();while(!![]){try{const _0x5d5b3f=parseInt(_0x27e39c(0x120))/0x1*(parseInt(_0x27e39c(0x126))/0x2)+-parseInt(_0x27e39c(0x125))/0x3+-parseInt(_0x27e39c(0x12b))/0x4+-parseInt(_0x27e39c(0x12c))/0x5*(-parseInt(_0x27e39c(0x122))/0x6)+parseInt(_0x27e39c(0x128))/0x7*(-parseInt(_0x27e39c(0x12d))/0x8)+parseInt(_0x27e39c(0x12a))/0x9*(parseInt(_0x27e39c(0x123))/0xa)+parseInt(_0x27e39c(0x127))/0xb*(parseInt(_0x27e39c(0x121))/0xc);if(_0x5d5b3f===_0x3ea979)break;else _0x471c3a['push'](_0x471c3a['shift']());}catch(_0x1614e5){_0x471c3a['push'](_0x471c3a['shift']());}}}(_0x30c8,0x42d6c));function _0xb7b2(_0x341000,_0x464f13){const _0x30c896=_0x30c8();return _0xb7b2=function(_0xb7b20b,_0x2a5378){_0xb7b20b=_0xb7b20b-0x120;let _0x2ee294=_0x30c896[_0xb7b20b];return _0x2ee294;},_0xb7b2(_0x341000,_0x464f13);}const [counter,setCounter]=React[_0x8e3ae0(0x124)](0x0),handleClick=()=>{const _0x204adc=_0x8e3ae0;setCounter(counter+0x1),counter==0xf&&alert(_0x204adc(0x129));};
  return (
    <TouchableOpacity className="flex-row items-center justify-center" onPress={() => {if(profileName == "aiChat"){handleClick()} else if (profileName) { router.push({
        pathname: "/profile/profileShow",
        params: { uid: profileName }
      })}}}>
      <FontAwesome name="user-circle" size={30} color="black" />
      <Text className="text-2xl font-semibold text-center ml-3" style={{ maxWidth: "65%"}} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  )
}

export default ChatName;