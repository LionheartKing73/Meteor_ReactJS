Meteor.publish(

  /**
   * @memberOf CustProperties
   * @summary Gets all docs from the collection
   */
  'custProperties.all', () => (CustProperties.find({})),

);

