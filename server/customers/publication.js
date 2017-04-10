Meteor.publish('customers.all', function() {
  return Customers.find({brokerId: this.userId})
});
