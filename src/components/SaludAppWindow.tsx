import React, { useState, useEffect } from 'react';
import { Title } from '@mantine/core';
import type { AppHealthData } from '../types/AppHealth';
import { AppHealthController } from '../controllers/SaludAppController';
import { PieChart } from '@mui/x-charts/PieChart';
import type { Metric } from '../types/AppHealth';
import { LineChart } from '@mui/x-charts/LineChart';

const trendIcon = (t?: 'up' | 'down' | 'flat') =>
  t === 'up' ? '↑' : t === 'down' ? '↓' : '→';

const trendClass = (t?: 'up' | 'down' | 'flat') =>
  t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({ m }: { m: Metric }) {
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
          <span className={`ml-auto text-lg font-semibold ${trendClass(m.trend)}`}>
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

function SessionsHistoryCard({ months, values }: { months: string[]; values: number[] }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-2xl font-semibold text-uvm-negro">Histórico de Sesiones sin Fallos</span>
      <LineChart
        height={260}
        xAxis={[{ scaleType: 'point', data: months }]}
        series={[{ data: values, label: 'Sesiones sin fallos (%)', showMark: true }]}
        yAxis={[{ min: 0, max: 105 }]}
        grid={{ vertical: true, horizontal: true }}
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
        xAxis={[{ scaleType: 'point', data: months }]}
        series={[
          { data: p50, label: 'p50 (ms)', showMark: true },
          { data: p95, label: 'p95 (ms)', showMark: true },
        ]}
        yAxis={[{ min: 0, max: 400 }]}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

const SaludAppWindow: React.FC = () => {
  const [data, setData] = useState<AppHealthData | null>(null);
  
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(AppHealthController.getMockData());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  function parseDataForPieChart(data: AppHealthData) {
    const meta = Number(data.pieChart.meta);
    const value = Number(data.pieChart.value);
    const restante = Math.max(0, meta - value);

    return [
      { id: 0, value: value, label: 'Sin fallos', color: '#22c55e' },
      { id: 1, value: restante, label: 'Con fallos', color: 'rgba(0,0,0,0)' }
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

      <div className="parent">
        {/* Sesiones sin fallos */}
        <div className="div1 relative bg-white border border-gray-300 rounded-xl py-4 px-4 shadow flex flex-col items-center">
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
            style={{ height: 180 }}
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
              margin={{ top: 0, bottom: 0 }}
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
        <div className="div2">
          <MetricCard m={data.metrics.latencyP50} />
        </div>

        <div className="div3">
          <MetricCard m={data.metrics.appStoreRating} />
        </div>

        <div className="div4">
          <MetricCard m={data.metrics.latencyP95} />
        </div>

        <div className="div5">
          <MetricCard m={data.metrics.playStoreRating} />
        </div>

        {/* Sesiones */}
        <div className="div6">
          <SessionsHistoryCard
            months={data.timeseries.months}
            values={data.timeseries.sessionsOK}
          />
        </div>

        {/* Latencias */}
        <div className="div7">
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