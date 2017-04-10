import Customers from '../../../lib/collections/customers';

const status = [
  'Primeiro contato',
  'Em analise de perfil - sistemico',
  'Não consegui contato',
  '(P) Telefone incorreto',
  '(P) Telefone inexistente',
  'Não pode falar no momento',
  'Pendente de informação',
  '(P) Cliente fechou com congênere',
  '(P) Cliente não possui veículo',
  '(P) Cliente possui seguro na congênere',
  '(P) Cliente possui seguro | P | I | A |',
  '(P) Não tem interesse no produto',
];

const userId = (Meteor.users.findOne() || {})._id;

Meteor.methods({

  /**
   * @memberOf CustProdHistory
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'custProdHistory.createFake': function () {
    Customers.find({}).forEach((customer) => {
      GLOBAL.products.map((prod) => {
        CustProdHistory.insert({
          customerId: customer._id,
          brokerId: userId,
          productName: prod,

          actualPhase: faker.random.arrayElement(GLOBAL.phases),
          actualStatus: faker.random.arrayElement(status),

          history: [
            {
              date: faker.date.past(),
              phase: faker.random.arrayElement(GLOBAL.phases),
              status: faker.random.arrayElement(status),
            }],
        });
      });
    });
  },

  /**
   * @memberOf CustProdHistory
   * @name addArrayElements
   * @summary Add (random mode) more elements into the some array attributes
   */
  'custProdHistory.addArrayElements': function () {
    CustProdHistory.aggregate({ $sample: { size: 10 } }).forEach((customer) => {
      CustProdHistory.update({ customerId: customer.customerId, brokerId: userId }, {
        $addToSet: {

          history:
          {
            date: faker.date.past(),
            phase: faker.random.arrayElement(GLOBAL.phases),
            status: faker.random.arrayElement(status),
          },
        },
      });
    });
  },


});

// if (!CustProdHistory.findOne()) {
//   Meteor.call('custProdHistory.createFake');
//   Meteor.call('custProdHistory.addArrayElements');
// }
