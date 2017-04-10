Meteor.publish('user.selfProfile', function () {
  //TODO: quando for fazer no meteor.click o find vai ser vazio no rolê (find{});
  //TODO: quando criar usuarios admin, criar holes;
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      "profile": 1,
      "registrationIsComplete": 1,
      'services.facebook': 1,
    },
  });
});

Meteor.publish(null, function () {
  // FIXME: nao publicar todos os campos
  return Meteor.users.find({ _id: this.userId });
});

