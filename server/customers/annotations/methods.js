Meteor.methods({

  /**
   * @memberOf Annotation
   * @name insert
   * @summary Gets current phase for customer x product quotation and inserts annotation
   *
   * @param {String} customerId - Customer who made the annotation
   * @param {String} brokerId - BrokerId associated to the annotation
   * @param {String} productName - Product name associated to the annotation
   * @param {String} annotation - Described annotation
   */
  'annotations.insert': function (customerId, brokerId, productName, annotation) {
    const custActualStatus = CustProdHistory.findOne({ customerId, brokerId, productName });

    return (Annotations.insert(
      { customerId,
        brokerId,
        productName,

        date: new Date(),
        phase: custActualStatus.actualPhase,
        description: annotation,
      },
    ));
  },

});
