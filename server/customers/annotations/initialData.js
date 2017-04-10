import Customers from '../../../lib/collections/customers';
import AcquiredProducts from '../../../lib/collections/acquiredProducts';

const userId = (Meteor.users.findOne() || {})._id;

Meteor.methods({

  /**
   * @memberOf Annotation
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'annotations.createFake': function () {
    Customers.find({}).forEach((customer) => {
      for (let i = 0; i < 10; i++) {
        Annotations.insert({

          customerId: customer._id,
          brokerId: userId,
          productName: faker.random.arrayElement(GLOBAL.products),

          date: faker.date.past(),
          phase: faker.random.arrayElement(GLOBAL.phases),
          description: faker.lorem.paragraph(),
        });
      }
    });
  },

});

// if (!Annotations.findOne()) {
//   Meteor.call('annotations.createFake');
// }
