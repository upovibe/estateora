import SearchBar from "@/components/SearchBar";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between my-5">
          <View className="flex flex-row items-center gap-2">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start">
              <Text className="text-sm font-rubik text-black/50">
                Good Morning
              </Text>
              <Text className="text-base text-gray-90 font-rubik-medium">
                User
              </Text>
            </View>
          </View>
          <TouchableOpacity className="flex flex-row items-center bg-gray-200 rounded-full p-2">
            <Image source={icons.bell} className="size-5" />
          </TouchableOpacity>
        </View>
        <SearchBar/>
      </View>
    </SafeAreaView>
  );
}
