module.exports = function() {
  'use strict';
  
  this.Before(() => {
    fixtures.quotations.clean();
  });
  
  this.Given(/^estou na tela de perfil resumido do cliente que tenha a propensao de comprar o Carro Fácil$/, function () {
    navigation.login.makeLogin();
    navigation.summaryProfile.openThePageForTheProduct();
  });
  
  this.When(/^eu clicar no botão "([^"]*)"$/, function (buttonLabel) {
    fixtures.actions.clickOn(fixtures.selectors.summaryProfile[buttonLabel].selector);
  });
  
  this.Then(/^será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes perguntas na tela: "([^"]*)"$/, function (question) {
    expect(fixtures.cards.checkForThisCardWithThisNameAndSelector(fixtures.selectors.nimbleQuestionsCard[question].selector, question)).toBe(true);
  });
  
  this.Then(/^será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes argumentações na tela: "([^"]*)"$/, function (argumentList) {
    expect(fixtures.arguments.checkForThisListOfArgumentsInNimble(argumentList)).toBe(true);
  });
};
