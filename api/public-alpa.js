export default async function handler(req, res) {
  const DB_URL = process.env.FIREBASE_DATABASE_URL ||
    "https://absenputri-5d8a1-default-rtdb.asia-southeast1.firebasedatabase.app";
  const { tanggal, lembaga } = req.query;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method tidak didukung" });
  }
  if (!tanggal || !/^\d{4}-\d{2}-\d{2}$/.test(String(tanggal))) {
    return res.status(400).json({ error: "Parameter tanggal wajib, format YYYY-MM-DD" });
  }

  try {
    const response = await fetch(`${DB_URL}/absensi.json`);
    if (!response.ok) throw new Error(`Firebase mengembalikan HTTP ${response.status}`);
    const absensi = await response.json();
    const data = [];

    for (const namaLembaga in absensi || {}) {
      if (lembaga && namaLembaga.toLowerCase() !== String(lembaga).toLowerCase()) continue;
      const dataTanggal = absensi[namaLembaga]?.[tanggal] || {};
      for (const key in dataTanggal) {
        const rec = dataTanggal[key];
        if (String(rec.status || "").toUpperCase() !== "A") continue;
        data.push({
          guru: rec.guru,
          kelas: rec.kelas,
          jam: rec.jam,
          mapel: rec.mapel,
          lembaga: namaLembaga
        });
      }
    }

    return res.status(200).json({ tanggal, lembaga: lembaga || "semua", total: data.length, data });
  } catch (err) {
    return res.status(500).json({ error: "Gagal ambil data", message: err.message });
  }
}
