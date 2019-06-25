import { TestBed } from '@angular/core/testing';

import { ValidateService } from './validate.service';
import {describe} from 'jasmine';
import {beforeEach} from 'jasmine';
import {it} from 'jasmine';
import {expect} from 'jasmine';

describe('ValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateService = TestBed.get(ValidateService);
    expect(service).toBeTruthy();
  });
});
