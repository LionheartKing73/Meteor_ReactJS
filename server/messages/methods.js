/**
* Verifica permissões para CRUD de mensagem
* @param fromUserId
* @param toUserId
* @private
*/
const _checkMessageRoles = (fromUserId, toUserId, crudAction) => {
  // TODO: verificar crudAction
  if (!fromUserId) throw new Meteor.Error('401');
  if (!Meteor.users.find({ to: toUserId }).count()) throw new Meteor.Error('Destinatário não encontrado');
  if (!Roles.userIsInRole(fromUserId, 'admin')) throw new Meteor.Error('401');
};

Meteor.methods({
  'messages.insert': function (message) {
    // _checkMessageRoles(this.userId, to, 'insert');
    return (Messages.insert(message));
  },
  'messages.remove': function (message) {
    // _checkMessageRoles(this.userId, this.userId, 'remove');
    return (Messages.remove(message._id));
  },
  'messages.setIsRead': function (message) {
    // _checkMessageRoles(this.userId, this.userId, 'change');
    const readNow = {
      readAt: new Date(),
    };
    const withReadNowDate = {
      $set: readNow,
    };
    return (Messages.update(message._id, withReadNowDate));
  },
  'messages.hide': function (message) {
    return Messages.update(message._id, { $set: { hidden: true }} );
  },
});
