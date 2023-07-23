import { TestBed } from '@angular/core/testing';

import { GrahpqlService } from './grahpql.service';

describe('GrahpqlService', () => {
  let service: GrahpqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrahpqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
