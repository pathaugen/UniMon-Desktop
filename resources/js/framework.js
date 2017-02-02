
$( document ).ready(function() {
	
	
	const {ipcRenderer} = require('electron')
	var shell = require('electron').shell;
	
	
	// ---------- ---------- ---------- ---------- ----------
	// When starting up the application, load a default page
	$.ajax({
		url: "checkin.html",
		data: {
			//zipcode: 97201
		},
		success: function( result ) {
			$( "#main" ).html( result );
		}
	});
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	// Links to pages change to AJAX queries loaded into #main
	var ajaxLinks = document.querySelectorAll('a'); // '.ajax-link'
	for (var i = 0; i < ajaxLinks.length; i++) {
		var ajaxLink = ajaxLinks[i];
		var linkUrl = ajaxLink.attributes['href'].value;
		
		var isExternal = false;
		
		prepareLink(ajaxLink, linkUrl, isExternal);
	}
	function prepareLink(linkEl, linkUrl, isExternal) {
		linkEl.addEventListener('click', function () {
			event.preventDefault();
			if (linkUrl == "") {
			} else if (isExternal) {
			    shell.openExternal(linkUrl);
			} else {
				$.ajax({
					url: linkUrl,
					data: {
					},
					success: function( result ) {
						$( "#main" ).html( result );
					}
				});
			}
		});
	}
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	/* Attach sound to .button-sound elements */
	var soundButtons = document.querySelectorAll('.button-sound');
	for (var i = 0; i < soundButtons.length; i++) {
		var soundButton = soundButtons[i];
		var soundName = soundButton.attributes['data-sound'].value;
		prepareButton(soundButton, soundName);
	}
	function prepareButton(buttonEl, soundName) {
		var audio = new Audio('../sounds/' + soundName); /* __dirname + '/wav/' */
		buttonEl.addEventListener('click', function () {
			audio.currentTime = 0;
			audio.play();
		});
	}
	// ---------- ---------- ---------- ---------- ----------
	
	

	// ---------- ---------- ---------- ---------- ----------
	// Toggle Sidebar
	var toggleSidebarEl = document.querySelector('.toggle-sidebar');
	toggleSidebarEl.addEventListener('click', function () {
		event.preventDefault();
		
		// Expand main div
		//xx
		
		// Hide sidebar div
		//xx
		
		// Change icon from open/close
		//xx
	});
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	// IPC to toggle fullscreen
	var toggleFullscreenEl = document.querySelector('.toggle-fullscreen');
	toggleFullscreenEl.addEventListener('click', function () {
		event.preventDefault();
		ipcRenderer.send('toggle-fullscreen', 'true')
		
		// Change icon from full/window
		//xx
	});
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	// IPC to close window via button
	//const {ipcRenderer} = require('electron')
	/*
	var closeWinEl = document.querySelector('.close-window');
	closeWinEl.addEventListener('click', function () {
		ipcRenderer.send('close-window', 'true')
	});
	*/
	// ---------- ---------- ---------- ---------- ----------
	
	
	// ---------- ---------- ---------- ---------- ----------
	// IPC to close application via button
	var closeAppEl = document.querySelector('.close-application');
	closeAppEl.addEventListener('click', function () {
		event.preventDefault();
		ipcRenderer.send('close-application', 'true')
	});
	// ---------- ---------- ---------- ---------- ----------
	
	
});

