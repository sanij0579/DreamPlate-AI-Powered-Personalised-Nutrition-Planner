import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
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
  Candy: { category: "Carb" },
};

const activitySuggestion = (activity: string) => {
  switch (activity) {
    case "Sedentary":
      return "Walk 20 min after lunch + morning stretching";
    case "Light":
      return "Walk 30 min + light yoga in evening";
    case "Moderate":
      return "Exercise 1 hr (cardio + strength)";
    case "High":
      return "Intense training + recovery stretches";
    default:
      return "Maintain light activity";
  }
};

const cleanItem = (item: string) => item.replace(/^\d+\s*/, "");

const categoryColors: Record<string, string> = {
  Protein: Colors.protein,
  Carb: Colors.carb,
  Fiber: Colors.fiber,
  Drink: Colors.drink,
  Fruit: Colors.fruit,
  "High protein": Colors.highProtein,
};

export default function Suggestions() {
  const { breakfast, lunch, snacks, dinner, activity } =
    useLocalSearchParams() as {
      breakfast: string;
      lunch: string;
      snacks: string;
      dinner: string;
      activity: string;
    };

  const userGoal = "weight_loss";

  const analyzeMeal = (meal: string) => {
    const items = meal.split("+").map((i) => i.trim());
    return items.map((item) => {
      const cleanedItem = cleanItem(item);
      const nutrition = foodNutrition[cleanedItem];
      if (!nutrition)
        return { text: `Unknown item: ${item}`, category: "Carb" };
      let suggestion = "";
      if (userGoal === "weight_loss") {
        suggestion =
          nutrition.category === "Carb"
            ? `Skip ${cleanedItem} (high carb)`
            : `Include ${cleanedItem}`;
      } else if (userGoal === "gain") {
        suggestion = `Include ${cleanedItem}`;
      } else {
        suggestion = `Include ${cleanedItem} in moderation`;
      }
      return { text: suggestion, category: nutrition.category };
    });
  };

  const renderMealCard = (title: string, meal: string) => (
    <View
      style={{
        backgroundColor: Colors.cardBackground,
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: Colors.textPrimary }}>
        {title}
      </Text>
      {analyzeMeal(meal).map((item, i) => (
        <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
          <View
            style={{
              backgroundColor: categoryColors[item.category] || "#ccc",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginRight: 8,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: Colors.textWhite }}>
              {item.category}
            </Text>
          </View>
          <Text style={{ color: Colors.textSecondary }}>{item.text}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1, padding: 16, backgroundColor: Colors.background }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
          textAlign: "center",
          color: Colors.textPrimary,
        }}
      >
        Your AI Meal Suggestions
      </Text>

      {renderMealCard("Breakfast", breakfast)}
      {renderMealCard("Lunch", lunch)}
      {renderMealCard("Snacks", snacks)}
      {renderMealCard("Dinner", dinner)}

      <View
        style={{
          backgroundColor: Colors.cardBackground,
          padding: 16,
          borderRadius: 16,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: Colors.textPrimary }}>
          Physical Activity Suggestion
        </Text>
        <Text style={{ color: Colors.textSecondary }}>- {activitySuggestion(activity)}</Text>
      </View>
    </ScrollView>
  );
}