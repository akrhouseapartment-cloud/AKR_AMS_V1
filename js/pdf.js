// Load jsPDF before this file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

const { jsPDF } = window.jspdf;

// Generate PDF Report

export function generatePDF(title, data = []) {

const pdf = new jsPDF();

pdf.setFontSize(20);
pdf.text(title, 15, 20);

pdf.setFontSize(11);

let y = 35;

if (data.length === 0) {

pdf.text("No data available.", 15, y);

} else {

data.forEach((item, index) => {

pdf.text(`${index + 1}. ${JSON.stringify(item)}`, 15, y);

y += 10;

if (y > 270) {

pdf.addPage();

y = 20;

}

});

}

pdf.save(`${title.replace(/\s+/g,"_")}.pdf`);

}

// Generate Payment Receipt

export function generateReceipt(payment){

const pdf = new jsPDF();

pdf.setFontSize(18);

pdf.text("AKR House Apartments",20,20);

pdf.setFontSize(15);

pdf.text("Maintenance Payment Receipt",20,35);

pdf.setFontSize(11);

pdf.text(`Receipt No : ${payment.receiptNo}`,20,55);

pdf.text(`Resident : ${payment.name}`,20,65);

pdf.text(`Flat No : ${payment.flat}`,20,75);

pdf.text(`Amount : ₹${payment.amount}`,20,85);

pdf.text(`Payment Date : ${payment.date}`,20,95);

pdf.text(`Payment Mode : ${payment.mode}`,20,105);

pdf.line(20,120,190,120);

pdf.text("Thank you for your payment.",20,135);

pdf.save(`Receipt_${payment.receiptNo}.pdf`);

}
