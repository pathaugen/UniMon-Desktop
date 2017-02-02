

const {app, BrowserWindow, ipcMain, dialog, electron, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')

let appIcon = null

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------
function createWindow () {
	
	
	// ---------- ---------- ---------- ---------- ----------
	// Create the browser window.
	win = new BrowserWindow({
		show:				false,		// Hide until window contents fully loaded
		backgroundColor:	'#2e2c29',	// Always set backgroundColor close to page color
		width:				800,
		height:				600,
		frame:				false,		// Cromeless window - implement drag and close manually
		resizable:			false
	})
	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'resources/html/framework.html'),
		protocol: 'file:',
		slashes: true
	}))
	// Better to wait until the window contents are fully loaded
	/*
	win.once('ready-to-show', () => {
		win.show()
	})
	*/
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	// Create a splash page
	splash = new BrowserWindow({
		transparent:		true,
		//parent:				win,
		//modal:				true,
		
		show:				true,		// Hide until window contents fully loaded
		//backgroundColor:	'#2e2c29',	// Always set backgroundColor close to page color
		width:				500,
		height:				500,
		frame:				false,		// Cromeless window - implement drag and close manually
		resizable:			false
	})
	// and load the splash.html of the app.
	splash.loadURL(url.format({
		pathname: path.join(__dirname, 'resources/html/splash.html'),
		protocol: 'file:',
		slashes: true
	}))
	// Better to wait until the window contents are fully loaded
	/*
	splash.once('ready-to-show', () => {
		splash.show()
	})
	*/
	//splash.setIgnoreMouseEvents(true)
	// ---------- ---------- ---------- ---------- ----------
	
	
	// Open the DevTools.
	//win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------


//---------- ---------- ---------- ---------- ----------
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// ---------- ---------- ---------- ---------- ----------


// ---------- ---------- ---------- ---------- ----------
// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
	
	// Kill the systray icon
	if (appIcon) appIcon.destroy()
})
// ---------- ---------- ---------- ---------- ----------


// ---------- ---------- ---------- ---------- ----------
app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})
// ---------- ---------- ---------- ---------- ----------


// IPC Functions


// ---------- ---------- ---------- ---------- ----------
// Putting icon in systray
/*
ipc.on('put-in-tray', function (event) {
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
	const iconPath = path.join(__dirname, iconName)
	appIcon = new Tray(iconPath)
	const contextMenu = Menu.buildFromTemplate([{
		label: 'Remove',
		click: function () {
			event.sender.send('tray-removed')
		}
	}])
	appIcon.setToolTip('Electron Demo in the tray.')
	appIcon.setContextMenu(contextMenu)
})
ipc.on('remove-tray', function () {
	appIcon.destroy()
})
*/
// ---------- ---------- ---------- ---------- ----------


// ---------- ---------- ---------- ---------- ----------
// IPC to toggle fullscreen
ipcMain.on('toggle-fullscreen', (event, arg) => {
	if (win.isFullScreen()) {
		win.setFullScreen(false)
	} else {
		win.setFullScreen(true)
	}
})
//---------- ---------- ---------- ---------- ----------


// ---------- ---------- ---------- ---------- ----------
// IPC to close splash via button
//const {ipcMain} = require('electron')
ipcMain.on('close-splash', (event, arg) => {
	splash.close();
	win.show();
})
// ---------- ---------- ---------- ---------- ----------


// ---------- ---------- ---------- ---------- ----------
// IPC to close application via button
ipcMain.on('close-application', (event, arg) => {
	
	// Confirmation Dialog
	const options = {
		type: 'info',
		title: 'Quit Application',
		message: "Are you sure you want to quit the application?",
		buttons: ['Yes', 'No']
	}
	dialog.showMessageBox(options, function (index) {
		//event.sender.send('information-dialog-selection', index)
		if (index === 0) {
			app.quit();
		}
	})
	
	//app.quit();
})
// ---------- ---------- ---------- ---------- ----------


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
