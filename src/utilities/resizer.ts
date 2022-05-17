import sharp from 'sharp';
import { promises as fs, existsSync } from 'fs';
import { isInCache, saveToCache } from './cache';

/**
 * Check if a folder exists, if not, will create it
 * @param folder - Folder name to create if doesn't exist
 */
const checkThumbFolder = async (folder: string) => {
  if (!existsSync(folder)) {
    await fs.mkdir(folder);
  }
};

/**
 * Performs image resize
 * @param filename - Name of the image to resize
 * @param width - Width for the resized image
 * @param height - Height for the resized image
 * @returns - Promise<string> - New resized image name to render
 */
const resize = async (
  filename: unknown,
  width: number,
  height: number
): Promise<string> => {
  // Declare paths to get/generate images
  const pathToFull = 'images/full';
  const pathToThumb = 'images/thumb';
  const fullImage = `${filename}.jpg`;
  const thumbImage = `${filename}_thumb_${width}x${height}.jpg`;

  // If the images was already resize, serve it from cache, otherwise perform resize
  const isCached = await isInCache(thumbImage);
  if (isCached) {
    return `${pathToThumb}/${thumbImage}`;
  } else {
    await checkThumbFolder(pathToThumb);

    await sharp(`${pathToFull}/${fullImage}`)
      .resize(+width, +height)
      .toFile(`${pathToThumb}/${thumbImage}`);

    // Save new resize image name to cache file
    await saveToCache(thumbImage);

    // Return new resize image name to render
    return `${pathToThumb}/${thumbImage}`;
  }
};

export default resize;
