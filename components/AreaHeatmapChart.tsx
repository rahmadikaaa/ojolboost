import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TopArea } from '../types';
import { CHART_COLORS } from '../constants';
import ChartContainer from './ChartContainer';

interface AreaHeatmapChartProps {
  data: TopArea[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{backgroundColor: CHART_COLORS.tooltip, border: 'none', borderRadius: '0.5rem'}} className="p-3 rounded-lg shadow-lg">
        <p className="font-bold text-white">{data.area}</p>
        <p className="text-sm" style={{color: CHART_COLORS.text}}>{`${data.order} order`}</p>
      </div>
    );
  }
  return null;
};

// Custom shape for the heatmap points with pulsing animation
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const { order } = payload;
  
  const maxOrder = 120; // Based on constants
  const minOrder = 60; // Based on constants

  const scale = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (inMax - inMin === 0) return outMin;
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  
  const radius = scale(order, minOrder, maxOrder, 8, 25);
  
  // Scale from 0 to 1
  const value = scale(order, minOrder, maxOrder, 0, 1);
  // Interpolate from yellow (#facc15) to red (#ef4444)
  const r = Math.round(250 + (239 - 250) * value);
  const g = Math.round(204 + (68 - 204) * value);
  const b = Math.round(21 + (68 - 21) * value);
  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={color} fillOpacity={0.7} />
      <circle cx={cx} cy={cy} r={radius} fill="transparent" stroke={color} strokeWidth={2}>
        <animate 
          attributeName="r" 
          from={radius} 
          to={radius * 1.5}
          dur="2s" 
          begin="0s" 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="stroke-opacity" 
          from="1" 
          to="0" 
          dur="2s" 
          begin="0s" 
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};


const AreaHeatmapChart: React.FC<AreaHeatmapChartProps> = ({ data }) => {
  return (
    <ChartContainer title="🔥 Hotspot Area">
        <div className="h-64 sm:h-72 w-full" style={{ position: 'relative' }}>
            {/* Background Map SVG */}
            <svg 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
            >
                <path d="M50,50 Q100,20 150,50 T250,50 T350,80 L380,150 Q390,200 350,250 T250,300 Q200,320 150,350 T50,350 Q20,300 50,250 T50,150 Z" 
                fill="#0f172a" 
                stroke="#334155"
                strokeWidth="2" />
            </svg>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" hide={true} domain={[0, 400]} range={[0, 400]} />
                    <YAxis type="number" dataKey="y" hide={true} domain={[0, 400]} range={[0, 400]}/>
                    <Tooltip 
                        cursor={false}
                        content={<CustomTooltip />}
                    />
                    <Scatter data={data} shape={<CustomDot />} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    </ChartContainer>
  );
};

export default AreaHeatmapChart;