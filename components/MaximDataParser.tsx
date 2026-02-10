import React, { useState } from 'react';

// 1. Definisi Interface agar data konsisten
export interface DailyData {
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

  // 2. Fungsi Utama Parser
  const parseMaximData = (text: string): DailyData[] => {
    const dailyMap = new Map<string, DailyData>();
    const lines = text.split('\n');
    
    let currentDisplayDate = ''; 
    let currentDayName = '';
    let dateKeyForSorting = ''; // Format: YYYYMMDD

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Cek apakah baris ini adalah Tanggal (Format: 01.02 atau 01.02.2024)
      const dateMatch = trimmed.match(/^(\d{2})\.(\d{2})(?:\.(\d{4}))?$/);
      if (dateMatch) {
        const d = dateMatch[1];
        const m = dateMatch[2];
        const y = dateMatch[3] || new Date().getFullYear().toString();
        
        currentDisplayDate = `${d}.${m}.${y}`;
        dateKeyForSorting = `${y}${m}${d}`;
        currentDayName = getDayName(d, m, y);
        return;
      }

      // Cek apakah baris ini adalah Harga (Format: Rp21000 atau Rp 21.000)
      // Regex ini menangkap angka setelah "Rp" dan mengabaikan titik/spasi
      const earningsMatch = trimmed.match(/Rp\s?([\d.]+)/);
      if (earningsMatch && currentDisplayDate) {
        const amount = parseInt(earningsMatch[1].replace(/\./g, ''), 10);
        
        // Skip jika orderan Rp0 (biasanya orderan batal/ditolak)
        if (amount <= 0) return;

        const existing = dailyMap.get(currentDisplayDate) || {
          day: currentDayName,
          date: currentDisplayDate,
          totalEarnings: 0,
          orderCount: 0,
          sortKey: dateKeyForSorting // Properti bantuan sementara untuk sorting
        };

        existing.totalEarnings += amount;
        existing.orderCount += 1;
        dailyMap.set(currentDisplayDate, existing);
      }
    });

    // Ubah Map ke Array dan Urutkan dari tanggal terbaru ke terlama
    return Array.from(dailyMap.values())
      .sort((a: any, b: any) => b.sortKey.localeCompare(a.sortKey))
      .map(({ day, date, totalEarnings, orderCount }) => ({
        day, date, totalEarnings, orderCount
      }));
  };

  const getDayName = (day: string, month: string, year: string): string => {
    try {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date);
    } catch {
      return '???';
    }
  };

  // 3. Handlers
  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPastedData(text);
    setError('');

    if (text.trim()) {
      setIsLoading(true);
      try {
        const parsed = parseMaximData(text);
        setPreview(parsed);
        if (parsed.length === 0) {
          setError('⚠️ Data tidak terdeteksi. Pastikan format tanggal (01.02) dan harga (Rp) benar.');
        }
      } catch (err) {
        setError('❌ Terjadi kesalahan saat membaca data.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setPreview([]);
    }
  };

  const handleImport = () => {
    if (preview.length > 0) {
      onImport(preview);
      handleClear();
    }
  };

  const handleClear = () => {
    setPastedData('');
    setPreview([]);
    setError('');
  };

  const totalEarnings = preview.reduce((sum, item) => sum + item.totalEarnings, 0);
  const totalOrders = preview.reduce((sum, item) => sum + item.orderCount, 0);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6 border border-slate-700 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-yellow-500 p-1.5 rounded-lg text-slate-900 text-sm">MAXIM</span> 
          Import Riwayat
        </h2>
        {preview.length > 0 && (
           <button onClick={handleClear} className="text-slate-400 hover:text-red-400 text-sm transition">
             Bersihkan
           </button>
        )}
      </div>

      {/* Input Textarea */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Tempel Teks Riwayat Transaksi
        </label>
        <textarea
          value={pastedData}
          onChange={handlePaste}
          placeholder="Contoh:&#10;01.02&#10;Rp15000&#10;Rp20000"
          className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm text-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none shadow-inner"
        />
      </div>

      {/* Pesan Error */}
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm animate-pulse">
          {error}
        </div>
      )}

      {/* Preview Tabel */}
      {preview.length > 0 && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-slate-400 text-xs uppercase">Total Order</p>
              <p className="text-xl font-bold text-white">{totalOrders} <span className="text-sm font-normal text-slate-400">Trip</span></p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-slate-400 text-xs uppercase">Total Pendapatan</p>
              <p className="text-xl font-bold text-green-400">Rp {totalEarnings.toLocaleString('id-ID')}</p>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-700 scrollbar-thin scrollbar-thumb-slate-600">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-slate-800 text-slate-300">
                <tr>
                  <th className="p-3">Hari / Tanggal</th>
                  <th className="p-3 text-center">Order</th>
                  <th className="p-3 text-right">Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {preview.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 text-slate-300">
                      <span className="font-bold text-blue-400">{item.day}</span>, {item.date}
                    </td>
                    <td className="p-3 text-center text-slate-400">{item.orderCount}x</td>
                    <td className="p-3 text-right font-mono text-green-400">
                      Rp{item.totalEarnings.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleImport}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
          >
            Konfirmasi & Simpan ke Database
          </button>
        </div>
      )}

      {/* Petunjuk */}
      {!preview.length && (
        <div className="p-4 bg-slate-800/30 border border-dashed border-slate-700 rounded-xl">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-slate-200 font-bold block mb-1">Cara Pakai:</span>
            Buka aplikasi Maxim &gt; Riwayat &gt; Pilih Transaksi. Copy semua teks dan paste di sini. 
            Sistem akan otomatis menjumlahkan pendapatan harian Anda.
          </p>
        </div>
      )}
    </div>
  );
}