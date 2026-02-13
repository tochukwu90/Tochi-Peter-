
import { GoogleGenAI, Type } from "@google/genai";
import { SessionAdvice } from "../types";

export const getSessionAdvice = async (userDescription: string): Promise<SessionAdvice> => {
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
    const text = response.text;
    return JSON.parse(text || '{}') as SessionAdvice;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Failed to generate creative advice.");
  }
};

export const generateAutoReply = async (name: string, interest: string, message: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a high-end, sophisticated, and professional automated thank-you email response from "T-WORLD Studios". 
    The sender is ${name}. They are interested in: ${interest}. 
    Their message was: "${message}". 
    The tone should be elegant, welcoming, and reassuringly professional. Keep it under 100 words.`,
  });

  return response.text || "Thank you for reaching out to T-WORLD Studios. We've received your message and will be in touch shortly.";
};
