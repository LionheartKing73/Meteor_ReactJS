const _Customers = new Mongo.Collection('customers');
export default _Customers;
global.Customers = _Customers;
