// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React from "react";
// import images from "@/constants/images";
// import icons from "@/constants/icons";

// interface Props {
//   onPress?: () => void;
// }

// export const FeaturedCard = ({ onPress }: Props) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="flex flex-col items-start justify-start w-60 h-80 rounded-xl shadow"
//     >
//       <Image source={images.japan} className="size-full rounded-2xl" />
//       <Image
//         source={images.cardGradient}
//         className="size-full absolute rounded-2xl"
//       />

//       <View className="absolute top-5 right-5 flex flex-row gap-1 items-center bg-white/90 px-3 py-1 rounded-full">
//         <Image source={icons.star} className="size-3.5" />
//         <Text className="text-sm font-rubik-bold text-primary-300">5.0</Text>
//       </View>

//       <View className="absolute inset-x-5 bottom-5 left-5 flex flex-col items-start gap-1">
//         <View className="flex flex-col items-start">
//           <Text
//             className="text-xl font-rubik-extrabold text-white"
//             numberOfLines={1}
//           >
//             Modern Apartment
//           </Text>
//           <Text className="text-base font-rubik text-white">
//             22 W 15th St, New York
//           </Text>
//         </View>

//         <View className="flex items-center flex-row justify-between w-full">
//           <Text className="text-xl font-rubik-extrabold text-white">
//             $2,500
//           </Text>
//           <TouchableOpacity className="flex flex-row items-center bg-black/50 backdrop-blur-md rounded-full p-2">
//             <Image source={icons.heart} className="size-5" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export const Card = ({ onPress }: Props) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="flex-1 w-full mt-4 p-4 rounded-xl bg-white  border border-primary-300/20 shadow-sm relative"
//     >
//       <View className="flex flex-col gap-2">
//         <View>
//           <Image
//             source={images.newYork}
//             className="size-full h-40 rounded-lg"
//           />

//           <View className="absolute top-3 right-3 flex flex-row gap-1 items-center bg-white/90 px-3 py-1 rounded-full">
//             <Image source={icons.star} className="size-3.5" />
//             <Text className="text-sm font-rubik-bold text-primary-300">
//               5.0
//             </Text>
//           </View>
//         </View>

//         <View className="flex flex-col items-start gap-1">
//           <View className="flex flex-col items-start">
//             <Text
//               className="text-xl font-rubik-extrabold text-black-300"
//               numberOfLines={1}
//             >
//               Modern Apartment
//             </Text>
//             <Text className="text-base font-rubik text-black-200">
//               22 W 15th St, New York
//             </Text>
//           </View>

//           <View className="flex items-center flex-row justify-between w-full">
//             <Text className="text-xl font-rubik-extrabold text-primary-300">
//               $2,500
//             </Text>
//             <TouchableOpacity className="flex flex-row items-center bg-primary-300/50 backdrop-blur-md rounded-full p-2">
//               <Image source={icons.heart} className="size-5" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };


import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
}

export const Card = ({ onPress }: Props) => {
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
        className="mt-4 p-4 rounded-xl bg-white border border-primary-300/20 shadow-lg relative overflow-hidden"
      >
        <View className="flex flex-col gap-2">
          <View>
            <Image
              source={images.newYork}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />

            <View className="absolute top-3 right-3 flex flex-row gap-1 items-center bg-white/90 px-3 py-1 rounded-full shadow-sm">
              <Image source={icons.star} className="size-3.5" />
              <Text className="text-sm font-rubik-bold text-primary-300">
                5.0
              </Text>
            </View>
          </View>

          <View className="flex flex-col items-start gap-1">
            <View className="flex flex-col items-start">
              <Text
                className="text-xl font-rubik-extrabold text-black-300"
                numberOfLines={1}
              >
                Modern Apartment
              </Text>
              <Text className="text-base font-rubik text-black-200/90">
                22 W 15th St, New York
              </Text>
            </View>

            <View className="flex items-center flex-row justify-between w-full">
              <Text className="text-xl font-rubik-extrabold text-primary-300">
                $2,500
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