import { TestBed } from '@angular/core/testing';

import { AdminAfterLoginService } from './admin-after-login.service';

describe('AdminAfterLoginService', () => {
  let service: AdminAfterLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAfterLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
