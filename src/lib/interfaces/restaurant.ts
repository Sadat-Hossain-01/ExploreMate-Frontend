export interface Restaurant {
    id: number;
    name: string;
    site_url: string;
    img_url: string;
    description: string;
    rating: number;
    rating_count: number;
    breakfast: number;
    lunch: number;
    dinner: number;
    lat: number;
    lng: number;
    selected: boolean;
};
