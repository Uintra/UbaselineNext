import { TestBed } from '@angular/core/testing';

import { ServerResponseDataMapperService } from './server-response-data-mapper.service';

describe('ServerResponseDataMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerResponseDataMapperService = TestBed.get(ServerResponseDataMapperService);
    expect(service).toBeTruthy();
  });
});
