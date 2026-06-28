/**
 * Helper to trigger file download in browser with dummy content.
 */
export function triggerDownload(content, filename, mimeType = 'text/csv') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateCSV(headers, data) {
  const csvRows = [];
  csvRows.push(headers.join(','));
  
  data.forEach(row => {
    const values = headers.map(header => {
      const val = row[header] || row[header.toLowerCase().replace(/ /g, '')] || '';
      const escaped = ('' + val).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

import jsPDF from 'jspdf';

export function downloadDummyPDF(title, content) {
  try {
    const doc = new jsPDF();
    
    // Add Header
    doc.setFontSize(16);
    doc.setTextColor(37, 16, 143); // Hozify primary color
    doc.text('HOZIFY ENTERPRISE', 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('DOCUMENT EXPORT', 14, 28);
    
    // Add Separator Line
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 32, 196, 32);
    
    // Add Metadata
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(`Title: ${title}`, 14, 42);
    doc.text(`Exported At: ${new Date().toLocaleString()}`, 14, 48);
    doc.text(`Status: APPROVED & LIVE`, 14, 54);
    
    // Add Content Brief Header
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('CONTENT BRIEF:', 14, 66);
    
    // Split and add Content text (handle newlines properly)
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const splitContent = doc.splitTextToSize(content, 180);
    doc.text(splitContent, 14, 74);
    
    // Add Footer
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.text('This is a secure system generated report.', 14, pageHeight - 10);
    
    // Save the PDF
    const filename = `${title.toLowerCase().replace(/ /g, '_')}_export.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback if jsPDF is not fully loaded
    const text = `TITLE: ${title}\nEXPORTED AT: ${new Date().toLocaleString()}\n\n${content}`;
    triggerDownload(text, `${title.toLowerCase().replace(/ /g, '_')}_export.txt`, 'text/plain');
  }
}
