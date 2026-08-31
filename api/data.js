export default async function handler(req, res) {
  const DB_URL = "https://absenputri-5d8a1-default-rtdb.asia-southeast1.firebasedatabase.app";
  const { tanggal } = req.query;

  try {
    const [absensiRes, jadwalRes] = await Promise.all([
      fetch(`${DB_URL}/absensi.json`),
      fetch(`${DB_URL}/jadwal.json`)
    ]);

    let absensi = await absensiRes.json();
    const jadwal = await jadwalRes.json();

    if (tanggal) {
      const hasil = {};
      for (const lembaga in absensi) {
        if (absensi[lembaga][tanggal]) {
          hasil[lembaga] = { [tanggal]: absensi[lembaga][tanggal] };
        }
      }
      absensi = hasil;
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(
      "=== DATA ABSENSI" + (tanggal ? ` (${tanggal})` : "") + " ===\n" +
      JSON.stringify(absensi, null, 2) +
      (tanggal ? "" : "\n\n=== DATA JADWAL ===\n" + JSON.stringify(jadwal, null, 2))
    );
  } catch (err) {
    res.status(500).send("Gagal ambil data: " + err.message);
  }
}
