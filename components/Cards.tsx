import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const Card = ({
  item: { name, image, rating, address, price },
  onPress,
}: Props) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width: "48%" }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className="mt-4 p-4 rounded-xl bg-white border border-primary-300/20 relative overflow-hidden"
      >
        <View className="flex flex-col gap-2">
          <Image
            source={{ uri: image }}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute top-3 right-3 flex flex-row gap-1 items-center bg-white/90 px-3 py-1 rounded-full shadow-sm">
            <Image source={icons.star} className="size-3.5" />
            <Text className="text-sm font-rubik-bold text-primary-300">
              {rating}
            </Text>
          </View>
          <View className="flex flex-col items-start gap-1">
            <Text className="text-xl font-rubik-extrabold text-black-300" numberOfLines={1}>
              {name}
            </Text>
            <Text className="text-base font-rubik text-black-200/90">
              {address}
            </Text>
            <View className="flex items-center flex-row justify-between w-full">
              <Text className="text-xl font-rubik-extrabold text-primary-300">
                ${price}
              </Text>
              <TouchableOpacity className="flex flex-row items-center bg-primary-300/50 backdrop-blur-md rounded-full p-2 shadow-lg">
                <Image source={icons.heart} className="size-5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const HorizontalCard = ({ item: { name, image, rating, address, price }, onPress }: Props) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="flex w-full mt-4 p-3 rounded-2xl bg-white border border-primary-300/20 relative"
      >
        <View className="flex flex-row gap-4">
          <View className="flex flex-col items-start relative">
            <Image
              source={{ uri: image }}
              className="size-28 rounded-lg"
            />
            <View className="flex absolute top-2 right-2 flex-row gap-1 items-center bg-white/90 px-1.5 py-0.5 rounded-full">
              <Image source={icons.star} className="size-3.5" />
              <Text className="text-sm font-rubik-bold text-primary-300">
                {rating}
              </Text>
            </View>
          </View>

          <View className="flex flex-col items-start gap-1">
            <Text className="text-xl font-rubik-extrabold text-black-300" numberOfLines={1}>
              {name}
            </Text>
            <Text className="text-base font-rubik text-black-200">
              {address}
            </Text>
            <View className="flex items-center flex-row justify-between w-full">
              <Text className="text-xl font-rubik-extrabold text-primary-300">
                ${price}
              </Text>
              <TouchableOpacity className="flex flex-row items-center bg-primary-300/50 backdrop-blur-md rounded-full p-2">
                <Image source={icons.heart} className="size-5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
