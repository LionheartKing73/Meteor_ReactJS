
Meteor.methods({

  /**
   * @memberOf Products
   * @name insert
   * @summary Inserts the doc into Products collection
   * @param {product} product - product info to be inserted
   */
  'products.insert': function (product) {
    console.log(`products.insert - ${product}`);

    return (Products.insert({

      systemName: product.systemName,
      name: product.name,
      description: product.description,
      benefits: product.benefits,
      services: product.services,
      actualGoal: product.actualGoal,
      monthlyGoal: product.monthlyGoal,
      startDate: product.startDate,
      endDate: product.endDate,
    }));
  },

  /**
   * @memberOf Products
   * @name remove
   * @summary Deletes product from collection
   * @param {product} product - product info to be removed
   */
  'products.remove': function (product) {
    return Products.remove(product);
  },

  /**
   * @memberOf Products
   * @name update
   * @summary Updates product into collection
   * @param {product} product - product info to be updated
   */
  'products.update': function (product) {
    return Products.update(product.id, {

    	$set: {
      systemName: product.systemName,
      name: product.name,
      description: product.description,
      benefits: product.benefits,
      services: product.services,
      actualGoal: product.actualGoal,
      monthlyGoal: product.monthlyGoal,
      startDate: product.startDate,
      endDate: product.endDate,
    	},
    });
  },


});
