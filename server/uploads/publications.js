Uploads.allow({
  insert() {
    // add custom authentication code here
    return true;
  },
  update() {
    // add custom authentication code here
    return true;
  },
  remove() {
    // add custom authentication code here
    return true;
  },
  download(userId, fileObj) {
    return true;
  },
});

Meteor.publish(
  'Uploads', () => {
    console.log(`[MSG] Publish File Uploads in directory: ${UPLOADS_DIRECTORY}`);
    return Uploads.find({});
  },
);
