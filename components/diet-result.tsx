"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Copy, Target, Apple, Pill, Lightbulb, ArrowLeft } from "lucide-react";

interface DietResultProps {
  content: string;
  onReset: () => void;
}

interface MealRow {
  meal: string;
  option: string;
  timing: string;
  ingredients: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  preparation: string;
}

export function DietResult({ content, onReset }: DietResultProps) {
  const [copied, setCopied] = useState(false);

  const parseContent = (markdown: string) => {
    const sections = {
      dailyTargets: "",
      mealPlan: [] as MealRow[],
      micronutrients: "",
      practicalAdvice: "",
    };

    // Extract Daily Targets section
    const dailyTargetsMatch = markdown.match(/(?:\*\*)?1\.\s*(?:\*\*)?DAILY TARGETS(?:\*\*)?:?\s*([\s\S]*?)(?=(?:\*\*)?2\.\s*(?:\*\*)?DIET PLAN)/i);
    if (dailyTargetsMatch) {
      sections.dailyTargets = dailyTargetsMatch[1].trim();
    }

    // Extract meal plan table
    const tableMatch = markdown.match(/\|[^\n]*Meal[^\n]*\|[\s\S]*?(?=\n\n|\n(?:\*\*)?3\.|\n##)/i);
    if (tableMatch) {
      const tableText = tableMatch[0];
      const rows = tableText.split("\n").filter((row) => row.trim() && !row.includes("---") && !row.toLowerCase().includes("meal"));
      
      rows.forEach((row) => {
        const cells = row.split("|").map((cell) => cell.trim()).filter(Boolean);
        if (cells.length >= 9) {
          sections.mealPlan.push({
            meal: cells[0],
            option: cells[1],
            timing: cells[2],
            ingredients: cells[3],
            calories: cells[4],
            protein: cells[5],
            carbs: cells[6],
            fat: cells[7],
            preparation: cells[8],
          });
        } else if (cells.length >= 8) {
          // Fallback for old format without option column
          sections.mealPlan.push({
            meal: cells[0],
            option: "",
            timing: cells[1],
            ingredients: cells[2],
            calories: cells[3],
            protein: cells[4],
            carbs: cells[5],
            fat: cells[6],
            preparation: cells[7],
          });
        }
      });
    }

    // Extract Micronutrient section
    const microMatch = markdown.match(/(?:\*\*)?3\.\s*(?:\*\*)?MICRONUTRIENT[^\n]*(?:\*\*)?:?\s*([\s\S]*?)(?=(?:\*\*)?4\.\s*(?:\*\*)?PRACTICAL)/i);
    if (microMatch) {
      sections.micronutrients = microMatch[1].trim();
    }

    // Extract Practical Advice section
    const adviceMatch = markdown.match(/(?:\*\*)?4\.\s*(?:\*\*)?PRACTICAL ADVICE(?:\*\*)?:?\s*([\s\S]*?)$/i);
    if (adviceMatch) {
      sections.practicalAdvice = adviceMatch[1].trim();
    }

    return sections;
  };

  const { dailyTargets, mealPlan, micronutrients, practicalAdvice } = parseContent(content);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const cleanText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[-•]\s*/gm, '')
      .replace(/^\s*[-–]\s*/gm, '')
      .trim();
  };

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[-•]\s*/gm, '')
      .split('\n')
      .filter(line => line.trim())
      .map(line => cleanText(line));
  };

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
        <Button onClick={copyToClipboard} variant="secondary">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Entire Plan
            </>
          )}
        </Button>
      </div>

      {/* Daily Targets */}
      {dailyTargets && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Daily Targets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              {cleanText(dailyTargets)}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Meal Plan Table */}
      {mealPlan.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Apple className="h-5 w-5 text-primary" />
              Your Personalized Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Meal</TableHead>
                  <TableHead className="font-semibold">Option</TableHead>
                  <TableHead className="font-semibold">Timing</TableHead>
                  <TableHead className="font-semibold min-w-[200px]">Ingredients & Portions</TableHead>
                  <TableHead className="font-semibold text-right">Calories</TableHead>
                  <TableHead className="font-semibold text-right">Protein</TableHead>
                  <TableHead className="font-semibold text-right">Carbs</TableHead>
                  <TableHead className="font-semibold text-right">Fat</TableHead>
                  <TableHead className="font-semibold min-w-[180px]">Preparation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealPlan.map((meal, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="font-medium">{cleanText(meal.meal)}</TableCell>
                    <TableCell className="text-muted-foreground">{cleanText(meal.option)}</TableCell>
                    <TableCell className="text-muted-foreground">{cleanText(meal.timing)}</TableCell>
                    <TableCell className="text-sm">
                      {cleanText(meal.ingredients)}
                    </TableCell>
                    <TableCell className="text-right font-medium">{cleanText(meal.calories)}</TableCell>
                    <TableCell className="text-right">{cleanText(meal.protein)}</TableCell>
                    <TableCell className="text-right">{cleanText(meal.carbs)}</TableCell>
                    <TableCell className="text-right">{cleanText(meal.fat)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cleanText(meal.preparation)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Micronutrients */}
      {micronutrients && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-primary" />
              Micronutrient & Supplement Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {formatMarkdownText(micronutrients).map((line, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2"
                  dangerouslySetInnerHTML={{ 
                    __html: `<span class="text-primary mt-1">•</span> <span>${line}</span>` 
                  }}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Practical Advice */}
      {practicalAdvice && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
              Practical Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {formatMarkdownText(practicalAdvice).map((line, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2"
                  dangerouslySetInnerHTML={{ 
                    __html: `<span class="text-primary mt-1">•</span> <span>${line}</span>` 
                  }}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Raw output fallback */}
      {mealPlan.length === 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Diet Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-foreground">
              {cleanText(content)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
