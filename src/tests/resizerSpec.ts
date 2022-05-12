import mock from 'mock-fs';
import resize from '../utilities/resizer';
import * as cache from '../utilities/cache';

describe('Test resizer utility', () => {
  beforeAll(() => {
    mock({
      cache: {
        'resizedImages.txt': 'fjord_thumb_200x200.jpg|'
      },
      images: {
        full: {},
        thumb: {}
      }
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('should check cache to see if image is already cached', async () => {
    const isInCacheSpy = spyOn(cache, 'isInCache').and.callThrough();
    await resize('fjord', 200, 200);
    expect(isInCacheSpy).toHaveBeenCalledWith('fjord_thumb_200x200.jpg');
  });

  it('should create and cache resized image', async () => {
    const result = await resize('fjord', 200, 200);
    expect(result).toEqual('images/thumb/fjord_thumb_200x200.jpg');
  });
});
