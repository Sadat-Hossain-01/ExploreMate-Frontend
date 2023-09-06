export interface Event {
    id: string;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    min_cost: number;
    max_cost: number;
    image_url: string;
    rating: number;
    rating_count: number;
    selected: boolean;
    destination_id: number;
}
