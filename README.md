# 🎬 Movie App

Aplikasi ini adalah sebuah platform berbasis **React + Vite** yang memungkinkan pengguna untuk mencari film, melihat detail film, dan melakukan filter berdasarkan berbagai kategori menggunakan **API TMDB**.

## 🚀 Cara Menjalankan Aplikasi

### 1️⃣ **Clone Repository**

```sh
git clone https://github.com/sakabayul/website-catalog-movie.git
cd website-catalog-movie
```

### 2️⃣ **Install Dependencies**

Pastikan telah menginstal **Node.js (versi 16+)** dan jalankan perintah berikut untuk menginstal semua dependensi:

```sh
npm install
```

### 3️⃣ **Tambahkan API Key TMDB**

Buat file **.env** di root proyek dan tambahkan API Key TMDB:

```sh
VITE_TMDB_API_KEY=api_key_here
VITE_TMDB_BASE_URL= "https://api.themoviedb.org/3"
```

### 4️⃣ **Jalankan Aplikasi**

Jalankan perintah berikut untuk menjalankan server pengembangan:

```sh
npm run dev
```

Aplikasi akan berjalan di [**http://localhost:5173/**](http://localhost:5173/) secara default.

---

## 🎥 Cara Menggunakan Aplikasi

1️⃣ **Mencari Film:**

- Gunakan fitur **search** di halaman utama untuk mencari film yang di inginkan.

2️⃣ **Menjelajahi Film Berdasarkan Kategori:**

- Tersedia kategori seperti **Trending, Popular, dan Top Rated**.

3️⃣ **Melihat Detail Film:**

- Klik salah satu film untuk melihat detailnya, termasuk **sinopsis, pemeran, dan trailer**.

4️⃣ **Menonton Trailer:**

- Klik tombol play di bagian trailer untuk membuka modal video.

5️⃣ **Menggunakan Filter:**

- Filter berdasarkan **genre, tahun rilis, dan bahasa**.

---

## 🧪 Cara Menjalankan Pengujian

Aplikasi ini menggunakan **Vitest** untuk pengujian.

### **Menjalankan Semua Tes**

```sh
npm run test
```

### **Menjalankan Tes dengan Watch Mode**

```sh
npm run test --watch
```

---

## 🛠️ Teknologi yang Digunakan

- **React + Vite**
- **Tailwind CSS**
- **Axios** (Untuk mengambil data dari TMDB API)
- **React Query** (Untuk manajemen state data dari API)
- **Vitest** (Untuk pengujian)

📌 **Catatan:** Pastikan memiliki **koneksi internet** karena aplikasi ini mengambil data langsung dari API TMDB.
