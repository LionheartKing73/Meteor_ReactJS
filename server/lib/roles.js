Roles.isAdmin = function (selfOrID, preventThrow = false) {
  const userId = (selfOrID.userId) ? selfOrID.userId : selfOrID;
  if (Roles.userIsInRole(userId, 'admin')) return true;
  if (!preventThrow) throw new Meteor.Error('401', ERROR_MESSAGES.nao_autoruzado);
};
