
export interface DailyEarning {
  day: string;
  pendapatan: number;
}

export interface TopArea {
  area: string;
  order: number;
  x: number;
  y: number;
}

export interface BusyHour {
  jam: string;
  order: number;
}

export interface WeatherInfluence {
  cuaca: string;
  order: number;
}

export interface FilterOptions {
  areas: string[];
  weather: string[];
  apps: string[];
}