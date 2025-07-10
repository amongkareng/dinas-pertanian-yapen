// File: upload-proxy.cjs (Versi Final dengan Validasi)

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const ServiceAccount = require("../ServiceAccount.json");

const app = express();
app.use(cors());
app.use(express.json());

// --- PERUBAHAN DIMULAI DARI SINI ---

// 1. Membuat fungsi filter untuk tipe file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // Terima file jika tipenya sesuai
  } else {
    // Tolak file jika tipenya tidak sesuai, dengan pesan error
    cb(new Error('Tipe file tidak diizinkan! Hanya .jpg, .png, dan .jpeg yang diperbolehkan.'), false);
  }
};

// 2. Konfigurasi Multer dengan limits dan fileFilter
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 // 1 MB dalam bytes (1 * 1024 * 1024)
  },
  fileFilter: fileFilter
});

// --- AKHIR DARI PERUBAHAN KONFIGURASI ---

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  storageBucket: "dinasyapen-admin.firebasestorage.app",
});

const bucket = getStorage().bucket();

// 3. Modifikasi endpoint untuk menangani error dari Multer
app.post("/upload", (req, res) => {
  const processFile = upload.single("file");

  processFile(req, res, async (err) => {
    // Menangkap error dari Multer (ukuran atau tipe file)
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "File terlalu besar, maksimal 1 MB." });
      }
      return res.status(400).json({ message: err.message });
    }

    // Lanjutkan jika tidak ada error
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Tidak ada file yang di-upload." });
      }

      const file = req.file;
      const filename = `berita/${Date.now()}-${file.originalname}`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      blobStream.on("error", (streamErr) => {
        console.error("Upload stream error:", streamErr);
        res.status(500).json({ message: "Upload error" });
      });

      blobStream.on("finish", async () => {
        try {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
          console.log("File is now public at:", publicUrl);
          res.status(200).json({ url: publicUrl });
        } catch (publicErr) {
          console.error("ERROR saat membuat file menjadi publik:", publicErr);
          res.status(500).json({ message: "Gagal membuat file menjadi publik." });
        }
      });

      blobStream.end(file.buffer);

    } catch (serverError) {
      console.error("Server error:", serverError);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
});

app.listen(4000, () => {
  console.log("✅ Proxy upload server berjalan di http://localhost:4000");
});