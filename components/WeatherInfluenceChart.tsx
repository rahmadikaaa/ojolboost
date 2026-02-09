import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { WeatherInfluence } from '../types';
import { CHART_COLORS } from '../constants';
import ChartContainer from './ChartContainer';

interface WeatherInfluenceChartProps {
  data: WeatherInfluence[];
}

const WeatherInfluenceChart: React.FC<WeatherInfluenceChartProps> = ({ data }) => {
  return (
    <ChartContainer title="🌤️ Pengaruh Cuaca">
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="order"
              nameKey="cuaca"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS.pie[index % CHART_COLORS.pie.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: CHART_COLORS.tooltip, border: 'none', borderRadius: '0.5rem' }}
              formatter={(value: number, name: string) => [`${value} order`, name]}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default WeatherInfluenceChart;