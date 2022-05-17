import mock from 'mock-fs';
import supertest from 'supertest';
import app from '../index';
import resize from '../utilities/resizer';
import * as cache from '../utilities/cache';

const request = supertest(app);

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

  it('should fail & show error message if filename is empty', async() => {
    const response = await request.get('/api/images?filename=&width=200&height=200');
    expect(response.text).toEqual('An error has ocurred: Invalid filename, please enter a valid image name.');
  });

  it('should fail & show error message if width is empty', async() => {
    const response = await request.get('/api/images?filename=fjord&width=&height=200');
    expect(response.text).toEqual('An error has ocurred: Invalid width, please enter a valid value for width.');
  });

  it('should fail & show error message if height is empty', async() => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=');
    expect(response.text).toEqual('An error has ocurred: Invalid height, please enter a valid value for height.');
  });

  it('should fail & show error message if width is not a number', async() => {
    const response = await request.get('/api/images?filename=fjord&width=50as0&height=200');
    expect(response.text).toEqual('An error has ocurred: Invalid width, please enter a valid value for width.');
  });

  it('should fail & show error message if height is not a number', async() => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=50asd0');
    expect(response.text).toEqual('An error has ocurred: Invalid height, please enter a valid value for height.');
  });
});
