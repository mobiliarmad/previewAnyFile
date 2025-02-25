
var exec = require( "cordova/exec" );
var closeButtonTextLocalizable = {
    'en': 'Close',
    'fr': 'Fermer',
    'de': 'Schliessen',
    'it': 'Chiudere'
};
var PreviewAnyFile = function () {

};
PreviewAnyFile.prototype.preview = function ( path,  successCallback, errorCallback, options = {}) {
    console.warn( "preview method has been deprecated, kindly use previewPath, previewBase64 or previewAsset" )
    var systemLanguage = navigator.language.split('-')[0];
    var lang = window.currentLanguage || systemLanguage || 'en';
    exec( successCallback, errorCallback, "PreviewAnyFile", "preview", [ path,{
            closeButtonText: closeButtonTextLocalizable[lang]
    }]);
};

PreviewAnyFile.prototype.previewBase64 = function ( successCallback, errorCallback, base64, opt = {} ) {
    let name = !!opt && opt.name ? opt.name : '';
    let mimeType = !!opt && opt.mimeType ? opt.mimeType : '';
    exec( successCallback, errorCallback, "PreviewAnyFile", "previewBase64", [ base64, name, mimeType ] );
};

PreviewAnyFile.prototype.previewPath = function ( successCallback, errorCallback, path, opt = {} ) {
    let name = !!opt && opt.name ? opt.name : '';
    let mimeType = !!opt && opt.mimeType ? opt.mimeType : '';

    exec( successCallback, errorCallback, "PreviewAnyFile", "previewPath", [ path, name, mimeType ] );
};

PreviewAnyFile.prototype.previewAsset = function ( successCallback, errorCallback, path, opt = {} ) {
    let name = !!opt && opt.name ? opt.name : '';
    let mimeType = !!opt && opt.mimeType ? opt.mimeType : '';
    if ( !!path ) path = window.location.origin + path;

    fetch( path )
        .then( resp => resp.blob() )
        .then( blob => {
            let reader = new FileReader();
            reader.readAsDataURL( blob );
            reader.onloadend = function () {
                let base64 = reader.result;
                if ( !name ) name = path.split( '/' ).pop();
                exec( successCallback, errorCallback, "PreviewAnyFile", "previewBase64", [ base64, name, mimeType ] );
            }
        } )
        .catch( () => console.log( 'assets error' ) );
};
module.exports = new PreviewAnyFile();

