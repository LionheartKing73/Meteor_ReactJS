Meteor.publish(

  /**
   * @memberOf Communications
   * @summary Inserts initial fake data for the collection
   */
	'communications.all', () => (Communications.find({})),

);
