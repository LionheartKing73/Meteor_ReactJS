fixtures.quotations = {
  'clean': function() {
    return server.execute(function() {
      return Quotations.remove({});
    });
  }
};