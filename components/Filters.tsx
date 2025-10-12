
import React from 'react';
import { FilterOptions } from '../types';

interface FiltersProps {
  options: FilterOptions;
  onFilterChange: (filterType: string, value: string) => void;
}

const FilterSelect: React.FC<{
  label: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, options, onChange }) => (
  <div className="flex-1 min-w-[120px]">
    <label htmlFor={label} className="sr-only">{label}</label>
    <select
      id={label}
      onChange={onChange}
      className="w-full bg-slate-700 text-white border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const Filters: React.FC<FiltersProps> = ({ options, onFilterChange }) => {
  return (
    <div className="p-4 sm:p-6 flex flex-wrap gap-4">
        <FilterSelect 
            label="Area"
            options={options.areas}
            onChange={(e) => onFilterChange('area', e.target.value)}
        />
        <FilterSelect 
            label="Cuaca"
            options={options.weather}
            onChange={(e) => onFilterChange('weather', e.target.value)}
        />
        <FilterSelect 
            label="Aplikasi"
            options={options.apps}
            onChange={(e) => onFilterChange('app', e.target.value)}
        />
    </div>
  );
};

export default Filters;
