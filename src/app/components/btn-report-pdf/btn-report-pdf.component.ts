import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

declare var jsPDF: any; // Important

interface Column {
  name: string;
  key: string;
}


@Component({
  selector: 'chy-btn-report-pdf',
  templateUrl: './btn-report-pdf.component.html',
  styleUrls: ['./btn-report-pdf.component.scss']
})
export class BtnReportPdfComponent implements OnInit {
  private _data;

  @Input()
  data;

  fields = [
    { name: 'Date', key: 'date' },
    { name: 'Von', key: 'from' },
    { name: 'Bis', key: 'to' },
    { name: 'Stunden', key: 'minutesSpent' },
    { name: 'Projektname', key: 'project.name' },
    { name: 'Projektnummer', key: 'project.name' },
    { name: 'Kommentar', key: 'comment' }
  ] as Column[];

  selectedFields = [this.fields[0], this.fields[3], this.fields[4], this.fields[6]];

  options = {
    header: 'PDF herunterladen',
    message: 'Bitte wählen Sie die Felder aus, welche Ihr Report behalten soll.'
  };

  private totalTime: string;

  @ViewChild('selectPdf') selectPdf;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  openSelect(): void {
    this.selectPdf.open();
  }

  async downloadPDF(): void {
    this._data = this.data();
    this.calcTotalTime();
    try {
      const pdf = await this.generatePDF();
      pdf.save(`Chronery Report`);
    } catch (error) {

    }
  }

  private async generatePDF() {
    const pdf = new jsPDF('landscape');
    const totalPagesExp = '{total_pages_count_string}';

    // const user = await this.authService.getUserAttributes();

    const pageContent = (data) => {
      console.log('DATA', data);
      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(40);
      pdf.setFontStyle('normal');
      pdf.text(`Chronery Bericht`, 15, 18);

      // Footer
      let str = 'Seite' + ' ' + data.pageCount;
      str += ` von ` + totalPagesExp;
      pdf.setFontSize(10);
      pdf.text(str, 20, pdf.internal.pageSize.height - 10);

      // Add User name and print date centered
      const printDate = this.datePipe.transform(new Date());
      // const footerText = `${user.family_name} ${user.given_name} - ${this.translate.transform('printdate')}: ${printDate}`;
      const footerText = `${'Vorname'} ${'Nachname'} - Druckdatum}: ${printDate}`;
      pdf.setFontSize(10);
      const xOffset = (pdf.internal.pageSize.width / 2);
      pdf.text(footerText, xOffset, pdf.internal.pageSize.height - 10, 'center');
    };

    console.log('data', this._data);
    console.log('SELECTED FIELDS', this.selectedFields);
    const fields = this.selectedFields.map(field => field.key);
    pdf.autoTable(fields, this._data, {
      addPageContent: pageContent,
      // startY: 28,
      margin: { top: 30 },
      headerStyles: {
        fillColor: [0, 150, 136]
      },
      styles: { overflow: 'linebreak' },
      // columnStyles: { text: { columnWidth: 'auto' } },
      columnStyles: { 'comment': { columnWidth: 100 } },
      showHeader: 'everyPage'
    });

    if (this.totalTime) {
      const tableEndPosY = pdf.autoTableEndPosY() + 7;
      pdf.setFontSize(10);
      pdf.setFontStyle('bold');
      pdf.text(`Gesamt: ${this.totalTime} h`, 265, tableEndPosY, 'right');
    }

    pdf.putTotalPages(totalPagesExp);
    return pdf;
  }

  private calcTotalTime() {
    this.totalTime = this._data.reduce((wh1, wh2) => wh1.minutesSpent + wh2.minutesSpent);
    console.log('TOTAL TIME', this.totalTime);
  }
}
