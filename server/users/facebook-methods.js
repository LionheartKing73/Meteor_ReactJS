import FB from 'fb';

const FB_KEYS = {
  appId: Meteor.settings.oauth.facebook.appId,
  appSecret: Meteor.settings.oauth.facebook.secret,
};

FB.options({ version: 'v2.0' });
const app = FB.extend(FB_KEYS);


Meteor.methods({
  'fb.getUserFriends': function (userId) {
    userId = userId || this.userId;
    const response = '';

    const userFb = (((Meteor.users.findOne() || {}).services || {}).facebook || {});
    if (!userFb) throw new Meteor.Error('401', 'Facebook não cadastrado.');

    console.log('face', userId, userFb);

    try {
      app.api('/me/taggable_friends', { access_token: userFb.accessToken }, (a, b) => {
        console.log('response', a, b);
      });
    } catch (err) {
      console.log(err);
    }
  },
});
