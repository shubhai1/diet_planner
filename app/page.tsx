"use client";

import { useState } from "react";
import { DietForm } from "@/components/diet-form";
import { DietResult } from "@/components/diet-result";
import { UserData } from "@/lib/types";
import { AlertCircle, Salad } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate diet plan");
      }

      setResult(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Salad className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold tracking-tight">NutriPlan AI</span>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Personalized Diet Plans Powered by AI
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Hero section */}
        {!result && (
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Personalized Diet Plan
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Fill in your details below and our AI nutritionist will create a customized
              meal plan tailored to your goals, preferences, and lifestyle.
            </p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        {result ? (
          <DietResult content={result} onReset={handleReset} />
        ) : (
          <DietForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          <p>
            Disclaimer: This diet plan is AI-generated and for informational purposes only.
            Always consult a healthcare professional before making significant dietary changes.
          </p>
        </div>
      </footer>
    </main>
  );
}
