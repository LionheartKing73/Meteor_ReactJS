const _FACEBOOK_HTML_UPLOADS = `${process.env.PWD}/.fb_html_uploads`;

const _FacebookHTMLUploads = new FS.Collection('facebookHTMLUploads', {
  stores: [
    new FS.Store.FileSystem('facebookHTMLUploads', {
      path: _FACEBOOK_HTML_UPLOADS,
    }),
  ],
});

global.FACEBOOK_HTML_UPLOADS = _FACEBOOK_HTML_UPLOADS;
global.FacebookHTMLUploads = _FacebookHTMLUploads;

export default _FacebookHTMLUploads;
