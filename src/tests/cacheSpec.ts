import mock from 'mock-fs';
import { promises as fs } from 'fs';
import { cleanUpArray, saveToCache, isInCache } from '../utilities/cache';

describe('Test cache utility', () => {
  let images = '';

  beforeAll(() => {
    images = 'image1.jpg|image2.jpg|';

    mock({
      'cache': {
        'resizedImages.txt': 'image1.jpg|image2.jpg|'
      }
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('should clean up array', async () => {
    const cleanUpImages = await cleanUpArray(images);
    expect(cleanUpImages).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('should save resized image name to cache', async () => {
    const result = await saveToCache('image3.jpg');
    expect(result).toBeTruthy();
  });

  it('should check and return true if image exists in cache', async() => {
    spyOn(fs, 'readFile').and.resolveTo('image1.jpg|image2.jpg|');
    const result = await isInCache('image1.jpg');
    expect(result).toBeTruthy();
  });

  it('should check and return false if image name is not in cache', async() => {
    spyOn(fs, 'readFile').and.resolveTo('image1.jpg|image2.jpg|');
    const result = await isInCache('image4.jpg');
    expect(result).toBeFalsy();
  });
});
