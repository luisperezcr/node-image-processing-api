import { promises as fs } from 'fs';

/**
 * Clean up a file to return a clean (without ',') array of cached files
 * @returns Promise<string[]> - An array of cached images
 */
const cleanUpArray = async (images: string): Promise<string[]> => {
  const cachedImages = images.split('|').filter((item: string) => item !== '');
  return cachedImages;
};

/**
 * Save an image to cache file
 * @param name - Name of image to cache
 * @returns Promise<any> - Result of closing the file
 */
export const saveToCache = async (name: string): Promise<unknown> => {
  const file = await fs.open('cache/resizedImages.txt', 'a+');
  await file.write(`${name}|`);
  return file.close();
};

/**
 * Check if an image is already cached
 * @param name - Name of image to check if is in cache
 * @returns - Promise<boolean> - Result if the image was found in cache
 */
export const isInCache = async (name: string): Promise<boolean> => {
  const file = await fs.open('cache/resizedImages.txt', 'a+');
  const cache = await fs.readFile(file, 'utf-8');
  const cachedImages = await cleanUpArray(cache);
  await file.close();
  return !!cachedImages.find((image: string) => image === name);
};
