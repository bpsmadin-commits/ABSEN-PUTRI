# Absen Putri

Aplikasi absensi dan jadwal pelajaran untuk pondok pesantren. Bisa dibuka lewat browser atau dipasang sebagai APK di HP.

## Fitur

- Absensi harian: Hadir / Izin / Alpa per sesi
- Rekap bulanan: ringkasan per santri
- Kirim laporan WhatsApp
- Jadwal pelajaran per hari dan kelas
- Dark mode
- Login admin: cuma admin yang bisa edit absensi dan jadwal
- Data tersimpan di Firebase Realtime Database
- Install sebagai aplikasi (Add to Home Screen)

## Cara Pakai

### Browser

Buka `index.html` lewat server statis apapun, atau buka langsung via `file://`. Disarankan pakai HTTPS kalau deploy.

### Pasang sebagai APK (TWA / WebView)

Gunakan Bubblewrap (TWA) atau WebView APK Generator. Pastikan URL yang dipakai sudah HTTPS.

## Setup Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Realtime Database** dan set rules:

```json
{
  "rules": {
    "absensi": {
      "$lembaga": {
        "$tanggal": {
          "$key": {
            ".read": true,
            ".write": "auth != null && root.child('roles').child(auth.uid).val() === 'admin'"
          }
        }
      },
      "jadwal": {
        "$lembaga": {
          ".read": true,
          ".write": "auth != null && root.child('roles').child(auth.uid).val() === 'admin'"
        }
      },
      "roles": {
        ".read": "auth != null",
        ".write": "auth != null && root.child('roles').child(auth.uid).val() === 'admin'"
      }
    }
  }
}
```

3. Enable **Anonymous auth** dan **Google auth**.
4. Salin config Firebase dan ganti isinya di `index.html` bagian `firebaseConfig`.
5. Daftarkan UID admin di `roles/<UID>` dengan value `"admin"`.

## API untuk AI

Endpoint `api/data.js` dapat di-deploy ke Vercel atau platform serverless lain.
Endpoint ini hanya menerima `GET`, wajib memakai header `x-api-key`, dan wajib
memakai parameter tanggal:

```text
GET https://domain-api-kamu.vercel.app/api/data?tanggal=2026-09-04&lembaga=MID&status=A
x-api-key: API_KEY_RAHASIA
```

Atur environment variable berikut di platform deployment:

- `ABSENSI_API_KEY`: API key rahasia untuk GPT, Claude, atau Gemini.
- `FIREBASE_DATABASE_URL`: URL Firebase (opsional, sudah ada nilai default).
- `ALLOWED_ORIGIN`: domain yang boleh melakukan request browser (opsional).

Jangan menaruh API key di `app.js`, GitHub Pages, atau prompt publik. Untuk
Custom GPT, masukkan API key sebagai authentication header pada Action.

### Endpoint publik alpa

Untuk dipakai dari GPT umum tanpa Action, tersedia endpoint terbatas:

```text
https://absen-putri.vercel.app/api/public-alpa?tanggal=2026-09-04&lembaga=MID
```

Endpoint ini tidak memerlukan API key dan hanya mengembalikan data berstatus
`A` (Alpa). Siapa pun yang mengetahui URL dapat membacanya.

## Daftar Admin

Setiap Google akun yang login akan dicek di `roles/<UID>`. Kalau nilainya `"admin"`, akun tersebut bisa edit data. Kalau belum, tampilkan UID dan minta didaftarkan lewat Firebase Console.

## Jadwal Default

Jadwal awal tersimpan di `index.html` pada bagian `defaultDataMID`. Untuk mengganti, edit array tersebut atau hapus dan isi manual lewat halaman Seting setelah login sebagai admin.

## Build / Deploy

- Deploy ke hosting statis apapun (Netlify, Vercel, GitHub Pages, Firebase Hosting).
- Pastikan service worker (`sw.js`) ikut ter-deploy agar bisa offline.
- Set `start_url` dan `scope` di `manifest.webmanifest` sesuai URL host.

## Lisensi

Proprietary - Hak cipta milik pengembang. Dilarang disebarluaskan tanpa izin.
