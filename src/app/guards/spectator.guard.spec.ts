import { TestBed } from '@angular/core/testing';

import { SpectatorGuard } from './spectator.guard';

describe('SpectatorGuard', () => {
  let guard: SpectatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpectatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
