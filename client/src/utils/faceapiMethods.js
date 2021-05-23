import * as faceapi from 'face-api.js';
async function load() {
  debugger;
  const publicURL = '/models';
  await faceapi.loadTinyFaceDetectorModel(publicURL);
  await faceapi.loadFaceLandmarkTinyModel(publicURL);
  await faceapi.loadFaceRecognitionModel(publicURL);
}

async function makeImage(src, label) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = { label };
  return image;
}
// getSingleDescriptor and getMultipleFaces only return a result for now, which has result.descriptor inside.
async function getSingleDescriptor(faceapi, src) {
  return await faceapi
    .detectSingleFace(makeImage(src, 'check'))
    .withFaceLandmarks()
    .withFaceDescriptor();
}

async function getMultipleFaces(faceapi, src) {
  return await faceapi
    .detectAllFaces(makeImage(src, 'test'))
    .withFaceLandmarks()
    .withFaceDescriptorss();
}
//getDetectionResult return a string result between 0 to 1.
async function getDetectionResult(faceapi, descriptor1, descriptor2) {
  return new faceapi.FaceMatcher(descriptor1)
    .findBestMatch(descriptor2)
    .toString();
}

//function to take an array of labeled descriptors, and put them in a faceMatcher, and find a best match
//to the new image we're testing.
async function detectAllFacesInPicture(faceapi, labeledDescriptors, src) {
  return new faceapi.FaceMatcher(labeledDescriptors).findBestMatch(
    makeImage(src, 'test')
  );
}
export {
  makeImage,
  getSingleDescriptor,
  getMultipleFaces,
  getDetectionResult,
  detectAllFacesInPicture,
  load,
};
export default faceapi;
