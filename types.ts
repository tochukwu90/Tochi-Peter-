
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Portrait' | 'Wedding' | 'Landscape' | 'Editorial';
  imageUrl: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

// Added SessionAdvice interface to fix import errors in AIPlanner.tsx and geminiService.ts
export interface SessionAdvice {
  theme: string;
  lightingSuggestions: string[];
  locationIdeas: string[];
  wardrobeAdvice: string;
  creativeNotes: string;
}