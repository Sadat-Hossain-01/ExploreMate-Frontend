export interface Destination {
    id: number;
    name: string;
    country_id: number;
    state_id: number;
    city_id: number;
    description: string;
    img_url: string;
    rating: number;
    rating_count: number;
    estimated_cost: number;
    estimated_time: number;
    lat: number;
    lng: number;
    selected: boolean;
};
