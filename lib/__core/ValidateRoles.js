const _icanBase = function (_this, role) {
  if (!(_this && _this.userId)) throw new Meteor.Error('401');
  if (!Roles.userIsInRole(_this.userId, role)) { throw new Meteor.Error('401', `Você não está no grupo ${role}`); }
  return true;
};

/**
 *
 * @param _this contexto recebido de dentro de um method ou de um subscribe,
 * aonde existe this.userId
 * @param role
 * @param useTryCatch
 * @returns {*}
 * @constructor
 */
Meteor.ICan = function ICan(_this, role = 'super-admin', useTryCatch = false) {
  let iCan = false;

  if (useTryCatch) {
    try {
      iCan = _icanBase(_this, role);
    } catch (error) {
      return error;
    }
  }

  return iCan;
};
