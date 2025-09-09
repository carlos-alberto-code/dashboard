import React, { useState, useEffect } from 'react';
import { Title } from '@mantine/core';
import type { AppHealthData } from '../types/AppHealth';
import { AppHealthController } from '../controllers/SaludAppController';
import { PieChart } from '@mui/x-charts/PieChart';

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
    const restante = meta - value;

    return [
      { id: 0, value: value, label: 'Sin fallos', color: '#d7282f' },
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
        <Title order={1} className="text-3xl font-extrabold text-uvm-negro mb-2">Salud de la App</Title>
      </div>
        <div className="parent">
        <div className="div1 bg-white border border-gray-300 rounded-xl py-4 px-4 shadow flex flex-col items-center justify-center">
          <Title
            order={2}
            className="text-xl text-uvm-negro text-left self-start py-2"
          >
            Sesiones sin fallos
          </Title>
          <span className="text-base text-uvm-gris ">Porcentaje de sesiones sin fallos</span>
          <PieChart
            series={[
              {
                data: parseDataForPieChart(data),
                innerRadius: 60,
                outerRadius: 80,
                paddingAngle: 4,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 90,
                cy: 95,
              }
            ]}
            margin={{ top: 0, bottom: 0 }}
            
            hideLegend
          />
          <span className="absolute text-2xl my-2 text-uvm-gris" >
            {data.pieChart.value}%
          </span>
          <span className="text-base text-uvm-gris mb-4">
            Meta: <span className="font-bold text-uvm-negro">{data.pieChart.meta}%</span>
          </span>
        </div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
        <div className="div5"></div>
        <div className="div6"></div>
        <div className="div7"></div>
      </div>      
    </div>
  );
};

export default SaludAppWindow;