import Customers from '../../lib/collections/customers';

const sex = ['Masculino', 'Feminino'];
const maritalStatus = ['Solteiro', 'Casado', 'Divorciado'];
const originId = ['face', 'link', 'goog', 'clou', 'sky', 'soci'];
const pet = ['Sim', 'Não'];

const userId = (Meteor.users.findOne() || {})._id;

//------------------------------------------------------------------------------------
// Creates fake data for the Customers collection
// Differences between import model and current is :
//  - surname:    removed (added to name)
//  - brokerCode: changed to brokerId
//------------------------------------------------------------------------------------
const _createFakeCustomers = () => ({

  //--------------------------------------------------------
  // Data coming from social media
  //--------------------------------------------------------
  code: faker.random.number(),
  name: faker.name.findName(),
  // surname: faker.name.findName(),
  document: faker.random.number(),
  gender: faker.random.arrayElement(sex),
  birthday: faker.date.past(),

  website: faker.internet.domainName(),
  mobilePhone: faker.phone.phoneNumber(),
  homeEmail: faker.internet.email(),
  homePhone: faker.phone.phoneNumber(),

  homeAddress: faker.address.streetAddress(),
  homeZipcode: faker.address.zipCode(),
  homeCity: faker.address.city(),
  homeState: faker.address.state(),
  homeCountry: faker.address.country(),

  company: faker.company.companyName(),
  position: faker.lorem.words(),
  workEmail: faker.internet.email(),
  workPhone: faker.phone.phoneNumber(),
  workAddress: faker.address.streetAddress(),
  workZipcode: faker.address.zipCode(),
  workCity: faker.address.city(),
  workState: faker.address.state(),
  workCountry: faker.address.country(),

  originId: faker.random.arrayElement(originId),
  brokerId: userId,

  //--------------------------------------------------------
  // Data coming from Quotation phase
  //--------------------------------------------------------
  children: [
    {
      name: faker.name.findName(),
      age: faker.random.number(),
    }],

  maritalStatus: faker.random.arrayElement(maritalStatus),
  pet: faker.random.arrayElement(pet),
  mobileOperator: faker.lorem.word(),
  income: `R$ ${faker.finance.amount()}`,

  // avatar: faker.image.avatar()

});

Meteor.methods({

  /**
   * @memberOf Customers
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'customers.createFake': function () {
    Customers.remove({});
    if (!Customers.findOne()) {
      Array(...Array(30)).map(() => {
        const customer = _createFakeCustomers();
        console.log(customer);

        const custId = Customers.insert(customer);
        // Meteor.call('acquiredProducts.createFake', custId);
      });
    }
  },

  /**
   * @memberOf Customers
   * @name addArrayElements
   * @summary Add (random mode) more elements into the some array attributes
   */
  'customers.addArrayElements': function () {
    Customers.aggregate({ $sample: { size: 10 } }).forEach((customer) => {
      Customers.update({ _id: customer._id }, {
        $addToSet: {

          children:
          {
            name: faker.name.findName(),
            age: faker.random.number(),
          },
        },
      });
    });
  },

});

if (!Customers.findOne()) {
  Meteor.call('customers.createFake');
  Meteor.call('customers.addArrayElements');
}
