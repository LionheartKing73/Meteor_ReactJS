Meteor.methods({

  /**
   * @memberOf CustVehicles
   * @name insert
   * @summary Insert a Vehicle of a customer into collection
   *
   * @param {custVehicle} CustVehicle - Vehicle of a customer
   */
  'custVehicles.insert': function (custVehicle) {

    return (CustVehicles.insert(

      { customerId: custVehicle.customerId,

        model: custVehicle.model,
        year: custVehicle.year,
        typeOfUse: custVehicle.typeOfUse,
        insured: custVehicle.insured,
        kmMedia: custVehicle.kmMedia,
        carSeat: custVehicle.carSeat,
        mainVehicle: custVehicle.mainVehicle
      },
    ));
  },

  /**
   * @memberOf CustVehicles
   * @name update
   * @summary Updates a Vehicle of a customer into collection
   *
   * @param {custVehicle} CustVehicles - Vehicle of a customer
   */
  'custVehicles.update': function (custVehicle) {

    console.error(JSON.stringify(custVehicle, null, 2));

    return (CustVehicles.update(
      { _id: custVehicle.id },
      { $set: {

        model: custVehicle.model,
        year: custVehicle.year,
        typeOfUse: custVehicle.typeOfUse,
        insured: custVehicle.insured,
        kmMedia: custVehicle.kmMedia,
        carSeat: custVehicle.carSeat,
        mainVehicle: custVehicle.mainVehicle
      }}
    ));
  },

  /**
   * @memberOf CustVehicles
   * @name remove
   * @summary Removes a Vehicle of a customer from collection
   *
   * @param {custVehicle} CustVehicles - Vehicle of a customer
   */
  'custVehicles.remove': function (custVehicle) {

    return (CustVehicles.remove(custVehicle));
  },

});
