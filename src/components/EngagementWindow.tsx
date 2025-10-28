// src/components/EngagementWindow.tsx
import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { EngagementData, VideoMetric, Trend } from '../types/Engagement';
import { EngagementController } from '../controllers/EngagementController';


const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'auto auto auto 1fr 1fr',
  gap: '20px',
};

const gridItemStyles: { [k: string]: React.CSSProperties } = {
  div1: { gridArea: '1 / 1 / 2 / 2' },
  div2: { gridArea: '2 / 1 / 3 / 2' },
  div3: { gridArea: '3 / 1 / 4 / 2' },
  div4: { gridArea: '1 / 2 / 2 / 3' },
  div5: { gridArea: '2 / 2 / 4 / 3' },
  div6: { gridArea: '4 / 1 / 5 / 3' }, 
  div7: { gridArea: '5 / 1 / 6 / 3' }, 
};

const trendIcon = (t?: Trend) => (t === 'up' ? '↑' : t === 'down' ? '↓' : '→');
const trendClass = (t?: Trend) =>
  t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({ label, value, unit, deltaPct, trend, meta }: any) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const numericMeta = typeof meta === 'string' ? parseFloat(meta.replace(/[^0-9.]/g, '')) : meta;
  const isBelowTarget = numericMeta && numericValue < numericMeta;
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow flex flex-col gap-3 h-full">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${isBelowTarget ? 'text-red-500' : 'text-black'}`}>{value}</span>
        {unit && <span className="text-base text-gray-500 mb-0.5">{unit}</span>}
        {typeof deltaPct === 'number' && (
          <span className={`ml-auto text-sm font-semibold ${trendClass(trend)}`}>
            {trendIcon(trend)} {deltaPct}%
          </span>
        )}
      </div>
      {meta !== undefined && (
        <span className="text-xs text-gray-500 mt-auto">
          Meta: <b className="text-black">{meta} {unit}</b>
        </span>
      )}
    </div>
  );
}

function InteractionRatioCard({ value, meta }: { value: number; meta: number }) {
  const safeMeta = Math.max(0, Math.min(100, meta));
  const safeValue = Math.max(0, Math.min(100, value));
  const delta = +(safeValue - safeMeta).toFixed(1);
  const isBelow = safeValue < safeMeta;

  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow flex flex-col h-full">
      <span className="text-sm text-gray-500">Ratio de Interacción</span>

      <div className="relative flex items-center justify-center w-full" style={{ minHeight: 180 }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PieChart
            series={[
              {
                data: [
                  { id: 'bg', value: 100, color: 'rgba(0,0,0,0.06)' },
                ],
                innerRadius: 78,
                outerRadius: 86,
                startAngle: -90,
                endAngle: 270,
              },
            ]}
            height={180}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            hideLegend
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PieChart
            series={[
              {
                data: [
                  { id: 'meta', value: safeMeta, color: '#2563EB' },
                  { id: 'rest-meta', value: 100 - safeMeta, color: 'rgba(0,0,0,0)' },
                ],
                innerRadius: 72,
                outerRadius: 76,
                startAngle: -90,
                endAngle: 270,
              },
            ]}
            height={180}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            hideLegend
          />
        </div>

        {/* Anillo principal que muestra el valor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PieChart
            series={[
              {
                data: [
                  { id: 'value', value: safeValue, color: isBelow ? '#EF4444' : '#22C55E' },
                  { id: 'rest', value: 100 - safeValue, color: 'rgba(0,0,0,0)' },
                ],
                innerRadius: 56,
                outerRadius: 70,
                cornerRadius: 6,
                startAngle: -90,
                endAngle: 270,
              },
            ]}
            height={180}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            hideLegend
          />
        </div>

        {/* Etiqueta central */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-2xl font-bold ${isBelow ? 'text-red-600' : 'text-green-600'}`}>
          {safeValue}%
        </span>
        <span className="text-xs text-gray-500">
          Meta: <b className="text-black">{safeMeta}%</b>
        </span>
        <span className={`text-xs mt-1 ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}
        </span>
        </div>
      </div>

        <div className="text-xs text-gray-500 text-center mt-3 space-y-1">
            <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}></span>
                <span>Contexto (100%): anillo tenue</span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#2563EB' }}></span>
                <span>Meta objetivo: anillo azul</span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: isBelow ? '#EF4444' : '#22C55E' }}></span>
                <span>Valor actual: anillo interior (verde si ≥ meta, rojo si &lt; meta)</span>
            </div>
        </div>
    </div>
  );
}

function VideoMetricsTable({ data }: { data: VideoMetric[] }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
      <span className="text-lg font-semibold text-black">Métricas de Videos</span>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-200">
              <th className="py-2 pr-2">Video</th>
              <th className="py-2 px-2">Vistas</th>
              <th className="py-2 px-2">Like Ratio</th>
              <th className="py-2 pl-2">Comment Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.video} className="text-sm text-black border-b border-gray-100">
                <td className="py-2 pr-2 font-medium">{row.video}</td>
                <td className="py-2 px-2">{row.vistas.toLocaleString()}</td>
                <td className="py-2 px-2">{row.likeRatio.toFixed(1)}%</td>
                <td className="py-2 pl-2">{row.commentRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AvgSessionDurationChart({ data }: { data: EngagementData['avgSessionDuration'] }) {
  const props = {
    height: 300,
    xAxis: [{
      scaleType: 'band',
      data: data.categories,
      tickLabelStyle: { fontSize: 10 }
    }],
    series: data.series,
    yAxis: [{ min: 0 }],
    grid: { vertical: false, horizontal: true },
    margin: { left: 40, bottom: 40 },
  } as any;

  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-lg font-semibold text-black">Duración Promedio por Sesión</span>
      <BarChart {...props} />
    </div>
  );
}

function VideoInteractionsChart({ data }: { data: EngagementData['videoInteractions'] }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-lg font-semibold text-black">Interacciones por Video</span>
      <BarChart
        height={300}
        xAxis={[{
          scaleType: 'band',
          data: data.categories,
        }]}
        series={data.series}
        yAxis={[{ min: 0 }]}
        grid={{ vertical: false, horizontal: true }}
        colors={data.series.map(s => s.color)} // Asigna colores
        margin={{ left: 40 }}
      />
    </div>
  );
}

const EngagementWindow: React.FC = () => {
  const [data, setData] = useState<EngagementData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(EngagementController.getMockData());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-3xl font-bold text-black">Cargando datos...</span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6 bg-gray-50">
      <Title order={1} className="text-3xl font-extrabold text-black">Engagement</Title>
      <div style={gridStyles}>
        <div style={gridItemStyles.div1}><MetricCard {...data.metrics.sessionsPerUser} /></div>
        <div style={gridItemStyles.div2}><MetricCard {...data.metrics.avgSessionTime} /></div>
        <div style={gridItemStyles.div3}><VideoMetricsTable data={data.videoMetrics} /></div>
        
        <div style={gridItemStyles.div4}><MetricCard {...data.metrics.contentDepth} /></div>
        <div style={gridItemStyles.div5}><InteractionRatioCard {...data.interactionRatio} /></div>
        
        <div style={gridItemStyles.div6}><AvgSessionDurationChart data={data.avgSessionDuration} /></div>
        <div style={gridItemStyles.div7}><VideoInteractionsChart data={data.videoInteractions} /></div>
      </div>
    </div>
  );
};

export default EngagementWindow;