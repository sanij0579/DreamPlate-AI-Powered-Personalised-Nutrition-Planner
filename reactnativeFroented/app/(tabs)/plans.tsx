// app/(tabs)/plan.tsx
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Plan() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Navigate to menu-entry relative to this tab layout
      router.push("/menu-entry");
    }
  }, [mounted]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-lg font-bold text-gray-700">Loading...</Text>
    </View>
  );
}