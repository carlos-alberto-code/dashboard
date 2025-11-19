import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import { LineChart } from '@mui/x-charts/LineChart';
import type { UsersData, Trend } from '../types/Users';
import { UsersController } from '../controllers/UsersController';

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridTemplateRows: 'repeat(6, 1fr)',
  columnGap: '10px',
  rowGap: '20px',
};

const gridItemStyles: { [k: string]: React.CSSProperties } = {
  div1: { gridArea: '1 / 1 / 2 / 3' },
  div2: { gridArea: '1 / 3 / 2 / 5' },
  div3: { gridArea: '1 / 5 / 2 / 6' },
  div4: { gridArea: '1 / 6 / 2 / 7' },
  div5: { gridArea: '1 / 7 / 2 / 8' },
  div6: { gridArea: '2 / 1 / 3 / 8' },
  div7: { gridArea: '3 / 1 / 5 / 8' },
  div8: { gridArea: '5 / 1 / 7 / 8' },
};

  
  

const trendIcon = (t?: Trend) => (t === 'up' ? '↑' : t === 'down' ? '↓' : '→');
const trendClass = (t?: Trend) =>
  t === 'up' ? 'text-green-500' : t === 'down' ? 'text-red-500' : 'text-gray-400';

function MetricCard({ label, value, unit, deltaPct, trend, meta }: any) {
  const numericMeta = typeof meta === 'string' ? parseFloat(meta.replace('%', '')) : meta;
  const isBelowTarget = numericMeta && value < numericMeta;
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

function ConversionBar({ conversionPct, targetPct, installs, registers }: { conversionPct: number; targetPct: number; installs: number; registers: number }) {
  const pct = Math.max(0, Math.min(100, conversionPct));
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-lg font-semibold text-uvm-negro">Instalación vs Registro</span>
      <div className="mt-4 h-3 w-full bg-gray-200 rounded-full relative">
        <div className="h-3 rounded-full bg-green-500" style={{ width: `${pct}%` }} />
        <span className="absolute -top-6 right-0 text-sm text-uvm-negro font-semibold">{pct.toFixed(1)}%</span>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-uvm-gris">Meta {targetPct}%</span>
      </div>
      <div className="mt-3 flex justify-between text-sm text-uvm-gris">
        <span>Instalaciones: <b className="text-uvm-negro">{installs}</b></span>
        <span>Registros: <b className="text-uvm-negro">{registers}</b></span>
      </div>
    </div>
  );
}

function ActiveUsersChart({ months, dau, mau }: any) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-lg font-semibold text-uvm-negro">Usuarios Activos</span>
      <LineChart
        height={260}
        xAxis={[{ scaleType: 'point', data: months }]}
        series={[
          { data: dau, label: 'Diarios (DAU)', showMark: true },
          { data: mau, label: 'Mensuales (MAU)', showMark: true },
        ]}
        yAxis={[{ min: 0 }]}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

function RetentionHeatmap({ d1, w1, m1, months }: any) {
  const cell = (v: number) => (
    <td className="text-white text-sm text-center rounded" style={{ background: `hsl(220, 85%, ${80 - v * 0.4}%)` }}>{v}</td>
  );
  return (
    <div className="bg-white border border-gray-300 rounded-xl py-6 px-6 shadow">
      <span className="text-lg font-semibold text-uvm-negro">Retención</span>
      <div className="mt-4 overflow-auto">
        <table className="min-w-full">
          <thead className="text-uvm-gris text-sm">
            <tr><th></th>{months.map((m: string) => <th key={m} className="px-2">{m}</th>)}</tr>
          </thead>
          <tbody>
            <tr><td className="text-uvm-gris text-sm pr-3">Día 1</td>{d1.map((v:number,i:number)=><React.Fragment key={i}>{cell(v)}</React.Fragment>)}</tr>
            <tr><td className="text-uvm-gris text-sm pr-3">Semana 1</td>{w1.map((v:number,i:number)=><React.Fragment key={i}>{cell(v)}</React.Fragment>)}</tr>
            <tr><td className="text-uvm-gris text-sm pr-3">Mes 1</td>{m1.map((v:number,i:number)=><React.Fragment key={i}>{cell(v)}</React.Fragment>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const UsuariosWindow: React.FC = () => {

const [data, setData] = useState<UsersData | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      setData(await UsersController.getUsersData());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return <div className="flex items-center justify-center min-h-screen"><span className="text-3xl font-bold text-uvm-negro">Cargando datos...</span></div>;

  return (
    <div className="p-6 min-h-screen flex flex-col gap-6">
      <Title order={1} className="text-3xl font-extrabold text-uvm-negro">Usuarios</Title>
      <div style={gridStyles}>
        <div style={gridItemStyles.div1}><MetricCard {...data.metrics.ratioDaumau} /></div>
        <div style={gridItemStyles.div2}><MetricCard {...data.metrics.churnRate} /></div>
        <div style={gridItemStyles.div3}><MetricCard {...data.metrics.d1Ret} /></div>
        <div style={gridItemStyles.div4}><MetricCard {...data.metrics.w1Ret} /></div>
        <div style={gridItemStyles.div5}><MetricCard {...data.metrics.m1Ret} /></div>
        <div style={gridItemStyles.div6}><ConversionBar {...data.installVsRegister} /></div>
        <div style={gridItemStyles.div7}><ActiveUsersChart {...data.activeUsers} /></div>
        <div style={gridItemStyles.div8}><RetentionHeatmap {...data.retention} /></div>
      </div>
    </div>
  );
};

export default UsuariosWindow;