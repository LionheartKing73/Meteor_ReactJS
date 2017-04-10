Meteor.methods({
  findCarros(text) {
    return Carros.find({ name: new RegExp(text, 'mig') }, { limit: 20 }).fetch();
  },
	/**
	 * @memberOf carros.contratos
	 * @name getOffer
	 * @summary Get "Oferta Final" cars, cheaper and superior, based in chosen car
	 * @param {String} currentCarId - Choosen car ID
	 */
  'carros.getOffer': function (currentCarId) {
  	const currentCar = CarrosContrato.findOne(currentCarId);

  	if(currentCar) {
  		if(!currentCar.contratos)
  			throw Meteor.Error('400', 'Contrato indisponível');

  		const currentPrice = currentCar.contratos[0].price;
  		const inferior = CarrosContrato.findOne(
				{_id: {$ne: currentCar._id}, "contratos.price": {$lte: currentPrice}},
				{sort: {"contratos.price": -1}, limit: 1}
			);
			const superior = CarrosContrato.findOne(
				{_id: {$nin: [currentCar._id, (inferior._id || "")]}, "contratos.price": {$gt: currentPrice}},
				{sort: {"contratos.price": 1}, limit: 1}
			);

			return {
				current: currentCar,
				inferior,
				superior
			};
		}
		throw Meteor.Error('400', 'Carro indisponível');
  },
  'carros.getList': function (marca) {
    return CarrosContrato.find({ marca: marca.toUpperCase() }).fetch().map(carro => ({ label: carro.name, value: carro._id }));
  },
  'carros.getCar': function (id) {
  	return CarrosContrato.findOne(id);
  },
});
