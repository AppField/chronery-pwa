import { UtcTimePipe } from './utc-time.pipe';

describe('UtcTimePipe', () => {
  it('create an instance', () => {
    const pipe = new UtcTimePipe();
    expect(pipe).toBeTruthy();
  });
});
