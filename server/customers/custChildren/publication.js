Meteor.publish(

  /**
   * @memberOf CustChildren
   * @summary Gets all docs from the collection
   */
  'custChildren.all', () => (CustChildren.find({})),

);

