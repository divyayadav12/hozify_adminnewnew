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

import { jsPDF } from 'jspdf';

export function downloadDummyPDF(title, content) {
  try {
    const doc = new jsPDF();
    
    // Add Header
    doc.setFontSize(16);
    doc.setTextColor(37, 16, 143);
    doc.text('HOZIFY ENTERPRISE EXPORT', 14, 22);
    
    // Add Metadata
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(`Title: ${title}`, 14, 42);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 48);
    
    // Add Content Brief Header
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('CONTENT BRIEF:', 14, 66);
    
    // Add Content text
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    
    // Split content by newlines and print each line
    const lines = content.split('\n');
    let yPos = 74;
    for (const line of lines) {
      doc.text(line, 14, yPos);
      yPos += 6;
    }
    
    // Save the PDF
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_export.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF: ' + error.message);
    // Fallback if jsPDF is not fully loaded
    const text = `TITLE: ${title}\nEXPORTED AT: ${new Date().toLocaleString()}\n\n${content}`;
    triggerDownload(text, `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_export.txt`, 'text/plain');
  }
}
