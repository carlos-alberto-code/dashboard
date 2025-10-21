export type EngagementData = {
    metrics: {
        sessionsPerUser: MetricData;
        avgSessionTime: MetricData;
        contentDepth: MetricData;
    };
    interactionRatio: {
        value: number;
        meta: number;
    };
    videoMetrics: VideoMetric[];
    avgSessionDuration: {
        categories: string[];
        series: { data: number[] }[];
    };
    videoInteractions: {
        categories: string[];
        series: { data: number[]; label: string; color: string }[];
    };
}

export type MetricData = {
    label: string;
    value: number | string;
    unit?: string;
    deltaPct?: number;
    trend?: Trend;
    meta: string | number;
}

export type VideoMetric = {
    video: string;
    vistas: number;
    likeRatio: number;
    commentRate: number;
}

export type Trend = 'up' | 'down' | 'neutral';