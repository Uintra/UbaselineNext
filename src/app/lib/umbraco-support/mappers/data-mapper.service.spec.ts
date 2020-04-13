import { TestBed } from '@angular/core/testing';

import { DataMapperService } from './data-mapper.service';

describe('DataMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataMapperService = TestBed.get(DataMapperService);
    expect(service).toBeTruthy();
  });
});
