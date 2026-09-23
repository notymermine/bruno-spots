export type SpotCategory = 'Silent Study' | 'Collaborative' | 'Cafe & Food' | 'Outdoor';

export type NoiseLevel = 'Silent' | 'Moderate' | 'Lively';

export interface Spot {
  id: string;
  name: string;
  category: SpotCategory;
  noiseLevel: NoiseLevel;
  hasOutlets: boolean;
  openLate: boolean;
  description: string;
  location: string;
  bestFor?: string;
  buildingHours?: string;
}
