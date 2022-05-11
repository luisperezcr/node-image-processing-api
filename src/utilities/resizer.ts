import express from 'express';
import sharp from 'sharp';

const resizer = async(req: express.Request, res: express.Response, next: Function) => {
    const filename = req.query.filename || null;
    const newWidth = req.query.width || 0;
    const newHeight = req.query.height || 0;
    const fullImage = `images/full/${filename}.jpg`;
    const resizedImage = `images/thumb/${filename}_thumb_${newWidth}x${newHeight}.jpg`;

    try {
        await sharp(fullImage)
            .resize(+newWidth, +newHeight)
            .toFile(resizedImage);

        res.sendFile(resizedImage, { root: './' });
    } catch (error) {
        res.status(600).send('error');
    }

    next();
};

export default resizer;