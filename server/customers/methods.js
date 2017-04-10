import 'isomorphic-fetch';

Meteor.methods({

  /**
   * @memberOf Customer
   * @name findTopAndInsert
   * @summary Get top customers from Machine Learning service
   * @param {String} BrokerId - BrokerId to be passed to service
   * @param {String} productName - Product name to be passed to service
   */
  'customers.findTopAndInsert': function (brokerId, productName) {
    getTopCustomersAndInsertQuotation(brokerId, productName);
  },

  /**
   * @memberOf Customer
   * @name update
   * @summary Updates customer into collection
   * @param {Customer} customer - customer personal info to be updated
   */
  'customers.updatePersonal': function (customer) {

    return Customers.update(customer.id, {

      $set: {
        name: customer.name,
        nickName: customer.nickName,
        birthday: customer.birthday,
        document: customer.document,
        gender: customer.gender,
        maritalStatus: customer.maritalStatus,
        homePhone: customer.homePhone,
        mobilePhone: customer.mobilePhone,
        mobileOperator: customer.mobileOperator,
        mobileBill: customer.mobileBill
      },
    });
  },

  /**
   * @memberOf Customer
   * @name update
   * @summary Updates customer into collection
   * @param {Customer} customer - customer professional info to be updated
   */
  'customers.updateProfessional': function (customer) {

    return Customers.update(customer.id, {

      $set: {
        profession: customer.profession,
        company: customer.company,
        position: customer.position,
        salaryRange: customer.salaryRange,
        workZipcode: customer.workZipcode,
        workAddress: customer.workAddress,
        workComplement: customer.workComplement,
        workNeighbhood: customer.workNeighbhood,
        workCity: customer.workCity,
        workState: customer.workState,
        workEmail: customer.workEmail,
        workPhone: customer.workPhone,
        income: customer.income
      },
    });
  },

  /**
   * @memberOf Customers
   * @name updatePartner
   * @summary Updates customer partner into collection
   * @param {partner} Partner - customer partner info to be updated
   */
  'customers.updatePartner': function (partner) {

      Customers.update({ _id: partner.customerId }, {
        $set: {

          partner:
            {
              name: partner.name,
              birthday: partner.birthday,
              gender: partner.gender,
              mobilePhone: partner.mobilePhone,
              income: partner.income
            },
        },
      });
  },

  /**
   * @memberOf Customers
   * @name removePartner
   * @summary Removes customer partner from collection
   * @param {partner} Partner - Customer partner info to be removed
   */
  'customers.removePartner': function (customer) {

    Customers.update({ _id: customer._id }, {$unset: {partner:1}}, false, true);
  },

  /**
   * @memberOf Customers
   * @name updateBankInfo
   * @summary Updates customer bank info into collection
   * @param {bankInfo} Bank info - Customer bank info to be updated
   */
  'customers.updateBankInfo': function (bankInfo) {

    Customers.update({ _id: bankInfo.customerId }, {
      $set: {

        bankInfo:
          {
            bank: bankInfo.bank,
            agency: bankInfo.agency,
            account: bankInfo.account
          },
      },
    });
  },

  /**
   * @memberOf Customers
   * @name removeBankInfo
   * @summary Removes customer bank info from collection
   * @param {partner} Partner - customer bank info to be removed
   */
  'customers.removeBankInfo': function (customer) {

    Customers.update({ _id: customer._id }, {$unset: {bankInfo:1}}, false, true);
  },

});

/**
 * @memberOf Customer
 * @summary Gets top customers from Machine Learning service, get
 *          Gets data from Customer collection and
 *          Insert doc into Quotations collection
 *
 *          http://54.224.116.49:5052/recommendations/{customerId}/top-customers/{productName}
 * @param {String} BrokerId - Broker Id to be passed to service
 * @param {String} productName - Product name to be passed to service
 */
async function getTopCustomersAndInsertQuotation(brokerId, productName) {
  try {
    // var url = GLOBAL.customers.urlServiceMLTopCustomers;
    // var urlTopCusts = url.replace('{customerId}', brokerId).replace('{productName}', productName);

    // let response = await fetch(urlTopCusts);
    // let idTopCust = await response.json();

    //------------------------------------------------------------------------------------------------------------

    // Customers.aggregate({$match: {_id: { $in: idTopCust}}}).forEach( function(customer) {

    Customers.aggregate([{ $sample: { size: 10 } }]).forEach((customer) => {
      Meteor.call('quotations.insert', customer, brokerId, productName);
      Meteor.call('custProdHistory.insertUpd', customer._id, brokerId, productName, GLOBAL.initPhaseQuot, GLOBAL.initStatusQuot);
    });
  } catch (error) {
    console.error(error);
  }
}
