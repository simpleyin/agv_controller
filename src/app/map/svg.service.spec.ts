import { TestBed, inject } from '@angular/core/testing';

import { SvgService } from './svg.service';

describe('SvgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgService]
    });
  });

  it('should be created', inject([SvgService], (service: SvgService) => {
    expect(service).toBeTruthy();
  }));
});
