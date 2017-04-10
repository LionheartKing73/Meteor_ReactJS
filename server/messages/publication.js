const IS_DEV = process.env.NODE_ENV; // "production" or "development"

Meteor.publish(
  'messages.all', function () {
    if (Roles.userIsInRole(this.userId, 'admin') || IS_DEV) {
      const all = {};
      return (Messages.find(all));
    }
    const brokerIdList = {
      to: {
        $in: [this.userId, 'ALL'],
      },
    };
    const withBrokerIdList = {
      $set: brokerIdList,
    };
    return (Messages.find(withBrokerIdList));
  },
);
