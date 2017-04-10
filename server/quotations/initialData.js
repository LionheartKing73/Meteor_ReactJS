import Quotations from '../../lib/collections/quotations';

const _createFakeQuotations = () => ({

  customerId: faker.random.number(),
  customerName: faker.name.findName(),
  productName: faker.random.arrayElement(GLOBAL.products),
  brokerId: faker.random.number(),

  phase: faker.random.arrayElement(GLOBAL.phases),
  source: faker.random.arrayElement(GLOBAL.custOrigin),
  acquiredProducts: [faker.random.arrayElement(GLOBAL.products)],
});

Meteor.methods({

  /**
   * @memberOf Quotations
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'quotations.createFake': function () {
    Quotations.remove({});
    if (!Quotations.findOne()) {
      Array(...Array(30)).map(() => {
        const quotation = _createFakeQuotations();
        console.log(quotation);
        Quotations.insert(quotation);
      });
    }
  },

  /**
   * @memberOf Quotations
   * @name addArrayElements
   * @summary Add (random mode) more elements into the some array attributes
   */
  'quotations.addArrayElements': function () {
    Quotations.aggregate({ $sample: { size: 10 } }).forEach((myDoc) => {
      Quotations.update({ _id: myDoc._id },
        { $addToSet: { acquiredProducts: faker.random.arrayElement(GLOBAL.products) } });
    });
  },

});


// if (!Quotations.findOne()) {
//   Meteor.call('quotations.createFake');
//   Meteor.call('quotations.addArrayElements');
// }
