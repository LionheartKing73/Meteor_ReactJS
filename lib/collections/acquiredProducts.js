const _AcquiredProducts = new Mongo.Collection('acquiredProducts');
export default _AcquiredProducts;
global.AcquiredProducts = _AcquiredProducts;

