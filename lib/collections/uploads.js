const _UPLOADS_DIRECTORY = `${process.env.PWD}/meteor_uploads`;

const _Uploads = new FS.Collection('uploads', {
  stores: [
    new FS.Store.FileSystem('uploads', {
      path: _UPLOADS_DIRECTORY,
    }),
  ],
});

export default _Uploads;

global.UPLOADS_DIRECTORY = _UPLOADS_DIRECTORY;
global.Uploads = _Uploads;
