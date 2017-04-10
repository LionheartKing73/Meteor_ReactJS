const _Carros = new Mongo.Collection('carros.modelos');
export default _Carros;
global.Carros = _Carros;

export const _MarcasCarros = new Mongo.Collection('carros.marcas');
global.MarcasCarros = _MarcasCarros;

export const _CarrosContrato = new Mongo.Collection('carros.contratos');
global.CarrosContrato = _CarrosContrato;
