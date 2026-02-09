# OjolBoost Dashboard

## Deskripsi

OjolBoost Dashboard adalah dasbor analitik _mobile-first_ yang dirancang untuk membantu pengemudi ojek online (ojol) di Indonesia. Aplikasi ini menyediakan visualisasi data yang jelas untuk menganalisis pendapatan mingguan, mengidentifikasi area paling efektif, mengetahui jam sibuk, dan memahami pengaruh cuaca terhadap jumlah order.

Fitur unggulannya adalah integrasi dengan Google Gemini API untuk memberikan tips yang dipersonalisasi dan dapat ditindaklanjuti guna membantu pengemudi meningkatkan penghasilan mereka.

![Screenshot Dasbor OjolBoost](https://i.imgur.com/your-image-placeholder.png "Tampilan antarmuka utama Dasbor OjolBoost menampilkan berbagai grafik dan statistik.")

*(Catatan: Gambar di atas adalah placeholder. Seharusnya menampilkan screenshot aplikasi.)*

---

## Fitur Utama

-   **📈 Analisis Pendapatan Harian**: Grafik garis interaktif untuk melacak pendapatan setiap hari dalam seminggu, memudahkan identifikasi hari paling produktif.
-   **🔥 Peta Panas Area (Hotspot)**: Visualisasi area dengan jumlah order tertinggi menggunakan _scatter plot_ yang menyerupai peta panas, membantu pengemudi fokus pada lokasi strategis.
-   **🕒 Grafik Jam Sibuk**: Grafik batang yang menunjukkan jam-jam dengan order terbanyak, memungkinkan pengemudi mengoptimalkan waktu kerja mereka.
-   **🌤️ Pengaruh Cuaca**: Diagram lingkaran yang menggambarkan bagaimana kondisi cuaca (cerah, mendung, hujan) memengaruhi total order.
-   **💡 Tips Berbasis AI**: Tombol "Dapatkan Tips AI" pada grafik pendapatan harian yang memanggil Google Gemini API. AI akan menganalisis data pendapatan pengguna dan memberikan 3 tips singkat dan relevan untuk meningkatkan penghasilan.
-   **⚙️ Filter Dinamis**: Pengguna dapat memfilter data berdasarkan Area, Kondisi Cuaca, dan Aplikasi (Gojek, Grab, dll.) untuk analisis yang lebih mendalam.
-   **📱 Desain Responsif**: Antarmuka yang dioptimalkan untuk perangkat seluler, memastikan pengalaman pengguna yang lancar di mana saja.

---

## Tumpukan Teknologi

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **Visualisasi Data**: Recharts
-   **Integrasi AI**: Google Gemini API (`@google/genai`)

---

## Cara Kerja

Aplikasi ini dibangun sebagai _Single Page Application_ (SPA) menggunakan React.

1.  **Struktur Komponen**: Aplikasi dibagi menjadi komponen-komponen yang dapat digunakan kembali seperti `Header`, `StatCard`, `Filters`, dan berbagai komponen grafik (`DailyEarningsChart`, `AreaHeatmapChart`, dll.).
2.  **Manajemen State**: State utama, seperti filter yang aktif, dikelola di komponen `App.tsx` dan diwariskan ke komponen anak.
3.  **Data**: Saat ini, data yang ditampilkan bersifat statis dan diambil dari `constants.ts`. Struktur data ini dirancang agar mudah diganti dengan panggilan API ke backend sungguhan di masa depan.
4.  **Integrasi Gemini API**:
    -   Pada komponen `DailyEarningsChart`, terdapat tombol untuk memicu fungsi `getEarningTips`.
    -   Fungsi ini menyusun _prompt_ yang berisi data pendapatan harian pengguna.
    -   _Prompt_ tersebut dikirim ke model `gemini-2.5-flash` melalui pustaka `@google/genai`.
    -   Respons dari model (yang berisi tips) kemudian ditampilkan kepada pengguna melalui komponen `GeminiTips`, yang juga menangani status _loading_ dan _error_.

---

## Ringkasan Komponen

-   `App.tsx`: Komponen utama yang mengatur tata letak dan state global.
-   `components/Header.tsx`: Menampilkan judul dan deskripsi aplikasi.
-   `components/Filters.tsx`: Menyediakan filter _dropdown_ untuk data.
-   `components/StatCard.tsx`: Kartu untuk menampilkan statistik kunci seperti total pendapatan.
-   `components/ChartContainer.tsx`: Wadah standar untuk setiap grafik dengan judul.
-   `components/DailyEarningsChart.tsx`: Menampilkan grafik garis pendapatan dan mengintegrasikan fitur tips AI.
-   `components/AreaHeatmapChart.tsx`: Mensimulasikan peta panas area dengan _scatter plot_ kustom.
-   `components/BusyHoursChart.tsx`: Menampilkan grafik batang untuk jam sibuk.
-   `components/WeatherInfluenceChart.tsx`: Menampilkan diagram lingkaran untuk pengaruh cuaca.
-   `components/GeminiTips.tsx`: Komponen khusus untuk menampilkan hasil dari Gemini API.
# ojolboost
# ojolboost
# ojolboost
