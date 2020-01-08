export function isInPictureDataNotFallback(pictureData, fallback) {
  if (!!pictureData) {
    return fallback !== pictureData.src;
  } else {
    return false;
  }
}