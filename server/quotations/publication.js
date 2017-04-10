Meteor.publish('quotations.all', () => (Quotations.find({})));

Meteor.publish('customer.lastProductQuote', function (customerId, productName) {
  return Quotations.find({ brokerId: this.userId, customerId, productName });
});
