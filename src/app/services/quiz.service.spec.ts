import { TestBed } from '@angular/core/testing';

import { WuizService } from './quiz.service';

describe('WuizService', () => {
  let service: WuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
