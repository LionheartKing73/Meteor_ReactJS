Meteor.methods({

  /**
   * @memberOf CustProperties
   * @name insert
   * @summary Insert a property of a customer into collection
   *
   * @param {custProperty} CustProperties - Property of a customer
   */
  'custProperties.insert': function (property) {

    return (CustProperties.insert(

      { customerId: property.customerId,

        hasAlarm: property.hasAlarm,
        hasInsur: property.hasInsur,
        nameInsur: property.nameInsur,
        type: property.type,

        profile: property.profile,
        zipCode: property.zipCode,
        address: property.address,

        complement: property.complement,
        neighbhood: property.neighbhood,
        city: property.city,
        uf: property.uf,

        inCondominium: property.inCondominium,
        value: property.value,
        footage: property.footage,
        hasEmployees: property.hasEmployees,

        hasPets: property.hasPets,
        homeOffice: property.homeOffice,
        validity: property.validity,
        hasOldPeople: property.hasOldPeople,

        hasConsortium: property.hasConsortium
      },
    ));
  },

  /**
   * @memberOf CustProperties
   * @name update
   * @summary Updates a property of a customer into collection
   *
   * @param {custProperty} CustProperties - Property of a customer
   */
  'custProperties.update': function (property) {

    console.error(JSON.stringify(property, null, 2));

    return (CustProperties.update(
      { _id: property.id },
      { $set: {

        hasAlarm: property.hasAlarm,
        hasInsur: property.hasInsur,
        nameInsur: property.nameInsur,
        type: property.type,

        profile: property.profile,
        zipCode: property.zipCode,
        address: property.address,

        complement: property.complement,
        neighbhood: property.neighbhood,
        city: property.city,
        uf: property.uf,

        inCondominium: property.inCondominium,
        value: property.value,
        footage: property.footage,
        hasEmployees: property.hasEmployees,

        hasPets: property.hasPets,
        homeOffice: property.homeOffice,
        validity: property.validity,
        hasOldPeople: property.hasOldPeople,

        hasConsortium: property.hasConsortium
      }}
    ));


  },

  /**
   * @memberOf CustProperties
   * @name remove
   * @summary Removes a property of a customer from collection
   *
   * @param {custProperty} CustProperties - Property of a customer
   */
  'custProperties.remove': function (custProperty) {

    return (CustProperties.remove(custProperty));
  },

});
