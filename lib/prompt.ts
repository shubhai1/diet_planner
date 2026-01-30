import { UserData } from "./types";

export function generatePrompt(userData: UserData): string {
  return `
You are an expert AI Clinical Nutritionist. Create a comprehensive, personalized diet plan based on the following individual profile:

### USER PROFILE DATA:
- Age/Gender: ${userData.age} / ${userData.gender}
- Height/Weight: ${userData.height}cm / ${userData.weight}kg
- Body Fat %: ${userData.bodyFat || 'Not provided'}
- Goal: ${userData.goal} (Target Weight: ${userData.targetWeight || 'N/A'})
- Activity Level: ${userData.activity}
- Workout Routine: ${userData.workoutRoutine || 'Not specified'}
- Health/Medications: ${userData.medicalConditions || 'None'} / ${userData.medications || 'None'}
- Digestive Health: ${userData.digestiveHealth || 'Normal'}
- Dietary Identity: ${userData.dietaryIdentity}
- Allergies: ${userData.allergies || 'None'}
- Preferred Proteins: ${userData.preferredProteins}
- Preferred Carbs: ${userData.preferredCarbs}
- Food Dislikes: ${userData.dislikedFoods || 'None'}
- Cooking Ability: ${userData.cookingAbility || 'Moderate'}
- Meal Frequency: ${userData.mealFrequency}
- Cravings: ${userData.cravings || 'Not specified'}
- Water Intake: ${userData.waterIntake || 'Not specified'}
- Sleep Hours: ${userData.sleepHours || 'Not specified'}

---

### OUTPUT REQUIREMENTS:
Please generate the response using the following four-section structure:

1. **DAILY TARGETS**: State the daily Calorie, Protein, Carbohydrate, and Fat targets based on the user's goal and activity level.

2. **DIET PLAN TABLE**: Provide a 1-day meal plan with **3 OPTIONS for each meal** in a Markdown table with the following columns: 
| Meal | Option | Timing | Ingredients & Portions | Calories | Protein | Carbs | Fat | Preparation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

IMPORTANT: For each meal slot (Breakfast, Mid-Morning Snack, Lunch, Evening Snack, Dinner), provide exactly 3 different options in separate rows.
- The "Meal" column should contain the meal name (Breakfast, Mid-Morning Snack, Lunch, Evening Snack, Dinner)
- The "Option" column should contain "Option 1", "Option 2", or "Option 3"
- Each option should be a complete meal that meets similar calorie and macro targets
- Ensure 'Ingredients & Portions' includes specific gram measurements

3. **MICRONUTRIENT & SUPPLEMENT RECOMMENDATIONS**: 
Based on the SPECIFIC foods and meals in the diet plan above, analyze:
- Which micronutrients are well-covered by the recommended foods
- Which micronutrients may be lacking based on the user's dietary identity (${userData.dietaryIdentity}) and the specific meals provided
- Provide specific supplement recommendations with dosages based on gaps in the diet plan
- Reference specific foods from the diet plan that contribute to certain nutrients

4. **PRACTICAL ADVICE**: 
Provide 5-6 lifestyle and wellness tips the person should ADDITIONALLY follow alongside this diet plan:
- Daily water intake target in liters based on activity level (${userData.activity})
- Recommended sleep hours and sleep quality tips
- Best meal timing relative to workouts (${userData.workoutRoutine || 'general fitness'})
- Walking/movement goals (steps per day)
- Stress management tips for better digestion and metabolism
- Screen time and eating habits (mindful eating)

Tone: Professional, clinical, and encouraging. Use plain text without asterisks or markdown bold formatting.
`;
}
