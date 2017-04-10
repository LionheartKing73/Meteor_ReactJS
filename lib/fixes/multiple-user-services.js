const orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;
Accounts.updateOrCreateUserFromExternalService = function (serviceName, serviceData, options) {
  const loggedInUser = Meteor.user();
  if (loggedInUser && typeof (loggedInUser.services[serviceName]) === 'undefined') {
    const setAttr = {};
    setAttr[`services.${serviceName}`] = serviceData;
    Meteor.users.update(loggedInUser._id, { $set: setAttr });
  }
  return orig_updateOrCreateUserFromExternalService.apply(this, arguments);
};
