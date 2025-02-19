import { TestBed } from '@angular/core/testing';

import { NavControllService } from './nav-controll.service';

describe('NavControllService', () => {
  let service: NavControllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavControllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
