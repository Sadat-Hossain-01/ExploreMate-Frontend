export interface Hotel {
  hotel_id: string;
  name: string;
  site_url: string;
  img_url: string;
  description: string;
  star: number; // like 5-star
  low: number; // low price
  mid: number; // mid price
  high: number; // high price
  lat: number;
  lng: number;
  comp_breakfast: boolean;
  selected: boolean;
  city_id: number;
}
