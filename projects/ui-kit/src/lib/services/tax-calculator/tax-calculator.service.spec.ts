import { TestBed } from '@angular/core/testing';
import { COUNTRIES, TaxCalculatorService } from './tax-calculator.service';

describe(`TaxCalculatorService`, () => {
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COUNTRIES,
          useValue: { ua: { name: 'Ukraine', vat: 20 } },
        },
      ],
    });
    service = TestBed.inject(TaxCalculatorService);
  });

  it(`should return 0 if isB2B flag is true`, () => {
    expect(service.calculateVAT(100, 'ua', true)).toBe(0);
  });

  it(`should properly calculate VAT for a given country`, () => {
    expect(service.calculateVAT(100, 'ua')).toBe(20);
  });

  describe(`TaxCalculatorService: Error handling`, () => {
    it(`should throw an error if country isn't supported`, () => {
      expect(() => service.calculateVAT(100, 'fr')).toThrowError(
        /isn't supported/
      );
    });

    it(`should throw an error if price is negative number`, () => {
      expect(() => service.calculateVAT(-100, 'ua')).toThrowError(
        /negative number/
      );
    });
  });
});
