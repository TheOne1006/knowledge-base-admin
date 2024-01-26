export interface CrawlerItem {
    url: string;
    completed: boolean;
    retry: number;
    finish: boolean;
    total: number;
    index: number;
}
