import { useState } from 'react';

interface DailyData {
  day: string;
  date: string;
  totalEarnings: number;
  orderCount: number;
}

interface MaximDataParserProps {
  onImport: (data: DailyData[]) => void;
}

export default function MaximDataParser({ onImport }: MaximDataParserProps) {
  const [pastedData, setPastedData] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<DailyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseMaximData = (text: string): DailyData[] => {
    const dailyMap = new Map<
      string,
      {
        day: string;
        date: string;
        earnings: number;
        count: number;
      }
    >();

    const lines = text.split('\n');
    let currentDate = '';
    let currentDay = '';
    let totalEarnings = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      // Match date pattern: DD.MM atau DD.MM.YYYY
      const dateMatch = line.match(/^(\d{2})\.(\d{2})(?:\.(\d{4}))?$/);
      if (dateMatch) {
        // Save previous day's data if exists
        if (currentDate && totalEarnings > 0) {
          const key = currentDate;
          const existing = dailyMap.get(key) || {
            day: currentDay,
            date: currentDate,
            earnings: 0,
            count: 0,
          };
          existing.earnings += totalEarnings;
          existing.count += 1;
          dailyMap.set(key, existing);
          totalEarnings = 0;
        }

        currentDate = line;
        currentDay = getDayName(dateMatch[1], dateMatch[2], dateMatch[3] || new Date().getFullYear().toString());
        continue;
      }

      // Match earnings: Rp followed by numbers
      const earningsMatch = line.match(/^Rp(\d+)$/);
      if (earningsMatch && currentDate) {
        const amount = parseInt(earningsMatch[1], 10);
        totalEarnings += amount;
      }
    }

    // Save last day's data
    if (currentDate && totalEarnings > 0) {
      const key = currentDate;
      const existing = dailyMap.get(key) || {
        day: currentDay,
        date: currentDate,
        earnings: 0,
        count: 0,
      };
      existing.earnings += totalEarnings;
      existing.count += 1;
      dailyMap.set(key, existing);
    }

    // Convert map to array and sort by date (descending)
    const result = Array.from(dailyMap.values()).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return result;
  };

  const getDayName = (day: string, month: string, year: string): string => {
    try {
      const d = parseInt(day, 10);
      const m = parseInt(month, 10) - 1;
      const y = parseInt(year, 10);
      const date = new Date(y, m, d);
      const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      return dayNames[date.getDay()];
    } catch {
      return 'Unknown';
    }
  };

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPastedData(text);
    setError('');

    if (text.trim()) {
      try {
        setIsLoading(true);
        const parsed = parseMaximData(text);
        setPreview(parsed);

        if (parsed.length === 0) {
          setError('⚠️ Data tidak terdeteksi. Pastikan format sesuai data Maxim');
        }
      } catch (err) {
        setError(`❌ Error parsing: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setPreview([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setPreview([]);
    }
  };

  const handleImport = () => {
    if (preview.length === 0) {
      setError('❌ Tidak ada data untuk diimport');
      return;
    }

    const importData = preview.map(item => ({
      day: item.day,
      date: item.date,
      totalEarnings: item.earnings,
      orderCount: item.count,
    }));

    onImport(importData);
    setPastedData('');
    setPreview([]);
    setError('');
  };

  const handleClear = () => {
    setPastedData('');
    setPreview([]);
    setError('');
  };

  const totalEarnings = preview.reduce((sum, item) => sum + item.earnings, 0);
  const totalOrders = preview.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6 mb-6 border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-slate-100 flex items-center gap-2">
        <span className="text-2xl">📱</span> Import Data Maxim/Gojek
      </h2>

      {/* Input Area */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Paste Riwayat Transaksi:
        </label>
        <textarea
          value={pastedData}
          onChange={handlePaste}
          placeholder="Copy-paste seluruh riwayat transaksi dari aplikasi Maxim"
          className="w-full h-40 bg-slate-700 border-2 border-slate-600 rounded-lg p-3 font-mono text-sm text-slate-100 focus:border-blue-500 focus:outline-none resize-none placeholder-slate-500 transition"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-950 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Daily Summary Preview */}
      {preview.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <span>✅</span> Ringkasan Per Hari ({preview.length} hari, {totalOrders} order)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-slate-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-600">
                  <th className="border border-slate-500 p-3 text-left text-slate-200">Tanggal</th>
                  <th className="border border-slate-500 p-3 text-center text-slate-200">Hari</th>
                  <th className="border border-slate-500 p-3 text-right text-slate-200">Order</th>
                  <th className="border border-slate-500 p-3 text-right text-slate-200">Total Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((item, idx) => (
                  <tr key={idx} className="border-t border-slate-600 hover:bg-slate-600 transition">
                    <td className="border border-slate-500 p-3 text-slate-200 font-medium">{item.date}</td>
                    <td className="border border-slate-500 p-3 text-center text-slate-300">{item.day}</td>
                    <td className="border border-slate-500 p-3 text-right text-slate-300">{item.count}x</td>
                    <td className="border border-slate-500 p-3 text-right font-bold text-green-400">
                      Rp {item.earnings.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-600 font-bold text-slate-100">
                  <td colSpan={2} className="border border-slate-500 p-3">Total</td>
                  <td className="border border-slate-500 p-3 text-right">{totalOrders}x</td>
                  <td className="border border-slate-500 p-3 text-right text-green-400">
                    Rp {totalEarnings.toLocaleString('id-ID')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleImport}
          disabled={preview.length === 0 || isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white py-2 rounded-lg font-semibold transition disabled:cursor-not-allowed"
        >
          {isLoading ? '⏳ Processing...' : `✅ Import ${preview.length} Hari`}
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-slate-600 hover:bg-slate-700 text-slate-200 py-2 rounded-lg font-semibold transition"
        >
          🗑️ Hapus
        </button>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-300">
        <p className="font-semibold mb-2">💡 Format yang diterima:</p>
        <ul className="space-y-1 ml-4 list-disc text-slate-400">
          <li>Tanggal: <code className="bg-slate-600 px-1 rounded text-slate-200">01.02</code> atau <code className="bg-slate-600 px-1 rounded text-slate-200">01.02.2026</code></li>
          <li>Pendapatan: <code className="bg-slate-600 px-1 rounded text-slate-200">Rp2184</code></li>
          <li>Secara otomatis menghitung total per hari</li>
          <li>Menghilangkan order yang dibatalkan</li>
        </ul>
      </div>
    </div>
  );
}
