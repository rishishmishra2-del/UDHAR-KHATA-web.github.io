function getValues() {
  return {
    shopName: document.getElementById("shopName").value,
    ownerName: document.getElementById("ownerName").value,
    custName: document.getElementById("custName").value,
    custPhone: document.getElementById("custPhone").value,
    amount: document.getElementById("amount").value,
    upiId: document.getElementById("upiId").value
  };
}

// ✅ Send WhatsApp Message with UPI Link
function sendWhatsApp() {
  const { shopName, ownerName, custName, custPhone, amount, upiId } = getValues();

  // UPI Payment Link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName)}&am=${amount}&cu=INR`;

  const message = `*${shopName}* - Dear ${custName}, aapne ₹${amount} udhar liya. By ${ownerName}\n\n💳 Pay here: ${upiLink}`;
  
  const url = `https://wa.me/${custPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ✅ Generate PDF Record
function generatePDF() {
  const { shopName, ownerName, custName, custPhone, amount, upiId } = getValues();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(shopName, 20, 20);
  doc.setFontSize(12);
  doc.text(`Owner: ${ownerName}`, 20, 30);
  doc.text(`Customer: ${custName}`, 20, 40);
  doc.text(`Phone: ${custPhone}`, 20, 50);
  doc.text(`Amount: ₹${amount}`, 20, 60);
  doc.text(`UPI ID: ${upiId}`, 20, 70);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 80);

  doc.save(`${custName}_Udhar.pdf`);
}
