import camelcase from 'camelcase';

function getArgs({currentStepID = 'generic', responseValue = null, productName}){
  productName = camelcase(productName);
  return Argumentacoes.find({product: productName, questionId: currentStepID, responseValue}).fetch()
}


Meteor.methods({
  /**
   * Faz umdate da Quotation,
   * exceto dados em keysToDeleteForPreventMongoMultipleKeyError
   *
   * @param customerId
   * @param productName
   * @param currentStepID
   * @param responseValue
   * @param clientReduxState
   * @returns dados em para fazer replace no client-side
   */
  'nimble.sync'({customerId, productName, currentStepID = 'generic', responseValue = null, clientReduxState}) {
    productName = camelcase(productName);// carro-facil => carroFacil

    let query = { customerId, productName };
    query.brokerId = this.userId;

    let atualQuote = Quotations.findOne(query, { sort: { updatedAt: -1 } });

    // cria Quote se não existe
    if (!atualQuote) {
      const newId = Quotations.insert({
        ...query,
        quoteNum: Meteor.call('quotations.getNextQuoteNum')
      });
      atualQuote = Quotations.findOne(newId);
    }

    const dataToReplace = {
      argumentos: getArgs({ currentStepID, responseValue, productName }),
      customer: Customers.findOne(customerId)
    };

    /**
     * atualiza quote recem criada ou ja existente
     */
    const keysToDeleteForPreventMongoMultipleKeyError = [
      'argumentos', 'customer', 'customerId', 'productName', 'clientReduxState'
    ];

    keysToDeleteForPreventMongoMultipleKeyError.map(key => {
      delete atualQuote[key];
      delete query[key];
    });

    const $set = {
      ...atualQuote,
      ...query,
      ...dataToReplace
    };

    const $addToSet = {
      clientReduxState: {
        addedToSetAt: new Date,
        ...clientReduxState
      },
    };

    Quotations.update(atualQuote._id, {
      $addToSet,
      $set
    });

    return Quotations.findOne(atualQuote._id);
  },

  'quote.saveLastState'(state){
    Quotations.update(state._id, state);
    return Quotations.findOne(state._id);
  },

  'nimble.getArgs'({currentStepID, responseValue, productName}){
    return getArgs({currentStepID, responseValue, productName});
  }
});
