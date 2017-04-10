Meteor.methods({

  /**
   * @memberOf ProdArguments
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'prodArguments.createFake': function () {
    for (let i = 0; i < GLOBAL.products.length; i++) {
      ProdArguments.insert({
        productName: GLOBAL.products[i],
        arguments: [
          'Você recebe em média R$ 750,00 na venda do contrato de um ano e pode chegar até R$ 2.200,00 na venda do contrato de dois anos!',
          'A cada 05 Carro Fácil vigentes em sua carteira você ganha 150 reais mensais a mais na sua comissão.',
          'Você também poderá vender nossos seminovos com comissão de R$ 500,00 a R$ 1.100,00 por carro e depois ofertar outros produtos como o seguro auto e financiamento, por exemplo.',
        ],
      });
    }
  },

  /**
   * @memberOf ProdArguments
   * @name addArrayElements
   * @summary Add (random mode) more elements into the some array attributes
   */
  'prodArguments.addArrayElements': function () {
    ProdArguments.find({}).forEach((prod) => {
      for (let i = 0; i < 2; i++) {
        ProdArguments.update({ _id: prod._id }, {
          $addToSet: {
            arguments: faker.lorem.paragraph(),
          },
        });
      }
    });
  },

});

if (!ProdArguments.findOne()) {
  Meteor.call('prodArguments.createFake');
  // Meteor.call('prodArguments.addArrayElements');
}
