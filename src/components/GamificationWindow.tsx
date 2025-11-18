import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import type { GamificationData, Trend } from '../types/Gamification';
import { GamificationController } from '../controllers/GamificationController';

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(5, auto)',
  columnGap: '10px',
  rowGap: '10px',
};

const gridItemStyles: Record<string, React.CSSProperties> = {
  div1: { gridArea: '1 / 1 / 2 / 2' },
  div2: { gridArea: '1 / 2 / 2 / 3' },
  div3: { gridArea: '2 / 1 / 3 / 3' },
  div4: { gridArea: '3 / 1 / 4 / 3' },
  div5: { gridArea: '4 / 1 / 5 / 3' },
  div6: { gridArea: '5 / 1 / 6 / 3' },
};

const trendIcon = (t?: Trend) => (t === 'up' ? '↑' : t === 'down' ? '↓' : '→');
const trendClass = (t?: Trend) =>
  t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({ label, value, unit, deltaPct, trend, meta }: any) {
  const numericMeta = typeof meta === 'string' ? parseFloat(meta.replace('%','')) : meta;
  const below = typeof numericMeta === 'number' && value < numericMeta;
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow flex flex-col gap-3">
      <span className="text-sm text-uvm-gris">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${below ? 'text-red-500' : 'text-uvm-negro'}`}>{value}</span>
        {unit && <span className="text-base text-uvm-gris mb-0.5">{unit}</span>}
        {typeof deltaPct === 'number' && (
          <span className={`ml-auto text-sm font-semibold ${trendClass(trend)}`}>
            {trendIcon(trend)} {deltaPct}%
          </span>
        )}
      </div>
      {meta !== undefined && (
        <span className="text-xs text-uvm-gris">
          Meta: <b className="text-uvm-negro">{typeof meta === 'string' ? meta : `${meta}${unit ?? ''}`}</b>
        </span>
      )}
    </div>
  );
}

function Heatmap({ rows, cols, values }: { rows: string[]; cols: string[]; values: number[][] }) {
  const cell = (v: number, key: number) => (
    <td key={key} className="text-white text-sm text-center rounded" style={{ background: `hsl(0, 70%, ${90 - v * 0.4}%)` }}>
      {v}
    </td>
  );
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
      <span className="text-lg font-semibold text-uvm-negro">Aciertos por Palabra (%)</span>
      <div className="mt-4 overflow-auto">
        <table className="min-w-full">
          <thead className="text-uvm-gris text-sm">
            <tr><th></th>{cols.map((c, i) => <th key={i} className="px-2">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r}>
                <td className="text-uvm-gris text-sm pr-3">{r}</td>
                {values[i].map((v, j) => cell(v, j))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const GamificationWindow: React.FC = () => {
  const [data, setData] = useState<GamificationData | null>(null);

  useEffect(() => {
    const t = setTimeout(async () => setData(await GamificationController.getGamificationData()), 0);
    return () => clearTimeout(t);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-3xl font-bold text-uvm-negro">Cargando datos...</span>
      </div>
    );
  }

  const usersMax = Math.max(...data.funnel.users);
  const conversionScaled = data.funnel.conversionPct.map((p) =>
    Math.round((p / 100) * usersMax)
  );
  const pctFormatter = (v: number | null) =>
    v == null ? null : `${Math.round((v / usersMax) * 100)}%`;

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6">
      <Title order={1} className="text-3xl font-extrabold text-uvm-negro">Gamificación</Title>

      <div style={gridStyles}>
        {/* KPIs */}
        <div style={gridItemStyles.div1}><MetricCard {...data.metrics.completionRate} /></div>
        <div style={gridItemStyles.div2}><MetricCard {...data.metrics.avgAttemptsPerGame} /></div>

        {/* Funnel de Juegos y Tasa de Conversión */}
        <div style={gridItemStyles.div3}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">Funnel de Juegos y Tasa de Conversión</span>
            <BarChart
              height={280}
              xAxis={[{ scaleType: 'band', data: data.funnel.stages }]}
              series={[
                { data: data.funnel.users, label: 'Usuarios', color: '#7C4DFF' },
                { data: conversionScaled, label: 'Tasa de Conversión (%)', color: '#22C55E', valueFormatter: pctFormatter },
              ]}
              yAxis={[{ min: 0 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Evolución de Tasa de Éxito */}
        <div style={gridItemStyles.div4}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">Evolución de Tasa de Éxito</span>
            <LineChart
              height={280}
              xAxis={[{ scaleType: 'point', data: data.successEvolution.weeks }]}
              series={[{ data: data.successEvolution.successRate, label: 'Tasa de Éxito (%)' }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Tasa de Abandono por Nivel */}
        <div style={gridItemStyles.div5}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">Tasa de Abandono por Nivel</span>
            <BarChart
              height={280}
              xAxis={[{ scaleType: 'band', data: data.dropRate.stages }]}
              series={[{ data: data.dropRate.dropPct, label: 'Tasa de Abandono (%)', color: '#EF4444' }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Aciertos por Palabra (Heatmap) */}
        <div style={gridItemStyles.div6}>
          <Heatmap rows={data.wordAccuracy.rows} cols={data.wordAccuracy.cols} values={data.wordAccuracy.values} />
        </div>
      </div>
    </div>
  );
};

export default GamificationWindow;