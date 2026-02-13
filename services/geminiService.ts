
import { GoogleGenAI, Type } from "@google/genai";
import { SessionAdvice } from "../types";

export const getSessionAdvice = async (userDescription: string): Promise<SessionAdvice> => {
  // Fixed: Always use exactly the named parameter process.env.API_KEY as per the GenAI coding guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Help me plan a photography session based on this vision: "${userDescription}". Provide creative advice on theme, lighting, location, and wardrobe.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          theme: { type: Type.STRING },
          lightingSuggestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          locationIdeas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          wardrobeAdvice: { type: Type.STRING },
          creativeNotes: { type: Type.STRING },
        },
        required: ["theme", "lightingSuggestions", "locationIdeas", "wardrobeAdvice", "creativeNotes"]
      }
    }
  });

  try {
    // Fixed: Accessed response.text as a property (not a method) and parsed it as JSON
    const text = response.text;
    return JSON.parse(text || '{}') as SessionAdvice;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Failed to generate creative advice.");
  }
};