# Website Dinas Pertanian Kepulauan Yapen

Selamat datang di repository **Website Resmi Dinas Pertanian Kabupaten Kepulauan Yapen**. Project ini dibangun menggunakan React, Tailwind CSS, Firebase, dan Vite.

Website ini menampilkan halaman informasi publik seperti berita, struktur organisasi, program kegiatan, serta halaman admin untuk melakukan login dan manajemen data berita.

---

## 🛠️ Persiapan Awal (Untuk Pemula)

### 1. Install Node.js

> Node.js digunakan untuk menjalankan perintah `npm` dan menjalankan server React.

* Buka [https://nodejs.org](https://nodejs.org)
* Download **versi LTS** (Long Term Support)
* Install dengan pengaturan default
* Setelah selesai, buka **Command Prompt** dan ketik:

```bash
node -v
npm -v
```

Jika berhasil, akan muncul versi node dan npm.

---

### 2. Download Project Ini

**Opsi A: Dari GitHub (Jika familiar dengan Git)**

```bash
git clone https://github.com/amongkareng/dinas-pertanian-yapen.git
cd dinas-pertanian-yapen
```

**Opsi B: Dari File ZIP**

* Download file zip project dari GitHub
* Klik kanan > **Extract** (Ekstrak dulu)
* Masuk ke folder hasil ekstrak via Command Prompt:

```bash
cd C:\Users\NamaKamu\Downloads\dinas-pertanian-yapen-main
```

---

### 3. Install Semua Dependensi

Masih di dalam folder project, jalankan:

```bash
npm install
```

> Ini akan otomatis mengunduh semua library yang dibutuhkan seperti React, Tailwind, Firebase, dll.

---

### 4. Jalankan Aplikasi (Mode Developer)

```bash
npm run dev
```

Setelah berhasil, akan muncul link:

```
➜  Local: http://localhost:5173/
```

Klik atau salin link itu ke browser untuk membuka aplikasinya.

---

### 5. Konfigurasi Firebase (Opsional Untuk Admin dan Upload Berita)

* Buka file: `src/firebase.js`
* Ganti isinya dengan konfigurasi Firebase milikmu (didapat dari Firebase Console)

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

#### 5.1 Untuk Upload Gambar Berita:

* Pastikan file `ServiceAccount.json` tersedia di folder `src/`
* Jalankan proxy upload server (satu kali saja di terminal lain):

```bash
node src/upload-proxy.cjs
```

Akan muncul: `✅ Proxy upload server running on http://localhost:4000`

---

### 6. Struktur Folder Penting

```
src/
├── pages/              → Halaman utama publik
├── admin/              → Halaman dashboard admin
├── components/         → Komponen seperti Header, Footer, Hero
├── firebase.js         → Konfigurasi Firebase
├── upload-proxy.cjs    → Upload file ke Firebase Storage
```

---

### 7. Build Untuk Produksi (Optional)

Jika ingin meng-upload ke hosting:

```bash
npm run build
```

Hasilnya ada di folder `dist/`

---

## 🔐 Login Admin

* Email dan password login didaftarkan melalui Firebase Authentication.
* Setelah login, admin dapat menambahkan dan menghapus berita melalui dashboard.

---

## 🧠 FAQ (Pertanyaan Umum)

#### "Saya tidak bisa menjalankan `npm install`"

* Pastikan Node.js sudah ter-install
* Jalankan perintah di terminal dari folder yang benar

#### "Gambar tidak muncul di berita"

* Pastikan server proxy di `localhost:4000` sudah berjalan
* Pastikan kamu mengisi form berita dan upload gambar saat tambah berita

#### "Mau ubah tampilan?"

* Buka folder `components/` lalu ubah `Hero.jsx`, `Footer.jsx`, atau lainnya
* Styling menggunakan Tailwind CSS (kelas-kelas seperti `bg-green-900`, `text-center` dll)

---

## ✅ Siap Digunakan!

Jika kamu sampai di bagian ini dan semuanya berhasil, selamat! Kamu telah menjalankan aplikasi React modern untuk dinas pemerintahan.

Jika butuh bantuan atau menemukan bug, kamu bisa hubungi pemilik repo ini melalui GitHub atau langsung ke pengembang.

---

**© 2025 - Website Resmi Dinas Pertanian Kabupaten Kepulauan Yapen**
