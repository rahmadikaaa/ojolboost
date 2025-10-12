import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BusyHour } from '../types';
import { CHART_COLORS } from '../constants';
import ChartContainer from './ChartContainer';


interface BusyHoursChartProps {
  data: BusyHour[];
}

const BusyHoursChart: React.FC<BusyHoursChartProps> = ({ data }) => {
  return (
    <ChartContainer title="🕒 Jam Sibuk">
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis type="number" stroke={CHART_COLORS.text} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="jam" stroke={CHART_COLORS.text} width={50} tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: CHART_COLORS.tooltip, border: 'none', borderRadius: '0.5rem' }}
              labelStyle={{ color: CHART_COLORS.text }}
              formatter={(value: number) => [`${value} order`, 'Total']}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey="order" fill={CHART_COLORS.tertiary} name="Jumlah Order" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default BusyHoursChart;