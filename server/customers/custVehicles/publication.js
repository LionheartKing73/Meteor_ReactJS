Meteor.publish(

  /**
   * @memberOf CustVehicles
   * @summary Gets all docs from the collection
   */
  'custVehicles.all', () => (CustVehicles.find({})),

);

