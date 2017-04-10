Meteor.publish(

  /**
   * @memberOf AcquiredProducts
   * @summary Gets all docs from the collection
   */
  'acquiredProducts.all', () => (AcquiredProducts.find({})),

);

