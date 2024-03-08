import { TestBed } from '@angular/core/testing';

import { BioSectionService } from './bio-section.service';

describe('BioSectionService', () => {
  let service: BioSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
