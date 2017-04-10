Meteor.publish(

  /**
   * @memberOf RecommendedProds
   * @summary Gets all docs from the collection
   */
  'recommendProds.all', () => (RecommendProds.find({})),

);

