import { LengthExcludingWhitespacePipe } from './length-excluding-whitespaces.pipe';

describe('LengthExcludingWhitespacePipe', () => {
  it('should trim whitespaces at all positions of the string', () => {
    const pipe = new LengthExcludingWhitespacePipe();
    const input = ' BE30 0000 0000 1111 ';
    expect(pipe.transform(input)).toEqual(16);
  });

  it('should return length of the untouched input if there is no whitespace', () => {
    const pipe = new LengthExcludingWhitespacePipe();
    const input = '123456789';
    expect(pipe.transform(input)).toEqual(9);
  });
});
