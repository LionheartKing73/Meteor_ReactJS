import React, { Component } from 'react';
import Products from '../../lib/collections/products';

Meteor.methods({

  /**
   * @memberOf Products
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'products.createFake': function () {
    // console.log('products.createFake');

    Products.insert({

      systemName: 'alarme-mais',
      name: 'Alarme Mais',
      description: faker.lorem.paragraph(),
      benefits: faker.lorem.paragraph(),
      services: faker.lorem.paragraph(),
      actualGoal: 15,
      monthlyGoal: 20,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    });

    Products.insert({
      systemName: 'seguro-auto',
      name: 'Seguro Auto',
      description: faker.lorem.paragraph(),
      benefits: faker.lorem.paragraph(),
      services: faker.lorem.paragraph(),
      actualGoal: 8,
      monthlyGoal: 20,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    });

    Products.insert({
      systemName: 'carro-facil',
      name: 'Carro Fácil',
      description: faker.lorem.paragraph(),
      benefits: faker.lorem.paragraph(),
      services: faker.lorem.paragraph(),
      actualGoal: 10,
      monthlyGoal: 20,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    });
  },

  /**
   * @memberOf Products
   * @name addArrayElements
   * @summary Add (random mode) more elements into the some array attributes
   */
  'products.addArrayElements': function () {
    Products.find({}).forEach((prod) => {
      for (let i = 0; i < 2; i++) {
        Products.update({ _id: prod._id }, {
          $addToSet: {
            arguments: faker.lorem.paragraph(),
          },
        });
      }
    });
  },

});

if (!Products.findOne()) {
  Meteor.call('products.createFake');
  // Meteor.call('products.addArrayElements');
}

