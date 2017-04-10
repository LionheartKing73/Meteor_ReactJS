Meteor.startup(() => {
  // process.env.ROOT_URL = process.env.ROOT_URL || 'http://meteor.sciensa.click/';
});

Meteor.methods({
  // FIXME: remover
  'dev.printenv': function () {
    return process.env;
  },
});
