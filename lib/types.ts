export interface UserData {
  // Physical Profile
  gender: string;
  age: string;
  weight: string;
  height: string;
  bodyFat?: string;
  targetWeight?: string;
  
  // Activity & Health
  activity: string;
  workoutRoutine?: string;
  medicalConditions?: string;
  medications?: string;
  digestiveHealth?: string;
  
  // Dietary Preferences
  dietaryIdentity: string;
  allergies?: string;
  preferredProteins: string;
  preferredCarbs: string;
  dislikedFoods?: string;
  cookingAbility?: string;
  
  // Lifestyle
  mealFrequency: string;
  cravings?: string;
  waterIntake?: string;
  sleepHours?: string;
  
  // Goal
  goal: string;
}

export interface MealPlan {
  meal: string;
  timing: string;
  ingredients: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  preparation: string;
}

export interface DietPlanResponse {
  dailyTargets: string;
  mealPlan: MealPlan[];
  micronutrients: string;
  practicalAdvice: string;
  rawMarkdown: string;
}
