const _CustVehicles = new Mongo.Collection('custVehicles');
export default _CustVehicles;
global.CustVehicles = _CustVehicles;

Schemas.CustVehicles = new SimpleSchema({
  ...SchemaBase,

  customerId: {
    type: String,
    label: 'Id do Cliente',
  },
  model: {
    type: String,
    label: 'Modelo',
    min: 2,
    max: 100,
  },
  year: {
    type: Number,
    label: 'Ano',
  },
  typeOfUse: {
    type: String,
    label: 'Tipo de uso',
  },
  insured: {
    type: String,
    label: 'Segurado',
  },
  kmMedia: {
    type: String,
    label: 'Média de KM',
  },
  carSeat: {
    type: String,
    label: 'Cadeira veicular',
  },
  mainVehicle: {
    type: String,
    label: 'Veículo principal',
  }

});

CustVehicles.attachSchema(Schemas.CustVehicles);
