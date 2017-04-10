const _CustChildren = new Mongo.Collection('custChildren');
export default _CustChildren;
global.CustChildren = _CustChildren;

Schemas.CustChildren = new SimpleSchema({
  ...SchemaBase,

  customerId: {
    type: String,
    label: 'Id do Cliente',
  },
  name: {
    type: String,
    label: 'Nome do Filho',
    min: 2,
    max: 100,
  },
  age: {
    type: Number,
    label: 'Idade',
  },
  educAnnualCost: {
    type: Number,
    label: 'Custo anual com educação',
  },
  hasHealthInsur: {
    type: String,
    label: 'Possui seguro de saúde',
  },
  nameHealthInsur: {
    type: String,
    label: 'Nome do seguro de saúde',
    optional: true
  },
  hasSocialSecur: {
    type: String,
    label: 'Possui previdência',
  },
  nameSocialSecur: {
    type: String,
    label: 'Nome da instituição',
    optional: true
  }

});

CustChildren.attachSchema(Schemas.CustChildren);
