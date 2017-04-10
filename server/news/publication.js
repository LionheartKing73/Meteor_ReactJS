Meteor.publish(

	'news.all', () => (News.find({})),

);
