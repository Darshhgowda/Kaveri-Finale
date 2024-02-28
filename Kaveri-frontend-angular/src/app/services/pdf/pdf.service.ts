import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  createPdfWithCenteredText(lines: string[]): void {
    const doc = new jsPDF();

    // Function to centralize and print text
    const printCenteredText = (text: string, y: number) => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(text);
      const textOffset = (pageWidth - textWidth) / 2;
      doc.text(text, textOffset, y);
    };

    // Starting Y position
    let startY = 10; // The top margin
    const lineHeight = 10; // The height between lines

    // Loop through the text lines
    lines.forEach((line) => {
      printCenteredText(line, startY);
      startY += lineHeight; // Increase Y position for next line
    });

    // Define the table columns and rows
const columns = ["Name", "Age", "Country"];
const rows = [
  ["John Doe", 30, "USA"],
  ["Jane Smith", 25, "Canada"],
  ["Bob Johnson", 40, "UK"],
];

// Set the table options
const options = {
  startY: 20, // Vertical position to start the table (in mm)
};

// Generate the table
// doc.table(columns, rows, options);
    // Save the PDF with a filename
    doc.save('centered-text.pdf');
  }


  downloadPdf(){

  }
}
