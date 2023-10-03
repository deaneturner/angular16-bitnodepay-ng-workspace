import { TestBed } from '@angular/core/testing';

import { DockerContainerService } from './docker.container.service';

describe('DockerContainerService', () => {
  let service: DockerContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
