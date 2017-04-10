const email = Meteor.settings.INITIAL_ADM_EMAIL;
const password = Meteor.settings.INITIAL_ADM_PASSWORD;
const fromEmail = Meteor.settings.FROM_MAIL_ADDRESS;


Meteor.methods({
  'users.setFirstAdm': function () {
    const userId = (Meteor.users.findOne({}, { sort: { createdAt: -1 } }) || {})._id;
    if (userId) Roles.addUsersToRoles(userId, 'admin');
  },

  // FIXME: apagar este metodo em producao
  'dev.resetAllUsers': function () {
    Meteor.users.remove({});
    const userId = Accounts.createUser({ email: fromEmail, password });
    Roles.addUsersToRoles(userId, 'admin');
    return { password, fromEmail };
  },
});


Meteor.startup(() => {
  Meteor.call('users.setFirstAdm');
});
