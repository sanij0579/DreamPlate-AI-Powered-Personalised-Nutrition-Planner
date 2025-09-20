// index.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Colors from "./color"; // centralized color palette

export default function Index() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      Alert.alert("OTP Sent", "A 4-digit OTP has been sent to your number.");
    }, 1500); 
  };

  const verifyOtp = () => {
    if (otp === "1234") { 
      router.replace("/(tabs)/home"); 
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: Colors.background }}>
      
      <Text className="text-3xl font-bold mb-6" style={{ color: Colors.primaryDark }}>
       DreamPlate App
      </Text>

      <Text className="text-center mb-4 text-base" style={{ color: Colors.textSecondary }}>
        Get personalized meal plans based on your daily food intake and physical activity.
      </Text>

      {step === "phone" ? (
        <>
          <TextInput
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            className="w-full px-4 py-3 mb-4 rounded-lg"
            style={{ backgroundColor: Colors.cardBackground, color: Colors.textPrimary }}
          />

          <TouchableOpacity
            className="w-full py-3 rounded-lg"
            style={{ backgroundColor: Colors.primary, alignItems: "center" }}
            onPress={sendOtp}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textWhite} />
            ) : (
              <Text className="text-white font-bold">Send OTP</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            className="w-full px-4 py-3 mb-4 rounded-lg"
            style={{ backgroundColor: Colors.cardBackground, color: Colors.textPrimary }}
          />

          <TouchableOpacity
            className="w-full py-3 rounded-lg mb-2"
            style={{ backgroundColor: Colors.primary, alignItems: "center" }}
            onPress={verifyOtp}
          >
            <Text className="text-white font-bold">Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-3 rounded-lg"
            style={{ borderColor: Colors.secondary, borderWidth: 1, alignItems: "center" }}
            onPress={() => setStep("phone")}
          >
            <Text style={{ color: Colors.secondaryDark, fontWeight: "bold" }}>Edit Phone Number</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        className="mt-6"
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={{ color: Colors.textPrimary, textDecorationLine: "underline" }}>Skip to Home</Text>
      </TouchableOpacity>
    </View>
  );
}