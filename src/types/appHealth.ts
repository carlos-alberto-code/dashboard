export type Trend = 'up' | 'down' | 'flat';

export type Metric = {
    label: string;
    value: number;
    unit?: string;
    meta: number | string;
    deltaPct?: number;
    trend?: Trend;
};

export interface AppHealthData {
    pieChart: { value: number; meta: number };
    metrics: {
        latencyP50: Metric;
        latencyP95: Metric;
        appStoreRating: Metric;
        playStoreRating: Metric;
    };
    timeseries: {
        months: string[];
        sessionsOK: number[];
        p50: number[];
        p95: number[];
    };
}