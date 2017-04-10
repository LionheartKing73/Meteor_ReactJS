import Messages from '../lib/collections/messages';

const getFakeMessageObj = (log) => {
  const m = {
    text: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    author: {
      name: faker.name.findName(),
      userName: faker.name.findName(),
      avatar: faker.image.avatar(),
    },
  };
  log && console.log(m);
  return m;
};

const getFakeUserObj = (log, role = 'broker') => {
  const o = {
    firstName: faker.lorem.sentence(),
    lastName: faker.lorem.sentence(),
    role,
    userName: faker.internet.userName(),
    avatar: faker.image.avatar(),
    emails: [{
      address: faker.internet.email(),
    }],
  };
  log && console.log(o);
  return o;
};


// Meteor.setInterval(function () {
//   if (Messages.find().fetch().length > 40) {
//     Messages.remove({});
//   }
//   Messages.insert(getFakeMessageObj(1));
// }, 4000);


Meteor.publish('messages', (query = {}, options = {}) => Messages.find(query, options));


Meteor.methods({
  sayHello() {
    return 'Hello!';
  },
  now() {
    return new Date();
  },
});
