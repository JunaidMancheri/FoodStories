
const {initializeApp} = require("firebase-admin/app");
const {onObjectFinalized} = require('firebase-functions/v2/storage')
const {getStorage} = require("firebase-admin/storage");
const logger = require("firebase-functions/logger");
const path = require("path");

// library for image resizing
const sharp = require("sharp");

initializeApp();
exports.generateThumbnailOh = onObjectFinalized({cpu: 2, region: 'asia-northeast3'}, async (event) => {

  const fileBucket = event.data.bucket; // Storage bucket containing the file.
  const filePath = event.data.name; // File path in the bucket.
  const contentType = event.data.contentType; // File content type.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return logger.log("This is not an image.");
  }

  const fileName = path.basename(filePath);
  if (fileName.startsWith("thumb_")) {
    return logger.log("Already a Thumbnail.");
  }

  const bucket = getStorage().bucket(fileBucket);
  const downloadResponse = await bucket.file(filePath).download();
  const imageBuffer = downloadResponse[0];
  logger.log("Image downloaded!");

  // Generate a thumbnail using sharp.
  const thumbnailBuffer = await sharp(imageBuffer).resize({
    width: 200,
    height: 200,
    withoutEnlargement: true,
  }).toBuffer();
  logger.log("Thumbnail created");

  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  const metadata = {contentType: contentType};
  await bucket.file(thumbFilePath).save(thumbnailBuffer, {
    metadata: metadata,
  });
  return logger.log("Thumbnail uploaded!");
});

