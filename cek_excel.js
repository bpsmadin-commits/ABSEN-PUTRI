const XLSX = require('xlsx');
const path = 'D:\\APK ABSEN PI\\JADWAL IV, V & VI MID PI  2026 - Copy.xlsx';
const wb = XLSX.readFile(path);
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, {header:1});

console.log('Total rows:', data.length);
console.log('\n=== ROWS 4-8 (header + first classes) ===');
for (let i = 3; i < 8; i++) {
  console.log('Row ' + (i+1) + ':', JSON.stringify(data[i]));
}

console.log('\n=== ROWS 30-32 (VI J area) ===');
for (let i = 29; i < 32; i++) {
  console.log('Row ' + (i+1) + ':', JSON.stringify(data[i]));
}

console.log('\n=== ROWS 34-38 (guru legend) ===');
for (let i = 33; i < 38; i++) {
  console.log('Row ' + (i+1) + ':', JSON.stringify(data[i]));
}
