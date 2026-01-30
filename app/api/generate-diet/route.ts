import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "@/lib/prompt";
import { UserData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("[v0] API Key check - Key exists:", !!apiKey);
    console.log("[v0] Environment variables available:", Object.keys(process.env).filter(k => k.includes('GEMINI')).length > 0);
    
    if (!apiKey) {
      console.error("[v0] GEMINI_API_KEY not found in environment");
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY=your_key to your .env.local file in the root directory and restart your development server." },
        { status: 500 }
      );
    }
    
    const prompt = generatePrompt(userData);
    
    console.log("[v0] Sending request to Gemini API");
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      }
    );
    
    console.log("[v0] Gemini API response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("[v0] Gemini API Error:", errorData);
      return NextResponse.json(
        { error: `Failed to generate diet plan. API Error: ${errorData?.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      return NextResponse.json(
        { error: "No response generated from AI" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ content: generatedText });
    
  } catch (error) {
    console.error("[v0] Error generating diet plan:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `An unexpected error occurred: ${errorMessage}` },
      { status: 500 }
    );
  }
}
