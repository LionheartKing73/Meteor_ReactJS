import Customers from '../../../lib/collections/customers';
import GoodsVehicles from '../../../lib/collections/goodsVehicles';

const goodTypes = ['Apartamento', 'Casa', 'Veículo'];
const goodProfiles = ['Proprietário', 'Locatário'];
const typeOfUse = ['Passeio', 'Trabalho'];

const userId = (Meteor.users.findOne() || {})._id;

Meteor.methods({

  /**
   * @memberOf GoodsVehicles
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'goodsVehicles.createFake': function () {
    Customers.find({}).forEach((customer) => {
      for (let i = 0; i < 2; i++) {
        GoodsVehicles.insert({

          customerId: customer._id,
          brokerId: customer.brokerId,
          type: faker.random.arrayElement(goodTypes),

          houseAptLoc: `${faker.address.secondaryAddress()}/${faker.address.city()}`,
          houseAptProfile: faker.random.arrayElement(goodProfiles),

          vehicModel: faker.lorem.words(),
          vehicFipe: `R$ ${faker.finance.amount()}`,
          vehicKmAverage: `${faker.random.number()} Km`,
          vehicTypeOfUse: faker.random.arrayElement(typeOfUse),
        });
      }
    });
  },

});

if (!GoodsVehicles.findOne()) {
  Meteor.call('goodsVehicles.createFake');
}
