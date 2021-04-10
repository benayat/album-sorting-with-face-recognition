intro: 
what does it do?
- sort multiple images to albums, while reonnizing the faces inside using faceapi js.

**view demo**: https://silly-shirley-d82e96.netlify.app/manageFamily
- please allow some loading time, depending on your cpu and network connection. after all, this app does some heavy lifting. 

technologies and features used: 
- since there are some pretty big files for using the model calculations, I couldn't use local storage, which is limited to 5mb total, and with uncomfortable JSON sting style, so - 
- all activity is done offline, using the **indexeddb**(with idb wrapper) from the browser api. 
- component hierarchy is pretty long, so data between the components was passed globally with the "useContext" hook, to avoid delays in real-time.
- one manually made file uploader, and a dropZone with react-dropzone package.


-**any contribution/issues/questions or suggetions are welcome**.

use: 
free for use, just give credit in the top level readme.md and you're good to go.
fork the repo, and then run _npm install_, and t  _npx react app ____ and you're good to go.

improvements needed/contributions: 
- styling. I suck at styling, so some good styling suggestions are very welcome.
- moving calculations to web workers: perfocemance improvements necessary: some long calculations are made in a single-threaded fashion. I plan on upgrading the app using web workers.


libraries used: 
- faceapi js: https://github.com/justadudewhohacks/face-api.js/
- idb: https://www.npmjs.com/package/idb
- react-icons: https://www.npmjs.com/package/react
- that's it. if I forgot someone, please let me know.
