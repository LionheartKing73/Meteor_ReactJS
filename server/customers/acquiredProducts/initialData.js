import Customers from '../../../lib/collections/customers';
import AcquiredProducts from '../../../lib/collections/acquiredProducts';

const goodProfiles = ['Proprietário', 'Locatário'];
const alarmTypes = ['Apartamento', 'Casa'];

const userId = (Meteor.users.findOne() || {})._id;

Meteor.methods({

  /**
   * @memberOf AcquiredProducts
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'acquiredProducts.createFake': function () {
    Customers.find({}).forEach((custDoc) => {
      for (let i = 0; i < 2; i++) {
        AcquiredProducts.insert({

          customerId: custDoc._id,
          brokerId: userId,
          productName: faker.random.arrayElement(GLOBAL.products),

          alarmType: faker.random.arrayElement(alarmTypes),
          alarmProfile: faker.random.arrayElement(goodProfiles),

          vehicleModel: faker.lorem.words(),
          vehiclePlan: `R$ ${faker.finance.amount()}`,

          conectaPlan: faker.lorem.words(),
          conectaValue: `R$ ${faker.finance.amount()}`,
        });
      }
    });
  },

});

if (!AcquiredProducts.findOne()) {
  Meteor.call('acquiredProducts.createFake');
}
