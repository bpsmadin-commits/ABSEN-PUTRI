export default async function handler(req, res) {
  const DB_URL = process.env.FIREBASE_DATABASE_URL ||
    "https://absenputri-5d8a1-default-rtdb.asia-southeast1.firebasedatabase.app";
  const apiKey = process.env.ABSENSI_API_KEY;
  const requestKey = req.headers["x-api-key"];
  const { tanggal, lembaga, status } = req.query;

  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method tidak didukung" });
  }
  if (!apiKey || requestKey !== apiKey) {
    return res.status(401).json({ error: "API key tidak valid" });
  }
  if (!tanggal || !/^\d{4}-\d{2}-\d{2}$/.test(String(tanggal))) {
    return res.status(400).json({ error: "Parameter tanggal wajib, format YYYY-MM-DD" });
  }
  if (status && !["H", "I", "A", "S"].includes(String(status).toUpperCase())) {
    return res.status(400).json({ error: "Status harus H, I, A, atau S" });
  }

  try {
    const absensiResponse = await fetch(`${DB_URL}/absensi.json`);
    if (!absensiResponse.ok) {
      throw new Error(`Firebase mengembalikan HTTP ${absensiResponse.status}`);
    }
    const absensi = await absensiResponse.json();
    const hasil = { tanggal, lembaga: lembaga || "semua", data: [] };

    for (const namaLembaga in absensi || {}) {
      if (lembaga && namaLembaga.toLowerCase() !== String(lembaga).toLowerCase()) continue;
      const dataTanggal = absensi[namaLembaga]?.[tanggal];
      if (!dataTanggal) continue;

      for (const key in dataTanggal) {
        const rec = dataTanggal[key];
        const statusData = String(rec.status || "").toUpperCase();
        if (status && statusData !== String(status).toUpperCase()) continue;
        hasil.data.push({
          guru: rec.guru,
          kelas: rec.kelas,
          jam: rec.jam,
          mapel: rec.mapel,
          status: statusData || null,
          lembaga: namaLembaga
        });
      }
    }

    hasil.total = hasil.data.length;
    return res.status(200).json(hasil);

  } catch (err) {
    return res.status(500).json({ error: "Gagal ambil data", message: err.message });
  }
}
