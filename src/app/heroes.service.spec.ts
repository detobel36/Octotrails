import { TestBed, inject } from '@angular/core/testing';

import { HeroesService } from './hero.service';

describe('HeroesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
  });

  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));
});
