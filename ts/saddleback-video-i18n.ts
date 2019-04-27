/**
 * Copyright 2019 Carsten Koch
 * All rights reserved.
 */
/// <reference types="types-for-adobe/aftereffects/2018"/>;

const test = 5;

var CSLibrary = new CSInterface();
var imageURL;

/**
 * This function will be called when PP's theme color been changed and it will change
 * extension's background color according to PP's.
 **/
function themeChangedEventListener(event)
{
    changeThemeColor();
}

function changeThemeColor()
{
	const hostEnv = CSLibrary.getHostEnvironment();
    // var UIColorObj = new UIColor();

    const UIColorObj = hostEnv.appSkinInfo.appBarBackgroundColor;
    var red = Math.round(UIColorObj.color.red);
    var green = Math.round(UIColorObj.color.green);
    var blue = Math.round(UIColorObj.color.blue);
    var alpha = Math.round(UIColorObj.color.alpha);
    var colorRGB = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

    if ("#535353" != colorRGB) /* "#535353" is the original color */
    {
        document.getElementById("index_body").style.backgroundImage = "none";
    }
    else /* for show background color distinctly */
    {
        document.getElementById("index_body").style.backgroundImage = imageURL;
    }
    document.getElementById("index_body").style.backgroundColor = colorRGB;
    document.getElementById("index_body").style.opacity = alpha / 255;
}

/**
 * Test if the Node.js is enabled.
 * Append "(Disabled)" to NodeJS link if the Node.js is disabled on main frame.
 **/
function checkNodeJS() {
	if (typeof(require) === 'undefined') {
		// Get the "naviFrame" iframe object.
		var naviFarme = document.getElementById('naviFrame');
		if (naviFrame) {
			var naviFrameDocument = naviFarme.contentWindow ? naviFarme.contentWindow.document : naviFarme.contentDocument;
			if (naviFrameDocument) {
				// Find the Nodejs link.
				var leftLinks = naviFrameDocument.getElementById('ul1').children;
				if (leftLinks) {
					for (var i = 0; i < leftLinks.length; i++) {
						if ('Nodejs' === leftLinks[i].id) {
							// Append "(Disabled)" to Nodejs link.
							leftLinks[i].children[0].innerHTML = leftLinks[i].children[0].innerHTML + '(Disabled)';
							break;
						}
					}
				}			
			}
		}
	} 
}

/**
 * Add eventListener to listen PP's theme change event.
 **/
window.onload = function()
{
    CSLibrary.addEventListener("com.adobe.csxs.events.ThemeColorChanged", themeChangedEventListener);

    /* store the original background image's path */
    imageURL = document.getElementById("index_body").style.backgroundImage;
	
	checkNodeJS();
	
	changeThemeColor();
};
