//--------------------------------------------------------------------------------
// Creates a Express server in order to dislay images into social media carousel (Dashboard)
// Available images are into ".screenshots" paste
//
// http://location.hostname:3009/id_image.jpg;
//--------------------------------------------------------------------------------

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

let appPath;

if (process.env.NODE_ENV == 'production') {
  appPath = process.env.OLDPWD;
} else {
  appPath = process.env.PWD;
}

if(appPath) {
	app.use(express.static(path.resolve(appPath, '.screenshots')));

	const PORT = process.env.ASSETS_PORT || 3009;

	app.listen(PORT, () => {
		console.log(`SCREENSHOTS_PORT: ${PORT}!`);
	});
}
