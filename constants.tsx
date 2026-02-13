
import { PortfolioItem, PricingTier } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: 'Golden Hour Silhouettes', category: 'Portrait', imageUrl: 'https://picsum.photos/seed/port1/800/1000' },
  { id: '2', title: 'The Modern Bride', category: 'Wedding', imageUrl: 'https://picsum.photos/seed/wed1/800/1000' },
  { id: '3', title: 'Alpine Serenity', category: 'Landscape', imageUrl: 'https://picsum.photos/seed/land1/1200/800' },
  { id: '4', title: 'Urban Noir', category: 'Editorial', imageUrl: 'https://picsum.photos/seed/edit1/800/1000' },
  { id: '5', title: 'Emerald Eyes', category: 'Portrait', imageUrl: 'https://picsum.photos/seed/port2/800/1000' },
  { id: '6', title: 'Vintage Vows', category: 'Wedding', imageUrl: 'https://picsum.photos/seed/wed2/800/1000' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Essential',
    price: '$299',
    features: ['1 Hour Session', '15 Digital High-Res Photos', '1 Location', 'Online Gallery Access'],
  },
  {
    name: 'Premium',
    price: '$599',
    features: ['2 Hour Session', '40 Digital High-Res Photos', '2 Locations', 'Professional Retouching', 'Private Consultation'],
    recommended: true,
  },
  {
    name: 'Heirloom',
    price: '$999',
    features: ['Full Day Coverage', 'All Digital Files', 'Unlimited Locations', 'Linen Bound Photo Book', 'Priority Delivery'],
  },
];
