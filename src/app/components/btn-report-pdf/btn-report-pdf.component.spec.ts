import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReportPdfComponent } from './btn-report-pdf.component';

describe('BtnReportPdfComponent', () => {
  let component: BtnReportPdfComponent;
  let fixture: ComponentFixture<BtnReportPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnReportPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
