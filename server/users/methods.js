const defaultsDeep = require('lodash.defaultsdeep');

Meteor.methods({
  'users.update': function (query, localDBUpserts = {}, localState = {}) {
    const step = localState.step;
    const user = Meteor.users.findOne(this.userId);
    if (!step) throw new Meteor.Error('400', 'Recarregue a página'); // FIXME
    if (!user) throw new Meteor.Error('401', ErrorMsgs.naoPermitido);

    try {
      if (typeof (localDBUpserts.profile || {}).nascimento === 'string') {
        localDBUpserts.profile.nascimento = new Date(localDBUpserts.profile.nascimento);
      }
    } catch (e) {

    }

    if (step == 1) {
      const newData = defaultsDeep({ profile: { ...localDBUpserts.profile, step: 2 } }, user);
      Schemas.ProfileSchema.verify(newData.profile);
      Meteor.users.update(this.userId, { $set: { profile: newData.profile } });
    }

    if (step == 2) {
      const newData = defaultsDeep({ profile: { ...localDBUpserts.profile, step: 3 } }, user);
      Schemas.Users.verify(newData);
      Meteor.users.update(this.userId, { $set: { profile: newData.profile } });
    }

    if (step == 3) {
      const newData = defaultsDeep({ address: { ...(localDBUpserts.address || {}) } }, user.profile);
      Schemas.AddressSchema.verify(newData.address);
      Meteor.users.update(this.userId, { $set: { 'profile.address': newData.address, 'profile.step': 4 } });
    }

    if (step == 4) {
      const tags = (localState.activeTags || []);
      const time = (localState.time);

      // if (tags.length < 5) throw new Meteor.Error('401', 'Escolha ao menos 5 preferências');
      if (!time) throw new Meteor.Error('401', 'Escolha seu Time do Coração');

      Meteor.users.update(
      	this.userId, {$set: {'profile.preferencias.tags': tags, 'profile.preferencias.time': time, "profile.step": 5}}
			);
    }

    if(step == 5) {
			Meteor.call('flagUserRegistrationAsComplete', this.userId);
		}

    return 1;
  },

  'users.validate': function (userId) {
    const user = Meteor.users.findOne(userId);
    if (user) {
      if (!Roles.userIsInRole(user._id, ['admin', 'broker'])) {
        Meteor.users.remove(userId);
      }
      return true;
    }
    return true;
  },

  flagUserRegistrationAsComplete(userId) {
    userId = userId || this.userId;

    // TODO: verify registration
    if (!Meteor.users.find(userId).count()) throw new Meteor.Error('404');
    Meteor.users.update(userId, { $set: { registrationIsComplete: true } });
  },

  flagUserRegistrationAsIncomplete(userId) {
    userId = userId || this.userId;

    // TODO: verify registration
    if (!Meteor.users.find(userId).count()) throw new Meteor.Error('404');
    Meteor.users.update(userId, { $set: { registrationIsComplete: false } });
  },
});
