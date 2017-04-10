import Activities from '../../lib/collections/activities';

const time = [15, 30, 45, 60];

//------------------------------------------------------------------------------------
// Creates fake data for the Activities collection
//------------------------------------------------------------------------------------
const _createFakeActivities = () => ({

  customerId: faker.random.number(),
  customerName: faker.name.findName(),
  productName: faker.random.arrayElement(GLOBAL.products),
  brokerId: faker.random.number(),

  phase: faker.random.arrayElement(GLOBAL.phases),
  source: faker.random.arrayElement(GLOBAL.custOrigin),
  timeToExpire: faker.date.future(),
  timeToExpireMin: faker.random.arrayElement(time),
  acquiredProducts: [faker.random.arrayElement(GLOBAL.products)],
});

Meteor.methods({

  /**
   * @memberOf Activity
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'activities.createFake': function () {
    Activities.remove({});
    if (!Activities.findOne()) {
      Array(...Array(30)).map(() => {
        const activitiy = _createFakeActivities();
        console.log(activitiy);
        Activities.insert(activitiy);
      });
    }
  },

  //------------------------------------------------------------------------------------
  // Add (random mode) more elements into the "acquiredProducts" array attribute
  //------------------------------------------------------------------------------------
  'activities.addArrayElements': function () {
    Activities.aggregate({ $sample: { size: 10 } }).forEach((myDoc) => {
      Activities.update({ _id: myDoc._id },
        { $addToSet: { acquiredProducts: faker.random.arrayElement(GLOBAL.products) } });
    });
  },


});

// if (!Activities.findOne()) {
// 	Meteor.call('activities.createFake');
// 	Meteor.call('activities.addArrayElements');
// }
