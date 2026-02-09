# 📝 CONTOH DATA UNTUK TESTING

Copy-paste salah satu contoh di bawah ke textarea untuk test fitur parser.

## ✨ Contoh 1: Data Minimal (3 hari)

```
01.02
01.02.2026
20:24
Komisi
Rp2184
Tunai
Rp18200

02.02
02.02.2026
18:18
Komisi
Rp1299
Tunai
Rp11500

03.02
03.02.2026
10:21
Komisi
Rp1824
Tunai
Rp15200
```

**Hasil parsing:**
- 3 hari data
- Total: Rp 48.223

---

## ✨ Contoh 2: Data Lengkap (Format Maxim Sesungguhnya)

```
01.02
01.02.2026

20:24

Komisi

Rp2184

Tunai

Rp18200

Superindo Bintaro (daerah Pesanggrahan)
Jalan Bintaro Raya
Rumah Vespa (daerah Pesanggrahan)
Jalan Masjid Darul Fallah
Selengkapnya
01.02.2026

18:18

Komisi

Rp1299

Tunai

Rp11500

Raja Susu Bintaro (daerah Pesanggrahan)
Jalan Kesehatan Raya
Mantep Jaya Motor
Tangerang Selatan
Selengkapnya
31.01
31.01.2026

19:36

Komisi

Rp2172

Tunai

Rp18100

Jalan Rawa Papan, 127 (daerah Pesanggrahan)
Jalan Simprug Garden, F3 (daerah Kebayoran Lama)
Selengkapnya
31.01.2026

18:55

Komisi

Rp996

Tunai

Rp11200

Taman Cenderawasih (daerah Pesanggrahan)
Jalan Bintaro Taman Timur
Stasiun Pondok Ranji
Tangerang Selatan
Selengkapnya
```

**Hasil parsing:**
- 3 hari data
- Total: 4 order
- Total earnings: Rp 62.187

---

## ✨ Contoh 3: Data dengan Order Dibatalkan

```
05.02
05.02.2026

15:30

Komisi

Rp1500

Tunai

Rp12500

Lokasi Pickup A
Lokasi Dropoff A
Selengkapnya
05.02.2026

16:00

Dibatalkan

Lokasi Pickup B
Lokasi Dropoff B
Selengkapnya
05.02.2026

17:15

Komisi

Rp2000

Tunai

Rp16700

Lokasi Pickup C
Lokasi Dropoff C
Selengkapnya
```

**Hasil parsing:**
- 1 hari data
- Total: 2 order (order dibatalkan tidak dihitung)
- Total earnings: Rp 29.200

---

## ✨ Contoh 4: Data Panjang (Simulasi 2 Minggu)

Gunakan data dari user request di atas (full data dari 01.02 sampai 03.01).
Parser akan:
- Auto-detect ~40+ transaksi
- Group per hari
- Calculate total per hari
- Show preview table

---

## 🎯 Testing Checklist

Setelah paste data, verifikasi:

- [ ] Data ter-parse tanpa error
- [ ] Preview table muncul
- [ ] Jumlah hari sesuai
- [ ] Total earnings sesuai perhitungan manual
- [ ] Tombol "Import" aktif (tidak disabled)
- [ ] Setelah import, alert muncul
- [ ] Data muncul di chart
- [ ] Total pendapatan di stat card terupdate

---

## 🐛 Test Error Handling

### Test 1: Format Invalid
```
Paste teks random atau format salah
Expected: Error message + preview kosong
```

### Test 2: Data Kosong
```
Paste string kosong
Expected: Disabled import button
```

### Test 3: Partial Data
```
Paste hanya tanggal tanpa earnings
Expected: Preview kosong atau partial data
```

---

## 💡 Tips untuk Testing

1. **Buka browser console** (F12) untuk melihat debug info
2. **Inspect element** textarea untuk confirm data ter-paste
3. **Check Network tab** jika ada API call (untuk future feature)
4. **Test di mobile** juga untuk UX responsiveness

---

**Last Updated**: 9 Feb 2026
