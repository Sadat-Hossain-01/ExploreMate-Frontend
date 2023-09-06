export interface Event {
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    estimated_time: number;
    minCost: number;
    maxCost: number;
    img_url: string;
    rating: number;
    rating_count: number;
    selected: boolean;
    destination_id: number;
}
