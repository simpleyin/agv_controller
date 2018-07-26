import { TestBed, inject } from '@angular/core/testing';

import { ComponentInteractService } from './component-interact-service.service';

describe('ComponentInteractServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentInteractService]
    });
  });

  it('should be created', inject([ComponentInteractService], (service: ComponentInteractService) => {
    expect(service).toBeTruthy();
  }));
});
