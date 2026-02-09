
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import Filters from './components/Filters';
import MaximDataParser from './components/MaximDataParser';
import DailyEarningsChart from './components/DailyEarningsChart';
import AreaHeatmapChart from './components/AreaHeatmapChart';
import BusyHoursChart from './components/BusyHoursChart';
import WeatherInfluenceChart from './components/WeatherInfluenceChart';
import { DAILY_EARNINGS_DATA, TOP_AREAS_DATA, BUSY_HOURS_DATA, WEATHER_INFLUENCE_DATA, FILTER_OPTIONS_DATA } from './constants';

interface DailyEarning {
  day: string;
  pendapatan: number;
}

interface ImportedData {
  day: string;
  date: string;
  totalEarnings: number;
  orderCount: number;
}

const App: React.FC = () => {
  const [filters, setFilters] = useState({
    area: 'Semua Area',
    weather: 'Semua Cuaca',
    app: 'Semua Aplikasi',
  });

  const [earningsData, setEarningsData] = useState<DailyEarning[]>([]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
    // In a real app, you would refetch or filter data here.
    // For this demo, the data is static.
    console.log(`Filter changed: ${filterType} = ${value}`);
  };

  const handleMaximDataImport = (importedData: ImportedData[]) => {
    const newData = importedData.map(item => ({
      day: item.day,
      pendapatan: item.totalEarnings,
    }));
    
    setEarningsData(prevData => [...prevData, ...newData]);
    alert(`✅ ${importedData.length} data berhasil diimport!`);
  };

  const totalWeeklyEarnings = useMemo(() => {
    return earningsData.reduce((sum, day) => sum + day.pendapatan, 0);
  }, [earningsData]);

  const formattedTotalEarnings = `Rp${totalWeeklyEarnings.toLocaleString()}`;

  const ReceiptIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <main className="max-w-4xl mx-auto pb-8">
        <Header />
        <Filters options={FILTER_OPTIONS_DATA} onFilterChange={handleFilterChange} />
        
        <div className="px-4 sm:px-6 grid grid-cols-1 gap-6">
          <StatCard 
            title="Total Pendapatan Mingguan" 
            value={formattedTotalEarnings}
            icon={<ReceiptIcon />}
          />

          {/* Import Data Parser */}
          <MaximDataParser onImport={handleMaximDataImport} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyEarningsChart data={earningsData} />
            <AreaHeatmapChart data={TOP_AREAS_DATA} />
            <BusyHoursChart data={BUSY_HOURS_DATA} />
            <WeatherInfluenceChart data={WEATHER_INFLUENCE_DATA} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;