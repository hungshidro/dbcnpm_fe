import { TestBed } from '@angular/core/testing';

import { AdminBeforeLoginService } from './admin-before-login.service';

describe('AdminBeforeLoginService', () => {
  let service: AdminBeforeLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBeforeLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
