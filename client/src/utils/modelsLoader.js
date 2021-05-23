import * as faceapi from 'face-api.js';
const publicURL = '/models';
async function load() {
  debugger;
  await faceapi.loadTinyFaceDetectorModel(publicURL);
  await faceapi.loadFaceLandmarkTinyModel(publicURL);
  await faceapi.loadFaceRecognitionModel(publicURL);
}

export default faceapi;
export { load };
