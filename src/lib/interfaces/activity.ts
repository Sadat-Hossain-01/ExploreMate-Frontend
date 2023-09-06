export interface Activity {
    id: number;
    name: string;
    img_url: string;
    selected: boolean;
    description: string;
    rating: number;
    rating_count: number;
    minCost: number;
    maxCost: number;
    destination_id: number;
    time: number;
};