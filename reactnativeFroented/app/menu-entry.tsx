import { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import Colors from "./color";

const foodNutrition: Record<string, { category: string }> = {
  Chapati: { category: "Protein" },
  Rice: { category: "Carb" },
  Puri: { category: "Carb" },
  Paratha: { category: "Carb" },
  Dal: { category: "Protein" },
  Paneer: { category: "Protein" },
  Chole: { category: "Protein" },
  Sambar: { category: "Protein" },
  Salad: { category: "Fiber" },
  Lauki: { category: "Fiber" },
  Matar: { category: "Fiber" },
  Baingan: { category: "Fiber" },
  "Aloo Tamatar": { category: "Fiber" },
  "Aloo Matar": { category: "Fiber" },
  "Baingan Aloo": { category: "Fiber" },
  Upma: { category: "Fiber" },
  Poha: { category: "High protein" },
  Idli: { category: "Carb" },
  Tea: { category: "Drink" },
  Milk: { category: "Protein" },
  Banana: { category: "Fruit" },
  "Roasted Chana": { category: "Protein" },
  Samosa: { category: "Carb" },
  Pakora: { category: "Carb" },
  Burger: { category: "Carb" },
  Pizza: { category: "Carb" },
  "French Fries": { category: "Carb" },
  Chocolate: { category: "Carb" },
  "Ice Cream": { category: "Carb" },
  "Soft Drink": { category: "Carb" },
  Biscuits: { category: "Carb" },
  "Noodles (instant)": { category: "Carb" },
  Chips: { category: "Carb" },
  Candy: { category: "Carb" }
};

const menuOptions = {
  Breakfast: ["Poha + Tea", "Upma + Milk", "Idli + Sambar", "Paratha + Yogurt"],
  Lunch: [
    "2 Chapati + Dal + Paneer",
    "2 Chapati + Chole + Rice",
    "2 Chapati + Dal + Bhindi",
    "2 Chapati + Paneer Curry + Rice",
    "2 Chapati + Chole + Rice",
    "2 Chapati + Dal + Baingan"
  ],
  Snacks: ["Banana", "Roasted Chana", "Milk + Biscuit", "Samosa", "Pakora", "Chocolate"],
  Dinner: [
    "1 Chapati + Lauki Matar + Salad",
    "2 Chapati + Aloo Tamatar + Salad",
    "1 Chapati + Baingan Aloo + Salad",
    "2 Chapati + Paneer Curry + Salad",
    "1 Chapati + Aloo Matar + Salad"
  ]
};

const activityLevels = ["Sedentary", "Light", "Moderate", "High"];

const getFoodColor = (food: string) => {
  const mainFood = food.split("+")[0].trim();
  const category = foodNutrition[mainFood]?.category || "Carb";
  switch (category) {
    case "Protein":
      return Colors.protein;
    case "Carb":
      return Colors.carb;
    case "Fiber":
      return Colors.fiber;
    case "Fruit":
      return Colors.fruit;
    case "Drink":
      return Colors.drink;
    case "High protein":
      return Colors.highProtein;
    default:
      return Colors.textPrimary;
  }
};

export default function MenuEntry() {
  const router = useRouter();

  const [breakfast, setBreakfast] = useState(menuOptions.Breakfast[0]);
  const [lunch, setLunch] = useState(menuOptions.Lunch[0]);
  const [snacks, setSnacks] = useState(menuOptions.Snacks[0]);
  const [dinner, setDinner] = useState(menuOptions.Dinner[0]);
  const [activity, setActivity] = useState(activityLevels[0]);

  const handleSubmit = () => {
    router.push({
      pathname: "./suggestions",
      params: { breakfast, lunch, snacks, dinner, activity }
    });
  };

  const renderPicker = (label: string, selectedValue: string, onValueChange: (val: string) => void, options: string[]) => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ color: getFoodColor(selectedValue), height: 50 }}
        >
          {options.map((item, idx) => (
            <Picker.Item
              key={idx}
              label={item}
              value={item}
              color={getFoodColor(item)}
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select Today's Mess Menu</Text>

      {renderPicker("Breakfast:", breakfast, setBreakfast, menuOptions.Breakfast)}
      {renderPicker("Lunch:", lunch, setLunch, menuOptions.Lunch)}
      {renderPicker("Snacks:", snacks, setSnacks, menuOptions.Snacks)}
      {renderPicker("Dinner:", dinner, setDinner, menuOptions.Dinner)}

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Physical Activity Level:</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={activity} onValueChange={setActivity} style={{ height: 50 }}>
            {activityLevels.map((item, idx) => (
              <Picker.Item key={idx} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Get Suggestions" onPress={handleSubmit} color={Colors.primary} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: Colors.textPrimary
  },
  pickerContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.textPrimary
  },
  pickerWrapper: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  buttonWrapper: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 12,
    overflow: "hidden"
  }
});