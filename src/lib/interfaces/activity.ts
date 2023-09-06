export interface Activity {
    id: number;
    name: string;
    image_url: string;
    selected: boolean;
    description: string;
    rating: number;
    rating_count: number;
    min_cost: number;
    max_cost: number;
    destination_id: number;
};