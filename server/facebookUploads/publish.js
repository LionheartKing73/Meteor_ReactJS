FacebookHTMLUploads.allow({
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
