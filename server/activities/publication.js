Meteor.publish(

  /**
   * @memberOf Activity
   * @summary Gets all docs from the collection
   */
	'activities.all', () => (Activities.find({})),

);
