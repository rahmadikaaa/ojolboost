
import { DailyEarning, TopArea, BusyHour, WeatherInfluence, FilterOptions } from './types';

export const DAILY_EARNINGS_DATA: DailyEarning[] = [
  { day: 'Sen', pendapatan: 250000 },
  { day: 'Sel', pendapatan: 310000 },
  { day: 'Rab', pendapatan: 280000 },
  { day: 'Kam', pendapatan: 350000 },
  { day: 'Jum', pendapatan: 450000 },
  { day: 'Sab', pendapatan: 550000 },
  { day: 'Min', pendapatan: 480000 },
];

export const TOP_AREAS_DATA: TopArea[] = [
  { area: 'Sudirman', order: 120, x: 250, y: 200 },
  { area: 'Kuningan', order: 95, x: 280, y: 230 },
  { area: 'Blok M', order: 88, x: 220, y: 280 },
  { area: 'Kelapa Gading', order: 75, x: 350, y: 100 },
  { area: 'PIK', order: 60, x: 100, y: 80 },
];

export const BUSY_HOURS_DATA: BusyHour[] = [
  { jam: '07-09', order: 150 },
  { jam: '11-13', order: 110 },
  { jam: '16-18', order: 220 },
  { jam: '19-21', order: 180 },
];

export const WEATHER_INFLUENCE_DATA: WeatherInfluence[] = [
  { cuaca: 'Cerah', order: 650 },
  { cuaca: 'Mendung', order: 250 },
  { cuaca: 'Hujan', order: 450 },
];

export const FILTER_OPTIONS_DATA: FilterOptions = {
    areas: ['Semua Area', 'Sudirman', 'Kuningan', 'Blok M', 'Kelapa Gading', 'PIK'],
    weather: ['Semua Cuaca', 'Cerah', 'Mendung', 'Hujan'],
    apps: ['Semua Aplikasi', 'Gojek', 'Grab', 'Maxim']
};

export const CHART_COLORS = {
  primary: '#22c55e', // green-500
  secondary: '#3b82f6', // blue-500
  tertiary: '#f97316', // orange-500
  grid: '#334155', // slate-700
  tooltip: '#1e293b', // slate-800
  text: '#cbd5e1', // slate-300
  pie: ['#22c55e', '#f97316', '#3b82f6']
};