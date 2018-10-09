import { TestBed } from '@angular/core/testing';

import { WorkingHoursService } from './working-hours.service';

describe('WorkingHoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkingHoursService = TestBed.get(WorkingHoursService);
    expect(service).toBeTruthy();
  });
});
