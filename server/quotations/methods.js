Meteor.methods({

  /**
   * @memberOf Quotations
   * @name insert
   * @summary Checks if the docs exists for the index (customerCode, brokerId and productName)
   *					If not, inserts the doc into Quotation collection
	 *
	 * @param {String} customerId - Customer Id associated to the doc
   * @param {String} brokerId - Broker Id associated to the doc
   * @param {String} productName - Product name associated to the doc
   */
  'quotations.insert': function (customer, brokerId, productName) {
    const custProdNames = [];
    AcquiredProducts.find({ customerId: customer._id }).forEach((prods) => {
      custProdNames.push(prods.productName);
    });

    // console.log('==== cusProdNames: ' + JSON.stringify(custProdNames, null, 2));

    return (Quotations.update(
      { customerId: customer._id,
        brokerId,
        productName,
      },
      { customerId: customer._id,
        brokerId,
        productName,

        customerName: customer.name,
        phase: GLOBAL.initPhaseQuot,
        source: customer.originId,

        acquiredProducts: custProdNames,
      },
			{ upsert: true },
		));
  },

  'quotations.getNextQuoteNum'(){
    return (Quotations.find().count() + 1) * QUOTE_HASH_MULTIPLIER
  }
});
