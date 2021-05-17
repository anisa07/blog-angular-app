import { DefaultImagePipe } from './default-image.pipe';

describe('DefaultImagePipe', () => {
  let pipe: DefaultImagePipe;

  beforeEach(() => {
    pipe = new DefaultImagePipe();
  });

  it('providing no value returns fallback', () => {
    const pipe = new DefaultImagePipe();
    expect(pipe.transform('', 'fallback')).toBe('fallback');
  });

  it('providing value returns value', () => {
    const pipe = new DefaultImagePipe();
    expect(pipe.transform('value', 'test')).toBe('value');
  });
});
