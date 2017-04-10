Meteor.publish(

  'custProdHistory.all', () => (CustProdHistory.find({}, { $sort: { 'history.date': -1 } })),

);
