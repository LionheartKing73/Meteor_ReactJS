Meteor.methods({

  /**
   * @memberOf CustProdHistory
   * @name insertUpd
   * @summary Inserts / updates customer x product quotation history into collection
   *
   * @param {String} customerId - Customer associated
   * @param {String} brokerId - BrokerId associated
   * @param {String} productName - Product name associated
   * @param {String} newPhase - New phase to be added to history
   * @param {String} newStatus - New status to be added to history
   */
  'custProdHistory.insertUpd': function (customerId, brokerId, productName, newPhase, newStatus) {
    let custActualStatus;

    // If newPhase is empty, gets current phase
    if (newPhase == '') {
      custActualStatus = CustProdHistory.findOne({ customerId, brokerId, productName });
      newPhase = custActualStatus.actualPhase;
    }

    return (CustProdHistory.update(
      { customerId,
        brokerId,
        productName,
      },
      { $set: {
        customerId,
        brokerId,
        productName,

        actualPhase: newPhase,
        actualStatus: newStatus,
      },
        $addToSet: { history:
        {
          date: new Date(),
          phase: newPhase,
          status: newStatus,
        },
        },
      },
      { upsert: true },
    ));
  },

});
