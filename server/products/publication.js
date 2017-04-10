Meteor.publish(

	'products.all', () => (Products.find({})),

);
