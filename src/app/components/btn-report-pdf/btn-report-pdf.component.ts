import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';
import { AuthService } from '../../core/auth.service';

declare var jsPDF: any; // Important

interface Column {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'chy-btn-report-pdf',
  templateUrl: './btn-report-pdf.component.html',
  styleUrls: ['./btn-report-pdf.component.scss']
})
export class BtnReportPdfComponent implements OnInit {
  private _data;
  private displayName: string;

  @Input()
  data;

  @Input()
  totalTime;

  fields = [
    { title: 'Datum', dataKey: 'date' },
    { title: 'Von', dataKey: 'from' },
    { title: 'Bis', dataKey: 'to' },
    { title: 'Projektname', dataKey: 'project.name' },
    { title: 'Projektnummer', dataKey: 'project.name' },
    { title: 'Kommentar', dataKey: 'comment' },
    { title: 'Stunden', dataKey: 'minutesSpent' }
  ] as Column[];

  selectedFields = [this.fields[0], this.fields[3], this.fields[5], this.fields[6]];

  options = {
    header: 'PDF herunterladen',
    message: 'Bitte wählen Sie die Felder aus, welche Ihr Report behalten soll.'
  };

  @ViewChild('selectPdf') selectPdf;

  constructor(
    private authService: AuthService,
    private datePipe: DatePipe,
    private minutesToTimePipe: MinutesToTimePipe
  ) {

    this.authService.user$.subscribe(user => {
      this.displayName = user.displayName;
    });
  }

  ngOnInit() {
  }

  openSelect(): void {
    this.selectPdf.open();
  }

  downloadPDF(): void {
    this._data = this.data();
    try {
      const pdf = this.generatePDF();
      pdf.save(`Chronery Report`);
    } catch (error) {

    }
  }

  private generatePDF() {
    const pdf = new jsPDF('landscape');
    const totalPagesExp = '{total_pages_count_string}';

    const pageContent = (data) => {
      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(40);
      pdf.setFontStyle('normal');
      pdf.text(`Chronery Bericht`, 15, 18);

      // Footer
      let str = 'Seite' + ' ' + data.pageCount;
      str += ` von ` + totalPagesExp;
      pdf.setFontSize(10);
      pdf.text(str, 20, pdf.internal.pageSize.getHeight() - 10);

      // Add User name and print date centered
      const printDate = this.datePipe.transform(new Date());
      // const footerText = `${user.family_name} ${user.given_name} - ${this.translate.transform('printdate')}: ${printDate}`;
      const footerText = `${this.displayName} - Druckdatum: ${printDate}`;
      pdf.setFontSize(10);
      const xOffset = (pdf.internal.pageSize.getWidth() / 2);
      pdf.text(footerText, xOffset, pdf.internal.pageSize.getHeight() - 10, 'center');
    };

    pdf.autoTable(this.selectedFields, this._data, {
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
      const totalHours = this.minutesToTimePipe.transform(this.totalTime);
      const tableEndPosY = pdf.autoTableEndPosY() + 7;
      pdf.setFontSize(10);
      pdf.setFontStyle('bold');
      pdf.text(`Gesamt: ${totalHours} Std.`, 265, tableEndPosY, 'right');
    }

    pdf.putTotalPages(totalPagesExp);
    return pdf;
  }
}
