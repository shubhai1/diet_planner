"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "@/lib/types";
import { Loader2, User, Activity, Utensils, Heart } from "lucide-react";

interface DietFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

export function DietForm({ onSubmit, isLoading }: DietFormProps) {
  const [formData, setFormData] = useState<UserData>({
    gender: "",
    age: "",
    weight: "",
    height: "",
    bodyFat: "",
    targetWeight: "",
    activity: "",
    workoutRoutine: "",
    medicalConditions: "",
    medications: "",
    digestiveHealth: "",
    dietaryIdentity: "",
    allergies: "",
    preferredProteins: "",
    preferredCarbs: "",
    dislikedFoods: "",
    cookingAbility: "",
    mealFrequency: "",
    cravings: "",
    waterIntake: "",
    sleepHours: "",
    goal: "",
  });

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Physical Profile */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Physical Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(v) => handleChange("gender", v)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g., 25"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Current Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 70"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 175"
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyFat">Body Fat % (optional)</Label>
            <Input
              id="bodyFat"
              type="number"
              placeholder="e.g., 20"
              value={formData.bodyFat}
              onChange={(e) => handleChange("bodyFat", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetWeight">Target Weight (kg)</Label>
            <Input
              id="targetWeight"
              type="number"
              placeholder="e.g., 65"
              value={formData.targetWeight}
              onChange={(e) => handleChange("targetWeight", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity & Health */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Activity & Health
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="goal">Primary Goal *</Label>
            <Select
              value={formData.goal}
              onValueChange={(v) => handleChange("goal", v)}
            >
              <SelectTrigger id="goal">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Body Recomposition">Body Recomposition</SelectItem>
                <SelectItem value="Athletic Performance">Athletic Performance</SelectItem>
                <SelectItem value="General Health">General Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level *</Label>
            <Select
              value={formData.activity}
              onValueChange={(v) => handleChange("activity", v)}
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedentary">Sedentary (Little or no exercise)</SelectItem>
                <SelectItem value="Lightly Active">Lightly Active (1-3 days/week)</SelectItem>
                <SelectItem value="Moderately Active">Moderately Active (3-5 days/week)</SelectItem>
                <SelectItem value="Very Active">Very Active (6-7 days/week)</SelectItem>
                <SelectItem value="Extra Active">Extra Active (Athlete/Physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="workoutRoutine">Workout Routine</Label>
            <Textarea
              id="workoutRoutine"
              placeholder="e.g., Weight training 4x/week, 45 mins each session"
              value={formData.workoutRoutine}
              onChange={(e) => handleChange("workoutRoutine", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <Input
              id="medicalConditions"
              placeholder="e.g., Diabetes, PCOS, Thyroid"
              value={formData.medicalConditions}
              onChange={(e) => handleChange("medicalConditions", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Medications/Supplements</Label>
            <Input
              id="medications"
              placeholder="e.g., Metformin, Vitamin D"
              value={formData.medications}
              onChange={(e) => handleChange("medications", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="digestiveHealth">Digestive Health</Label>
            <Input
              id="digestiveHealth"
              placeholder="e.g., Bloating after dairy, regular digestion"
              value={formData.digestiveHealth}
              onChange={(e) => handleChange("digestiveHealth", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dietary Preferences */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Utensils className="h-5 w-5 text-primary" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dietaryIdentity">Dietary Identity *</Label>
            <Select
              value={formData.dietaryIdentity}
              onValueChange={(v) => handleChange("dietaryIdentity", v)}
            >
              <SelectTrigger id="dietaryIdentity">
                <SelectValue placeholder="Select dietary identity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="Eggetarian">Eggetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies & Intolerances</Label>
            <Input
              id="allergies"
              placeholder="e.g., Dairy, Gluten, Nuts, Shellfish"
              value={formData.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredProteins">Preferred Proteins *</Label>
            <Input
              id="preferredProteins"
              placeholder="e.g., Chicken, Eggs, Lentils, Tofu"
              value={formData.preferredProteins}
              onChange={(e) => handleChange("preferredProteins", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredCarbs">Preferred Carbs *</Label>
            <Input
              id="preferredCarbs"
              placeholder="e.g., Rice, Oats, Sweet Potato, Quinoa"
              value={formData.preferredCarbs}
              onChange={(e) => handleChange("preferredCarbs", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dislikedFoods">Food Dislikes</Label>
            <Input
              id="dislikedFoods"
              placeholder="e.g., Broccoli, Mushrooms, Fish"
              value={formData.dislikedFoods}
              onChange={(e) => handleChange("dislikedFoods", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cookingAbility">Cooking Time/Ability</Label>
            <Select
              value={formData.cookingAbility}
              onValueChange={(v) => handleChange("cookingAbility", v)}
            >
              <SelectTrigger id="cookingAbility">
                <SelectValue placeholder="Select cooking ability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Minimal (15 mins)">Minimal (15 mins prep)</SelectItem>
                <SelectItem value="Moderate (30 mins)">Moderate (30 mins prep)</SelectItem>
                <SelectItem value="Advanced (60+ mins)">Advanced (60+ mins prep)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-primary" />
            Lifestyle & Habits
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="mealFrequency">Meal Frequency *</Label>
            <Select
              value={formData.mealFrequency}
              onValueChange={(v) => handleChange("mealFrequency", v)}
            >
              <SelectTrigger id="mealFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 meals (IF)">2 meals (Intermittent Fasting)</SelectItem>
                <SelectItem value="3 meals">3 meals per day</SelectItem>
                <SelectItem value="4-5 meals">4-5 meals per day</SelectItem>
                <SelectItem value="5-6 meals">5-6 small meals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cravings">Cravings/Triggers</Label>
            <Select
              value={formData.cravings}
              onValueChange={(v) => handleChange("cravings", v)}
            >
              <SelectTrigger id="cravings">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sweet tooth">Sweet tooth</SelectItem>
                <SelectItem value="Salty tooth">Salty tooth</SelectItem>
                <SelectItem value="Both">Both sweet & salty</SelectItem>
                <SelectItem value="None">No specific cravings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waterIntake">Current Water Intake</Label>
            <Select
              value={formData.waterIntake}
              onValueChange={(v) => handleChange("waterIntake", v)}
            >
              <SelectTrigger id="waterIntake">
                <SelectValue placeholder="Select intake" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 1L">Less than 1L/day</SelectItem>
                <SelectItem value="1-2L">1-2L/day</SelectItem>
                <SelectItem value="2-3L">2-3L/day</SelectItem>
                <SelectItem value="3L+">3L+ per day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepHours">Sleep Hours</Label>
            <Select
              value={formData.sleepHours}
              onValueChange={(v) => handleChange("sleepHours", v)}
            >
              <SelectTrigger id="sleepHours">
                <SelectValue placeholder="Select hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 5">Less than 5 hours</SelectItem>
                <SelectItem value="5-6 hours">5-6 hours</SelectItem>
                <SelectItem value="6-7 hours">6-7 hours</SelectItem>
                <SelectItem value="7-8 hours">7-8 hours</SelectItem>
                <SelectItem value="8+ hours">8+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Diet Plan...
            </>
          ) : (
            "Generate My Personalized Diet Plan"
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Fields marked with * are required
        </p>
      </div>
    </form>
  );
}
