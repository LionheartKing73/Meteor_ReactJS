fixtures.clickLead = {
  'generateAndGetByBrokerIdAndProduct': function(brokerId, productName) {
    return server.execute(function (brokerId, productName) {
      const activityForTheProduct = Activities.findOne({
        brokerId   : brokerId,
        productName: productName,
      });
      if (activityForTheProduct != undefined) {
        return activityForTheProduct;
      }
      else {
        const faker = require('faker');
        const time = [15, 30, 45, 60];
        const activitiyData = {
          customerId      : faker.random.number(),
          customerName    : faker.name.findName(),
          productName     : productName,
          brokerId        : brokerId,
          phase           : faker.random.arrayElement(GLOBAL.phases),
          source          : faker.random.arrayElement(GLOBAL.custOrigin),
          timeToExpire    : faker.date.future(),
          timeToExpireMin : faker.random.arrayElement(time),
          acquiredProducts: [faker.random.arrayElement(GLOBAL.products)],
        };
        return Activities.insert(activitiyData);
      }
    }, brokerId, productName);
  },
};
