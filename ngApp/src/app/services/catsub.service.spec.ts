import { TestBed, inject } from '@angular/core/testing';

import { CatsubService } from './catsub.service';

describe('CatsubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatsubService]
    });
  });

  it('should be created', inject([CatsubService], (service: CatsubService) => {
    expect(service).toBeTruthy();
  }));
});
