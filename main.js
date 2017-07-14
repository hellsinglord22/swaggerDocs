const {app, BrowserWindow} = require('electron'); 
const path = require('path'); 
const url = require('url'); 
const Promise = require('bluebird'); 
const fs = require('fs');
const readFile = Promise.promisify(fs.readFile); 
const co = require('co'); 

let win


function createWindow() {
	win = new BrowserWindow({width: 800, height: 600}); 

	win.loadURL(url.format({
		pathname: path.join(__dirname, '/index.html'), 
		protocol: 'file', 
		slashes: true
	})); 

	co(function* (){
		try {
			const indexFileData = yield readFile(path.join(__dirname, '/index.html'), 'utf8');
			console.log(indexFileData); 
		} catch (err) {
			console.error(err); 
		}
	}); 	


	win.webContents.openDevTools(); 

	win.on('closed', ()=> {
		win = null; 	
	}); 

}


app.on('ready', createWindow); 

app.on('window-all-closed', ()=> {
	if (process.platform !== 'darwin') {
		app.quit(); 	
	}
}); 

app.on('activate', () => {
	if (win === null)
		createWindow(); 
}); 
