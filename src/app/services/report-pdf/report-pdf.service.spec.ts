import { TestBed } from '@angular/core/testing';

import { ReportPdfService } from './report-pdf.service';

describe('ReportPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportPdfService = TestBed.get(ReportPdfService);
    expect(service).toBeTruthy();
  });
});
