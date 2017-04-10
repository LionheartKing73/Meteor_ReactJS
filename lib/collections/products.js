import SimplesSchema from '../__core/packages/SimpleSchema/lib/main.js';
const _Products = new Mongo.Collection('products');
export default _Products;
global.Products = _Products;

// Schemas.Arguments = new SimpleSchema({
//     type: String
// });

Schemas.Products = new SimpleSchema({
  ...SchemaBase,
  systemName: {
    type: String,
    label: 'Nome do Produto no Sistema',
    min: 2,
    max: 100,
  },
  name: {
    type: String,
    label: 'Nome do Produto',
  },
  description: {
    type: String,
    label: 'Descrição',
  },
  benefits: {
    type: String,
    label: 'Benefícios',
  },
  services: {
    type: String,
    label: 'Serviços',
  },
  actualGoal: {
    type: Number,
    label: 'Meta Atual',
  },
  monthlyGoal: {
    type: Number,
    label: 'Meta Mensal',
  },
  startDate: {
    type: Date,
    label: 'Data Início da Vigência',
  },
  endDate: {
    type: Date,
    label: 'Data Término da Vigência',
  },

  // arguments: {
  //   type: Array,
  //   label: 'Argumentos'
  // },
  // 'arguments.$': {
  //   type: Schemas.Arguments,
  //   label: 'Argumento'
  // },

});

Products.attachSchema(Schemas.Products);
