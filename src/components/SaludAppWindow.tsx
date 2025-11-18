// src/components/SaludAppWindow.tsx
import React, {useState, useEffect} from 'react';
import {Title} from '@mantine/core';
import type {AppHealthData} from '../types/appHealth.ts';
import {AppHealthController} from '../controllers/SaludAppController';
import {PieChart} from '@mui/x-charts/PieChart';
import type {Metric} from '../types/appHealth.ts';
import {LineChart} from '@mui/x-charts/LineChart';
import {getAppHealth} from "../api/saludApp.ts";

const gridStyles: React.CSSProperties = {
    display: 'grid',
    maxHeight: '100svh',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr) 0.2fr repeat(2, 1fr)',
    columnGap: '15px',
    rowGap: '15px',
};

const gridItemStyles: { [key: string]: React.CSSProperties } = {
    div1: {
        gridArea: '1 / 1 / 4 / 3',
        alignSelf: 'start' as const,
    },
    div2: {gridArea: '1 / 3 / 2 / 5'},
    div3: {gridArea: '1 / 5 / 2 / 7'},
    div4: {gridArea: '2 / 3 / 3 / 5'},
    div5: {gridArea: '2 / 5 / 3 / 7'},
    div6: {gridArea: '4 / 1 / 6 / 4'},
    div7: {gridArea: '4 / 4 / 6 / 7'},
};

const trendIcon = (t?: 'up' | 'down' | 'flat') =>
    t === 'up' ? '↑' : t === 'down' ? '↓' : '→';

const trendClass = (t?: 'up' | 'down' | 'flat') =>
    t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({m}: { m: Metric }) {
    return (
        <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow flex flex-col gap-3">
            <span className="text-xl text-uvm-gris">{m.label}</span>

            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-uvm-negro leading-none">
                  {m.value}
                </span>
                {m.unit && (
                    <span className="text-lg text-uvm-gris mb-1">{m.unit}</span>
                )}

                {typeof m.deltaPct === 'number' && (
                    <span className={`ml-2 text-lg font-semibold ${trendClass(m.trend)}`}>
                      {trendIcon(m.trend)} {m.deltaPct}%
                    </span>
                )}
            </div>

            <div className="text-base text-uvm-gris">
                Meta:&nbsp;
                <span className="font-semibold text-uvm-negro">
                  {typeof m.meta === 'number' ? `${m.meta}${m.unit ?? ''}` : m.meta}
                </span>
            </div>
        </div>
    );
}

function SessionsHistoryCard({months, values}: { months: string[]; values: number[] }) {
    return (
        <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
            <span className="text-2xl font-semibold text-uvm-negro">Histórico de Sesiones sin Fallos</span>
            <LineChart
                height={260}
                xAxis={[{scaleType: 'point', data: months}]}
                series={[{data: values, label: 'Sesiones sin fallos (%)', showMark: true}]}
                yAxis={[{min: 0, max: 105}]}
                grid={{vertical: true, horizontal: true}}
            />
        </div>
    );
}

function LatencyTrendCard({
                              months, p50, p95,
                          }: { months: string[]; p50: number[]; p95: number[] }) {
    return (
        <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
            <span className="text-2xl font-semibold text-uvm-negro">Tendencia de Latencia</span>
            <LineChart
                height={260}
                xAxis={[{scaleType: 'point', data: months}]}
                series={[
                    {data: p50, label: 'p50 (ms)', showMark: true},
                    {data: p95, label: 'p95 (ms)', showMark: true},
                ]}
                yAxis={[{min: 0, max: 400}]}
                grid={{vertical: true, horizontal: true}}
            />
        </div>
    );
}

const SaludAppWindow: React.FC = () => {

    const [data, setData] = useState<AppHealthData>(AppHealthController.getMockData());

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const fetched = await getAppHealth();
                if (mounted) {
                    setData(fetched);
                }
            } catch (error) {
                console.error('Error fetching app health:', error);
            }
        };

        fetchData().then(
            () => {/* Fetch complete */
            },
        );

        return () => {
            mounted = false;
        };
    }, []);

    function parseDataForPieChart(data: AppHealthData) {
        const meta = Number(data.pieChart.meta);
        const value = Number(data.pieChart.value);
        const restante = Math.max(0, meta - value);

        return [
            {id: 0, value: value, label: 'Sin fallos', color: '#22c55e'},
            {id: 1, value: restante, label: 'Con fallos', color: 'rgba(0,0,0,0)'}
        ];
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-3xl font-bold text-uvm-negro">Cargando datos...</span>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen flex flex-col gap-8">
            <div className="mb-2">
                <Title
                    order={1}
                    className="text-3xl font-extrabold text-uvm-negro mb-2"
                >
                    Salud de la App
                </Title>
            </div>

            <div style={gridStyles}>
                {/* Sesiones sin fallos */}
                <div style={gridItemStyles.div1}
                     className="relative bg-white border border-gray-300 rounded-xl py-4 px-4 shadow flex flex-col items-center">
                    <Title
                        order={2}
                        className="text-xl text-uvm-negro text-left self-start py-2"
                    >
                        Sesiones sin fallos
                    </Title>

                    <span className="text-base text-uvm-gris">
            Porcentaje de sesiones sin fallos
          </span>

                    <div
                        className="relative w-full flex items-center justify-center my-2"
                        style={{height: 180}}
                    >
                        <PieChart
                            height={180}
                            series={[
                                {
                                    data: parseDataForPieChart(data),
                                    innerRadius: 60,
                                    outerRadius: 80,
                                    paddingAngle: 4,
                                    cornerRadius: 5,
                                    startAngle: -90,
                                    endAngle: 90,
                                    cy: 90,
                                },
                            ]}
                            margin={{top: 0, bottom: 0}}
                            hideLegend
                        />

                        <span
                            className="absolute text-2xl font-semibold text-uvm-gris"
                            style={{
                                top: "55%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
              {data.pieChart.value}%
            </span>
                    </div>

                    <span className="text-base text-uvm-gris mb-3">
            Meta:{" "}
                        <span className="font-bold text-uvm-negro">
              {data.pieChart.meta}%
            </span>
          </span>
                </div>

                {/* Métricas */}
                <div style={gridItemStyles.div2}>
                    <MetricCard m={data.metrics.latencyP50}/>
                </div>

                <div style={gridItemStyles.div3}>
                    <MetricCard m={data.metrics.appStoreRating}/>
                </div>

                <div style={gridItemStyles.div4}>
                    <MetricCard m={data.metrics.latencyP95}/>
                </div>

                <div style={gridItemStyles.div5}>
                    <MetricCard m={data.metrics.playStoreRating}/>
                </div>

                {/* Sesiones */}
                <div style={gridItemStyles.div6}>
                    <SessionsHistoryCard
                        months={data.timeseries.months}
                        values={data.timeseries.sessionsOK}
                    />
                </div>

                {/* Latencias */}
                <div style={gridItemStyles.div7}>
                    <LatencyTrendCard
                        months={data.timeseries.months}
                        p50={data.timeseries.p50}
                        p95={data.timeseries.p95}
                    />
                </div>
            </div>
        </div>
    );
};

export default SaludAppWindow;
