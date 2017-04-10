const _CustProperties = new Mongo.Collection('custProperties');
export default _CustProperties;
global.CustProperties = _CustProperties;

Schemas.CustProperties = new SimpleSchema({
  ...SchemaBase,

  customerId: {
    type: String,
    label: 'Id do Cliente',
  },

  //-- Row 1 ----------------------------

  hasAlarm: {
    type: String,
    label: 'Possui alarme',
  },
  hasInsur: {
    type: String,
    label: 'Possui seguro',
  },
  nameInsur: {
    type: String,
    label: 'Qual instituição',
    optional: true
  },
  type: {
    type: String,
    label: 'Tipo da residência',
  },

  //-- Row 2 ----------------------------

  profile: {
    type: String,
    label: 'Perfil',
  },
  zipCode: {
    type: String,
    label: 'CEP',
    optional: true
  },
  address: {
    type: String,
    label: 'Endereço',
    optional: true
  },

  //-- Row 3 ----------------------------

  complement: {
    type: String,
    label: 'Complemento',
    optional: true
  },
  neighbhood: {
    type: String,
    label: 'Bairro',
    optional: true
  },
  city: {
    type: String,
    label: 'Cidade',
    optional: true
  },
  uf: {
    type: String,
    label: 'UF',
    optional: true
  },

  //-- Row 4 ----------------------------

  inCondominium: {
    type: String,
    label: 'Mora em condomínio',
    optional: true
  },
  value: {
    type: Number,
    label: 'Valor estimado',
  },
  footage: {
    type: Number,
    label: 'Metragem',
  },
  hasEmployees: {
    type: String,
    label: 'Possui empregados',
    optional: true
  },

  //-- Row 5 ----------------------------

  hasPets: {
    type: String,
    label: 'Animais domésticos',
    optional: true
  },
  homeOffice: {
    type: String,
    label: 'Home Office',
    optional: true
  },
  validity: {
    type: String,
    label: 'Vigência',
    optional: true
  },
  hasOldPeople: {
    type: String,
    label: 'Possui pessoas idosas',
  },

  //-- Row 6 ----------------------------

  hasConsortium: {
    type: String,
    label: 'Possui consórcio',
  },

});

CustProperties.attachSchema(Schemas.CustProperties);
