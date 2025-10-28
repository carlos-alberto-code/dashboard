// src/components/LearningWindow.tsx
import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import type { LearningData } from '../types/Learning';
import { LearningController } from '../controllers/LearningController';

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(7, auto)',
  columnGap: '10px',
  rowGap: '10px',
};

const gridItemStyles: { [k: string]: React.CSSProperties } = {
  div1: { gridArea: '1 / 1 / 2 / 2' },
  div2: { gridArea: '1 / 2 / 2 / 3' },
  div3: { gridArea: '1 / 3 / 2 / 4' },
  div4: { gridArea: '2 / 1 / 4 / 4' },
  div5: { gridArea: '4 / 1 / 6 / 4' },
  div6: { gridArea: '6 / 1 / 8 / 4' },
};

type Trend = 'up' | 'down' | 'flat';
const trendIcon = (t?: Trend) => (t === 'up' ? '↑' : t === 'down' ? '↓' : '→');
const trendClass = (t?: Trend) =>
  t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({ label, value, unit, deltaPct, trend, meta }: any) {
  const numericMeta = typeof meta === 'string' ? parseFloat(meta.replace('%', '')) : meta;
  const isBelowTarget = typeof numericMeta === 'number' && value < numericMeta;
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow flex flex-col gap-3">
      <span className="text-sm text-uvm-gris">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${isBelowTarget ? 'text-red-500' : 'text-uvm-negro'}`}>{value}</span>
        {unit && <span className="text-base text-uvm-gris mb-0.5">{unit}</span>}
        {typeof deltaPct === 'number' && (
          <span className={`ml-auto text-sm font-semibold ${trendClass(trend)}`}>
            {trendIcon(trend)} {deltaPct}%
          </span>
        )}
      </div>
      {meta !== undefined && (
        <span className="text-xs text-uvm-gris">
          Meta: <b className="text-uvm-negro">{meta}{unit ?? ''}</b>
        </span>
      )}
    </div>
  );
}

const LearningWindow: React.FC = () => {
  const [data, setData] = useState<LearningData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(LearningController.getMockData());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-3xl font-bold text-uvm-negro">
          Cargando datos...
        </span>
      </div>
    );

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6">
      <Title order={1} className="text-3xl font-extrabold text-uvm-negro">
        Aprendizaje
      </Title>

      <div style={gridStyles}>
        <div style={gridItemStyles.div1}>
          <MetricCard
            label={data.metrics.scoreImprovement.label}
            value={data.metrics.scoreImprovement.value}
            unit={data.metrics.scoreImprovement.unit}
            deltaPct={data.metrics.scoreImprovement.deltaPct}
            trend={data.metrics.scoreImprovement.trend}
            meta={data.metrics.scoreImprovement.meta}
          />
        </div>

        <div style={gridItemStyles.div2}>
          <MetricCard
            label={data.metrics.quizAvg.label}
            value={data.metrics.quizAvg.value}
            deltaPct={data.metrics.quizAvg.deltaPct}
            trend={data.metrics.quizAvg.trend}
            meta={data.metrics.quizAvg.meta}
          />
        </div>

        <div style={gridItemStyles.div3}>
          <MetricCard
            label={data.metrics.egelAttemptRate.label}
            value={data.metrics.egelAttemptRate.value}
            unit={data.metrics.egelAttemptRate.unit}
            deltaPct={data.metrics.egelAttemptRate.deltaPct}
            trend={data.metrics.egelAttemptRate.trend}
            meta={data.metrics.egelAttemptRate.meta}
          />
        </div>

        {/* Chart 1: Progreso de Puntajes en Simuladores */}
        <div style={gridItemStyles.div4}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">
              Progreso de Puntajes en Simuladores
            </span>
            <LineChart
              height={280}
              xAxis={[{ scaleType: 'point', data: data.simulatorsProgress.weeks }]}
              series={[
                { data: data.simulatorsProgress.avg, label: 'Promedio' },
                { data: data.simulatorsProgress.min, label: 'Mínimo' },
                { data: data.simulatorsProgress.max, label: 'Máximo' },
              ]}
              yAxis={[{ min: 0 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Chart 2: Preparación para Benchmark */}
        <div style={gridItemStyles.div5}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">
              Preparación para Benchmark
            </span>
            <BarChart
              height={280}
              xAxis={[{ scaleType: 'band', data: data.benchmarkPrep.topics }]}
              series={[
                {
                  data: data.benchmarkPrep.percent,
                  label: '% de Usuarios Preparados',
                  color: '#7C4DFF',
                },
              ]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Chart 3: Intentos hasta Aprobar */}
        <div style={gridItemStyles.div6}>
          <div className="bg-white border border-gray-300 rounded-xl py-5 px-5 shadow">
            <span className="text-lg font-semibold text-uvm-negro">
              Intentos hasta Aprobar (Times to Pass)
            </span>
            <LineChart
              height={280}
              xAxis={[{ scaleType: 'point', data: data.timesToPass.weeks }]}
              series={[
                { data: data.timesToPass.max, label: 'Máximo', showMark: true, curve: 'monotoneX', color: '#D1D5DB' },
                { data: data.timesToPass.min, label: 'Mínimo', showMark: true, curve: 'monotoneX', color: '#93C5FD' },
                { data: data.timesToPass.q3, label: 'Q3', showMark: true, curve: 'monotoneX', color: '#EF4444' },
                { data: data.timesToPass.q1, label: 'Q1', showMark: true, curve: 'monotoneX', color: '#60A5FA' },
                { data: data.timesToPass.median, label: 'Mediana', showMark: true, curve: 'monotoneX', color: '#1D4ED8' },
              ]}
              yAxis={[{ min: 0 }]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningWindow;