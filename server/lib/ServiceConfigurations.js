process.env.MAIL_URL = Meteor.settings.MAIL_URL;

const FB_KEYS = {
  appId: Meteor.settings.oauth.facebook.appId,
  secret: Meteor.settings.oauth.facebook.secret,
};

const LI_KEYS = {
  clientId: Meteor.settings.oauth.linkedin.clientId,
  secret: Meteor.settings.oauth.linkedin.secret,
};

const GOO_KEYS = {
  clientId: Meteor.settings.oauth.google.clientId,
  secret: Meteor.settings.oauth.google.secret,
};

const userId = (Meteor.users.findOne() || {})._id;

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  { $set: FB_KEYS },
);

ServiceConfiguration.configurations.upsert(
  { service: 'linkedin' },
  { $set: LI_KEYS },
);

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  { $set: GOO_KEYS },
);
