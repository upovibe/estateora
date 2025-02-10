import { View, Text, Image, TouchableOpacity, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}
export const FeaturedCard = ({item: {name, image, rating, address, price},  onPress }: Props) => {
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
        activeOpacity={0.9}
        className="flex-1 flex-col items-start justify-start w-60 h-80 rounded-xl shadow-lg overflow-hidden"
      >
        <Image source={{ uri: image }} className="size-full rounded-2xl" resizeMode="cover" />
        <Image
          source={images.cardGradient}
          className="size-full absolute rounded-2xl"
          resizeMode="cover"
        />

        <View className="absolute top-5 right-5 flex flex-row gap-1 items-center bg-white/90 px-3 py-1 rounded-full shadow-sm">
          <Image source={icons.star} className="size-3.5" />
          <Text className="text-sm font-rubik-bold text-primary-300">{rating}</Text>
        </View>

        <View className="absolute inset-x-5 bottom-5 left-5 flex flex-col items-start gap-1">
          <View className="flex flex-col items-start">
            <Text
              className="text-2xl font-rubik-extrabold text-white"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text className="text-base font-rubik text-white/90">
            {address}
            </Text>
          </View>

          <View className="flex items-center flex-row justify-between w-full">
            <Text className="text-2xl font-rubik-extrabold text-white">
            ${price}
            </Text>
            <TouchableOpacity className="flex flex-row items-center bg-black/50 backdrop-blur-md rounded-full p-2 shadow-lg">
              <Image source={icons.heart} className="size-5" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};