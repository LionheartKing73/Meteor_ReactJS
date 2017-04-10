module.exports = function() {
  'use strict';
  
  this.Before(() => {
    fixtures.quotations.clean();
  });
  
  this.Given(/^estou na tela de questionário lúdico do Carro Fácil$/, function () {
    navigation.login.makeLogin();
    navigation.summaryProfile.openThePageForTheProduct();
  });
  
  this.When(/^eu estiver respondendo à pergunta "([^"]*)"$/, function (question) {
    expect(fixtures.cards.checkForThisCardWithThisNameAndSelector(fixtures.selectors.nimbleQuestionsCard[question].selector, question)).toBe(true);
  });
  
  this.When(/^escolher a resposta "([^"]*)" para a pergunta "([^"]*)"$/, function (response, question) {
    fixtures.actions.clickOn(fixtures.selectors.nimbleQuestionsCard[question].options[response]);
  });
  
  this.Then(/^deverão aparecer os seguintes blocos de pergunta: "([^"]*)"$/, function (questionList) {
    expect(fixtures.cards.checkForThisListOfQuestionCardsInNimble(questionList)).toBe(true);
  });
  
  this.Then(/^deverão ser exibidas as seguintes argumentações: "([^"]*)"$/, function (argumentList) {
    expect(fixtures.arguments.checkForThisListOfArgumentsInNimble(argumentList)).toBe(true);
  });
  
  this.Then(/^deverá ser aberto o bloco para responder à pergunta: "([^"]*)"$/, function (question) {
    expect(fixtures.cards.checkForThisCardWithThisNameAndSelector(fixtures.selectors.nimbleQuestionsCard[question].selector, question)).toBe(true);
  });
};
