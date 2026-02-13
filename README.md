# Facebook Video Downloader with Button Overlay

Userscript yang memudahkan pengunduhan video dari Facebook dengan menambahkan tombol download langsung di atas setiap video.

## ✨ Fitur

- **Tombol Download Overlay**: Tombol muncul di atas video Facebook dengan desain modern yang transparan
- **Download Langsung**: Unduh video tanpa membuka tab baru
- **Status Visual**: Indikator visual saat mengunduh (loading), berhasil, atau gagal
- **Auto-Detection**: Secara otomatis mendeteksi video baru saat scroll halaman
- **Dual Method**: Menggunakan dua metode fallback untuk memastikan video dapat diunduh
- **Kualitas HD**: Prioritas mengunduh video dalam kualitas HD jika tersedia

## 🚀 Instalasi

### Prerequisites
- Browser berbasis Chromium (Chrome, Edge, Brave, dll) atau Firefox
- Userscript Manager (Tampermonkey, Violentmonkey, atau Greasemonkey)

### Langkah-Langkah Instalasi

1. **Install Userscript Manager**
   - Chrome/Edge: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobblaa)
   - Firefox: [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) atau [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)

2. **Install Script**
   - Copy seluruh kode dari file `Facebook video downloader with button overlay-2.0.user.js`
   - Buka manager, klik "Create New Script"
   - Paste kode yang sudah dicopy
   - Save (Ctrl+S)

3. **Verifikasi**
   - Buka Facebook.com
   - Jika muncul pesan di console: "Facebook Video Downloader dengan tombol overlay berhasil dimuat!" - script sudah aktif

## 📖 Cara Penggunaan

1. **Buka Video Facebook**
   - Masuk ke Facebook.com
   - Scroll dan buka feed atau video yang ingin diunduh

2. **Klik Tombol Download**
   - Tombol "Download" akan muncul di atas video
   - Klik untuk mulai mengunduh

3. **Monitor Status**
   - **Mengunduh...**: Tombol berubah ke warna oranye saat proses berlangsung
   - **Berhasil!**: Tombol berubah hijau ketika download selesai
   - **Gagal!**: Tombol berubah merah jika ada error

## 🎨 Fitur Desain

- **Styling Modern**: Background transparan dengan blur effect
- **Smooth Animation**: Hover effect dengan smooth transition
- **Icon SVG**: Download icon yang jelas dan terlihat
- **Responsive**: Beradaptasi dengan berbagai ukuran video
- **Dark Mode Friendly**: Warna yang cocok di semua kondisi pencahayaan

## 🔧 Kompatibilitas

- ✅ Facebook.com
- ✅ Web.facebook.com
- ✅ Chrome/Chromium-based browsers
- ✅ Firefox
- ✅ Video dari timeline, pages, groups, dan shared links

## ⚠️ Catatan Penting

- Script hanya bekerja di halaman Facebook resmi
- Memerlukan internet connection yang stabil
- Beberapa video privat mungkin tidak bisa diunduh karena pembatasan Facebook
- Gunakan sesuai dengan kebijakan Facebook dan hukum lokal Anda

## 🐛 Troubleshooting

### Tombol tidak muncul
- Refresh halaman Facebook
- Pastikan script sudah enabled di userscript manager
- Check browser console (F12) untuk error messages

### Download gagal
- Kemungkinan video privat atau sudah dihapus
- Cek permissions Facebook Anda
- Coba refresh dan download kembali

### Performance lambat
- Tutup tab lainnya
- Clear browser cache
- Restart browser

## 📝 Changelog

### v2.0
- Menambahkan visual feedback (downloading, success, error states)
- Improved video detection dengan MutationObserver
- Better error handling dengan fallback methods
- Performance optimization

### v1.0
- Initial release
- Basic download functionality

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi

## 🤝 Kontribusi

Jika menemukan bug atau punya saran improvement:
1. Report issue dengan detail lengkap
2. Include screenshot jika relevan
3. Sertakan browser dan versi yang digunakan

## ⚖️ Disclaimer

Script ini dibuat untuk tujuan pembelajaran dan testing. Pengguna bertanggung jawab atas penggunaan script sesuai dengan kebijakan Facebook dan hukum lokal. Developer tidak bertanggung jawab atas penggunaan yang melanggar ToS Facebook atau hukum yang berlaku.

---

**Last Updated**: February 2026  
**Version**: 2.0  
**Author**: Modified version
