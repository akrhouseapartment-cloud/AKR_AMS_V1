// Load SheetJS (xlsx) before this file
// <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

// Export JSON to Excel

export function exportToExcel(fileName, data = []) {

if (!data || data.length === 0) {

alert("No data available to export.");

return;

}

const worksheet = XLSX.utils.json_to_sheet(data);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

XLSX.writeFile(workbook, `${fileName}.xlsx`);

}

// Export JSON to CSV

export function exportToCSV(fileName, data = []) {

if (!data || data.length === 0) {

alert("No data available to export.");

return;

}

const worksheet = XLSX.utils.json_to_sheet(data);

const csv = XLSX.utils.sheet_to_csv(worksheet);

const blob = new Blob([csv], {

type: "text/csv;charset=utf-8;"

});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = `${fileName}.csv`;

link.click();

URL.revokeObjectURL(link.href);

}

// Export Firestore Collection

export async function exportCollection(fileName, collectionData) {

exportToExcel(fileName, collectionData);

}

// Export Dashboard Summary

export function exportDashboard(summary) {

const data = [

{

Residents: summary.residents,

Flats: summary.flats,

Vehicles: summary.vehicles,

Parcels: summary.parcels,

Complaints: summary.complaints,

Maintenance: summary.maintenance

}

];

exportToExcel("Dashboard_Report", data);

}
