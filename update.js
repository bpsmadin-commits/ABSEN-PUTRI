const fs = require('fs');
let content = fs.readFileSync('D:\\APK ABSEN PI\\index.html', 'utf8');

// Remove downloadTemplateCsv function
const startIdx = content.indexOf('    function downloadTemplateCsv() {');
const endIdx = content.indexOf('    function showStatusCsv(msg, type) {');
if (startIdx === -1 || endIdx === -1) { console.log('ERROR finding downloadTemplateCsv'); process.exit(1); }
content = content.substring(0, startIdx) + content.substring(endIdx);

// Replace uploadCsvFile and helper functions
const uploadStart = content.indexOf('    function uploadCsvFile(file) {');
const uploadEnd = content.indexOf('    loadSemuaData();');
if (uploadStart === -1 || uploadEnd === -1) { console.log('ERROR finding uploadCsvFile'); process.exit(1); }

const newCode = `    function showStatusCsv(msg, type) {
      const st = $('statusCsv');
      st.innerHTML = msg;
      st.className = 'status-box status-' + type;
      st.style.display = 'block';
      setTimeout(() => { st.style.display = 'none'; }, 5000);
    }

    const CLASS_MAP = { 'ألرابع J': 'IV J', 'ألرابع K': 'IV K', 'ألرابع L': 'IV L', 'ألرابع M': 'IV M', 'ألرابع N': 'IV N', 'الخامس G': 'V G', 'الخامس H': 'V H', 'الخامس I': 'V I', 'الخامس J': 'V J', 'السادس G': 'VI G', 'السادس H': 'VI H', 'السادس I': 'VI I', 'السادس J': 'VI J' };

    const MAPEL_MAP = { 'بداية الهداية': 'Bidayatul Hidayah', 'تنقيح القول': 'Tanqihul Qoul', 'مختصر جدا': 'Mukhtashar Jiddan', 'مختصر جدا ': 'Mukhtashar Jiddan', 'مبادئ الفقهية': 'Mushohab Fiqhiyyah', 'التصريف': 'Tashrih', 'خلاصة نور اليقين': 'Khulashatul Nur Yaqin', 'اخلاق للبنات': 'Akhlaq Lil Banat', 'تمرين ( مختصر جدا )': 'Tamrin (Mukhtashar)', 'جواهر الكلامية': 'Jawahir Kalamiyyah', 'رياض البديعة': 'Riyadhul Badi\\'ah', 'عقود للجين': 'Uquud Lil Jeen', 'الاربعين النواوية': 'Al-Arba\\'in Nawawiyyah', 'العصفورية': 'Al-Ashfuriyyah', 'الامثلة التصريفية': 'Al-Atsal Tashriifiyyah', 'هداية الاذكياء': 'Hidayatul Adzkiya', 'قواعد الاعلال': 'Qawa\\'idul I\\'lal', 'فتح القريب': 'Fathul Qarib', 'قطر الغيث': 'Qouthrul Ghaits', 'نظم العوامل': 'Nazhul Amil', 'شرح الورقات': 'Syurhul Waraqat', 'نظم العريطى': 'Nazhul Arithi', 'كفاية العوام': 'Kifayatul Awam', 'تسهيل نيل المعاني': 'Tashil Nilil Ma\\'ani', 'قاعدة كيلاني عزي': 'Qa\\'idatul Kilani \\'Izzi', 'متن الزبد': 'Matnut Zamrut', 'منح السنية': 'Manhus Saniyyah', 'بلوغ المرام': 'Bulughul Marom', 'تفسير يس': 'Tafsir Yaa Siin' };

    const GURU_MAP = { 'الأستاذ إيندرا وحيودى': 'Ustadz Indra Wahyudi', 'الاستاذ إيندرا وحيودى': 'Ustadz Indra Wahyudi', 'الأستاذ بدر الدين': 'Ustadz Badruddin', 'الاستاذ بدر الدين': 'Ustadz Badruddin', 'الأستاذ مصباح المنير': 'Ustadz Misykatul Munir', 'الاستاذ مصباح المنير': 'Ustadz Misykatul Munir', 'الأستاذ حاري يوديانطا': 'Ustadz Hariyudianta', 'الاستاذ حاري يوديانطا': 'Ustadz Hariyudianta', 'الأستاذ محمد خليلي': 'Ustadz Muhammad Khalili', 'الاستاذ محمد خليلي': 'Ustadz Muhammad Khalili', 'الأستاذ علي مكي': 'Ustadz Ali Makki', 'الاستاذ علي مكي': 'Ustadz Ali Makki', 'الأستاذ علي مغكي': 'Ustadz Ali Makki', 'الاستاذ علي مغكي': 'Ustadz Ali Makki', 'الأستاذ خير الأمم': 'Ustadz Khairul Umam', 'الاستاذ خير الأمم': 'Ustadz Khairul Umam', 'الأستاذ أحمد ريحان': 'Ustadz Ahmad Rayhan', 'الاستاذ أحمد ريحان': 'Ustadz Ahmad Rayhan', 'الأستاذ محمد شرطا': 'Ustadz Muhammad Syartha', 'الاستاذ محمد شرطا': 'Ustadz Muhammad Syartha', 'الأستاذ بخاري مسلم': 'Ustadz Bukhori Muslim', 'الاستاذ بخاري مسلم': 'Ustadz Bukhori Muslim', 'الأستاذ بهاء الدين': 'Ustadz Bahauddin', 'الاستاذ بهاء الدين': 'Ustadz Bahauddin', 'الأستاذ محمد محيى': 'Ustadz Muhammad Muhyin', 'الاستاذ محمد محيى': 'Ustadz Muhammad Muhyin', 'الأستاذ نور حافي': 'Ustadz Nurl Haifi', 'الاستاذ نور حافي': 'Ustadz Nurl Haifi', 'الأستاذ نور عارفين': 'Ustadz Nurl Arifin', 'الاستاذ نور عارفين': 'Ustadz Nurl Arifin', 'الأستاذ بسطامي مسلم': 'Ustadz Mustomi Muslim', 'الاستاذ بسطامي مسلم': 'Ustadz Mustomi Muslim', 'الأستاذ علي وفى': 'Ustadz Ali Wafa', 'الاستاذ علي وافى': 'Ustadz Ali Wafa', 'الأستاذ عبد المجيب': 'Ustadz Abdul Majib', 'الاستاذ عبد المجيب': 'Ustadz Abdul Majib', 'الأستاذ محمد حسين': 'Ustadz Muhammad Husen', 'الاستاذ محمد حسين': 'Ustadz Muhammad Husen', 'الأستاذ عبد القادر': 'Ustadz Abdul Qodir', 'الأستاذ شريف هداية': 'Ustadz Syarif Hidayah', 'الأستاذ عبد الرحمن': 'Ustadz Abdurrahman', 'الاستاذ أحمد مولنا': 'Ustadz Ahmad Mulna', 'الاستاذ مكيل العلوم': 'Ustadz Ma\\'kul Ulum' };

    function parseExcelGrid(rawData) {
      const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Sabtu'];
      const dayCols = [10, 8, 6, 4, 2, 0];
      let guruTable = {};
      for (let i = rawData.length - 1; i >= 0; i--) {
        const row = rawData[i];
        if (!row || row.length < 2) continue;
        let hasGuru = false;
        for (let j = 0; j < row.length - 1; j++) {
          const val = row[j];
          if (val && typeof val === 'string' && val.includes('الأستاذ')) { hasGuru = true; break; }
        }
        if (hasGuru) {
          for (let j = 0; j < row.length - 1; j += 2) {
            const nama = row[j]; const kode = row[j + 1];
            if (nama && kode) { const namaStr = String(nama).trim(); const kodeNum = Number(kode); if (GURU_MAP[namaStr]) guruTable[kodeNum] = GURU_MAP[namaStr]; }
          }
          break;
        }
      }
      const jadwal = {}; days.forEach(h => { jadwal[h] = []; });
      let i = 4;
      while (i < rawData.length) {
        const row = rawData[i];
        if (!row || row.length < 13) { i++; continue; }
        const kelasRaw = row[row.length - 1];
        if (!kelasRaw || !String(kelasRaw).trim()) { i++; continue; }
        const kelas = CLASS_MAP[String(kelasRaw).trim()] || String(kelasRaw).trim();
        const row2 = rawData[i + 1];
        if (!row2) { i++; continue; }
        dayCols.forEach((col, idx) => {
          const mapel1 = row[col]; const guruCode1 = row[col + 1];
          const mapel2 = row2[col]; const guruCode2 = row2[col + 1];
          if (mapel1 && String(mapel1).trim()) { const mapelLatin = MAPEL_MAP[String(mapel1).trim()] || String(mapel1).trim(); const guru = guruTable[Number(guruCode1)] || 'Unknown'; jadwal[days[idx]].push({ kelas, jam: 'Jam 1', mapel: mapelLatin, guru }); }
          if (mapel2 && String(mapel2).trim()) { const mapelLatin = MAPEL_MAP[String(mapel2).trim()] || String(mapel2).trim(); const guru = guruTable[Number(guruCode2)] || 'Unknown'; jadwal[days[idx]].push({ kelas, jam: 'Jam 2', mapel: mapelLatin, guru }); }
        });
        i += 2;
      }
      return jadwal;
    }

    function uploadCsvFile(file) {
      if (!file) return;
      const status = $('statusCsv');
      status.innerHTML = '⏳ Memproses file...';
      status.className = 'status-box';
      status.style.display = 'block';
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = e.target.result;
          const wb = XLSX.read(data, { type: 'array' });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const jadwal = parseExcelGrid(rawData);
          let totalItems = 0; Object.values(jadwal).forEach(arr => { totalItems += arr.length; });
          if (totalItems === 0) { showStatusCsv('❌ Tidak ada data yang bisa dibaca dari file.', 'error'); return; }
          const hariList = Object.keys(jadwal).filter(h => jadwal[h].length > 0);
          const confirmMsg = '⚠️ Upload akan MENGGANTIKAN jadwal ' + cfg.lembaga + ':\n\n' + hariList.map(h => '• ' + h + ': ' + jadwal[h].length + ' jadwal').join('\n') + '\n\nTotal: ' + totalItems + ' jadwal\nYakin ingin melanjutkan?';
          if (!confirm(confirmMsg)) { status.style.display = 'none'; return; }
          kirimJadwalKeFirebase(cfg.lembaga, jadwal);
          jadwalAktif = jadwal; saveJadwalCustom(); renderFormPengaturan(); renderSemuaHari($('tanggal').value); renderListGuruWa();
          showStatusCsv('✅ Berhasil import ' + totalItems + ' jadwal ' + cfg.lembaga + '.', 'success');
        } catch (err) { showStatusCsv('❌ Gagal memproses file: ' + err.message, 'error'); }
      };
      reader.onerror = function() { showStatusCsv('❌ Gagal membaca file.', 'error'); };
      reader.readAsArrayBuffer(file);
    }
`;

content = content.substring(0, uploadStart) + newCode + '\n\n' + content.substring(uploadEnd);
fs.writeFileSync('D:\\APK ABSEN PI\\index.html', content, 'utf8');
console.log('SUCCESS: File updated');
