export default async function handler(req, res) {
  const DB_URL = "https://absenputri-5d8a1-default-rtdb.asia-southeast1.firebasedatabase.app";
  const { tanggal } = req.query;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    if (tanggal) {
      const absensi = await fetch(`${DB_URL}/absensi.json`).then(r => r.json());
      const hasil = { tanggal, alpa: [], izin: [], sakit: [] };

      for (const lembaga in absensi || {}) {
        const dataTanggal = absensi[lembaga]?.[tanggal];
        if (!dataTanggal) continue;

        for (const key in dataTanggal) {
          const rec = dataTanggal[key];
          const status = String(rec.status).toUpperCase();
          const data = { nama: rec.guru, kelas: rec.kelas, jam: rec.jam, mapel: rec.mapel, lembaga };

          if (status === "A") hasil.alpa.push(data);
          else if (status === "I") hasil.izin.push(data);
          else if (status === "S") hasil.sakit.push(data);
        }
      }

      return res.status(200).json(hasil);
    }

    const [absensi, jadwal] = await Promise.all([
      fetch(`${DB_URL}/absensi.json`).then(r => r.json()),
      fetch(`${DB_URL}/jadwal.json`).then(r => r.json())
    ]);
    return res.status(200).json({ absensi, jadwal });

  } catch (err) {
    return res.status(500).json({ error: "Gagal ambil data", message: err.message });
  }
}
