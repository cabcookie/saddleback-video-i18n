function onLoaded() {
    const csInterface = new CSInterface();
    const appName = csInterface.hostEnvironment.appName;
    loadJSX();
    updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
    // Update the color of the panel when the theme color of the product changed.
    csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged, null);
}

function loadJSX() {
    const csInterface = new CSInterface();
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/extendscript/jsx/";
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")', null);
}

function onAppThemeColorChanged(event) {
    // Should get a latest HostEnvironment object from application.
    const skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
    // Gets the style information such as color info from the skinInfo, 
    // and redraw all UI controls of your extension according to the style info.
    updateThemeWithAppSkinInfo(skinInfo);
}

/**
 * Convert the Color object to string in hexadecimal format;
 */
function toHex(color, delta) {
    function computeValue(value, delta)  {
        let computedValue = !isNaN(delta) ? value + delta : value;
        computedValue = computedValue < 0 ? 0 : (computedValue > 255 ? 255 : computedValue);
        const strValue = Math.round(computedValue).toString(16);
        return (strValue.length == 1 ? "0" : "") + strValue;
    }

    let hex = "";
    if (color) {
        hex = computeValue(color.red, delta) + computeValue(color.green, delta) + computeValue(color.blue, delta);
    }
    return "#" + hex;
}

/**
 * Update the theme with the AppSkinInfo retrieved from the host product.
 */
function updateThemeWithAppSkinInfo(appSkinInfo) {
    //Update the background color of the panel
    const panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
    document.body.bgColor = toHex(panelBackgroundColor);

    const styleId = "ppstyle";
    const csInterface = new CSInterface();
    const appName = csInterface.hostEnvironment.appName;

    // ...
}

function myTextHandlerFunction(event) {
    const VulcanInterface = new Vulcan();
    const installCheck = VulcanInterface.isAppInstalled("premierepro");

    const msg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + "com.DVA.message.sendtext");
    msg.setPayload(event);
    VulcanInterface.dispatchMessage(msg);
}
