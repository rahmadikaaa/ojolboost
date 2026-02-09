import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DailyEarning } from '../types';
import { CHART_COLORS } from '../constants';
import ChartContainer from './ChartContainer';
import GeminiTips from './GeminiTips';

interface DailyEarningsChartProps {
  data: DailyEarning[];
}

const DailyEarningsChart: React.FC<DailyEarningsChartProps> = ({ data }) => {
  const [tips, setTips] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatYAxis = (tickItem: number) => `Rp${(tickItem / 1000).toLocaleString()}k`;

  const getEarningTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const dataString = data.map(d => `${d.day}: Rp${d.pendapatan.toLocaleString()}`).join(', ');
      const prompt = `Anda adalah penasihat ahli untuk pengemudi ojek online (ojol) di Indonesia. Berdasarkan data pendapatan harian berikut selama seminggu, berikan 3 tips yang singkat, padat, dan dapat ditindaklanjuti dalam Bahasa Indonesia untuk membantu pengemudi meningkatkan pendapatan mereka. Fokus pada tren yang terlihat dari data (misalnya, hari apa pendapatan tertinggi dan terendah). Format tips sebagai daftar bernomor (contoh: 1. ...). Data: ${dataString}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setTips(response.text);

    } catch (e) {
      console.error(e);
      setError("Gagal mendapatkan tips. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChartContainer title="📅 Pendapatan Harian">
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="day" stroke={CHART_COLORS.text} tick={{ fontSize: 12 }} />
            <YAxis stroke={CHART_COLORS.text} tick={{ fontSize: 12 }} tickFormatter={formatYAxis} />
            <Tooltip 
              contentStyle={{ backgroundColor: CHART_COLORS.tooltip, border: 'none', borderRadius: '0.5rem' }}
              labelStyle={{ color: CHART_COLORS.text }}
              formatter={(value: number) => [`Rp${value.toLocaleString()}`, 'Pendapatan']}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            <Line type="monotone" dataKey="pendapatan" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Pendapatan" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-white">Butuh Peningkatan?</h4>
            <button
              onClick={getEarningTips}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors flex items-center space-x-2"
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>{isLoading ? 'Menganalisa...' : 'Dapatkan Tips AI'}</span>
            </button>
        </div>
        <GeminiTips tips={tips} isLoading={isLoading} error={error} />
      </div>
    </ChartContainer>
  );
};

export default DailyEarningsChart;