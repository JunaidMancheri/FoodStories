
const {initializeApp} = require("firebase-admin/app");
const {onObjectFinalized} = require('firebase-functions/v2/storage')
const {getStorage} = require("firebase-admin/storage");
const logger = require("firebase-functions/logger");
const path = require("path");

const sharp = require("sharp");

initializeApp();
exports.generateThumbnailOh = onObjectFinalized({cpu: 2, region: 'asia-northeast3'}, async (event) => {

  const fileBucket = event.data.bucket; 
  const filePath = event.data.name;
  const contentType = event.data.contentType;


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

  const thumbnailBuffer = await sharp(imageBuffer).rotate()
  .resize({
    width: 200,
    height: 200,
    withoutEnlargement: true,
  })
  .jpeg({quality: 85})
  .toBuffer();
  logger.log("Thumbnail created");

  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  const metadata = {contentType};
  await bucket.file(thumbFilePath).save(thumbnailBuffer, {metadata});
  logger.log("Thumbnail uploaded!");

  await bucket.file(filePath).delete();

  return logger.log('Original image deleted!');
});

