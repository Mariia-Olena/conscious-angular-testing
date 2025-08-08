import { isNumber, toBooleanProperty, toNumberProperty } from './type-coercion';

describe(`isNumber function`, () => {
  it(`should treat integer 100 as a number`, () => {
    const result = isNumber(100);
    expect(result).toBe(true);
  });

  it(`should treat string '100' as a number`, () => {
    const result = isNumber('100');
    expect(result).toBe(true);
  });

  it(`should treat empty string as NOT a number`, () => {
    const result = isNumber('');
    expect(result).toBe(false);
  });

  it(`should treat empty string '100abc' as NOT a number`, () => {
    const result = isNumber('100abc');
    expect(result).toBe(false);
  });

  it(`should treat empty object as NOT a number`, () => {
    const result = isNumber({});
    expect(result).toBe(false);
  });
});

describe(`toBooleanProperty function`, () => {
  it(`should coerce 'false' to boolean false`, () => {
    expect(toBooleanProperty('false')).toBe(false);
  });

  it(`should coerce '' to boolean true`, () => {
    expect(toBooleanProperty('')).toBe(true);
  });

  it(`should coerce null to boolean false`, () => {
    expect(toBooleanProperty(null)).toBe(false);
  });
});

describe(`toNumberProperty function`, () => {
  it(`should transform number 100 to a number 100`, () => {
    expect(toNumberProperty(100)).toBe(100);
  });

  it(`should transform string '100' to a number 100`, () => {
    expect(toNumberProperty('100')).toBe(100);
  });

  it(`should transform empty string to a number 0`, () => {
    expect(toNumberProperty('')).toBe(0);
  });

  it(`should transform NaN to a number 0`, () => {
    expect(toNumberProperty(NaN)).toBe(0);
  });

  it(`should transform object {} to a number 0`, () => {
    expect(toNumberProperty({})).toBe(0);
  });
});
