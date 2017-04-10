Meteor.methods({

  /**
   * @memberOf CustChildren
   * @name insert
   * @summary Insert a child of a customer into collection
   *
   * @param {custChild} CustChildren - Child of a customer
   */
  'custChildren.insert': function (custChild) {

    return (CustChildren.insert(

      { customerId: custChild.customerId,
        name: custChild.name,
        age: custChild.age,
        educAnnualCost: custChild.educAnnualCost,
        hasHealthInsur: custChild.hasHealthInsur,
        nameHealthInsur: custChild.nameHealthInsur,
        hasSocialSecur: custChild.hasSocialSecur,
        nameSocialSecur: custChild.nameSocialSecur
      },
    ));
  },

  /**
   * @memberOf CustChildren
   * @name update
   * @summary Updates a child of a customer into collection
   *
   * @param {custChild} CustChildren - Child of a customer
   */
  'custChildren.update': function (custChild) {

    console.error(JSON.stringify(custChild, null, 2));

    return (CustChildren.update(
      { _id: custChild.id },
      { $set: {
        name: custChild.name,
        age: custChild.age,
        educAnnualCost: custChild.educAnnualCost,
        hasHealthInsur: custChild.hasHealthInsur,
        nameHealthInsur: custChild.nameHealthInsur,
        hasSocialSecur: custChild.hasSocialSecur,
        nameSocialSecur: custChild.nameSocialSecur
      }}
    ));


  },

  /**
   * @memberOf CustChildren
   * @name remove
   * @summary Removes a child of a customer from collection
   *
   * @param {custChild} CustChildren - Child of a customer
   */
  'custChildren.remove': function (custChild) {

    return (CustChildren.remove(custChild));
  },

});
