module.exports = function () {
  'use strict';
  const productName = 'carro-facil';
  var SummaryProfileURL;
  
  this.Before(() => {
    
    //Make Login and go to dashboard page
    navigation.login.makeLogin();
  
    //Generate a click lead by brokerId and product name and retrieve customer id
    let clickLead = fixtures.clickLead.generateAndGetByBrokerIdAndProduct(navigation.brokerId, productName);
    let customerIdForProduct = clickLead.customerId;
  
    //Set summary profile url for this product x customer
    SummaryProfileURL = navigation.mainPageUrl + 'summary-profile/' + customerIdForProduct + '/' + productName;
  });
  
  this.Given(/^Eu corretor estou na tela de perfil resumido do cliente$/, function () {
    
    //Open Summary profile page and waiting for full loading in quotation page
    browser.url(SummaryProfileURL);
    let isReloadFinish = '//*[@id="div-main"]/div/div[1]/div[2]';
    browser.waitForExist(isReloadFinish, 9*navigation.seconds, true);
    
    //Check if the the button in summary button is load
    let initQuotationButton = '//*[@id="ini"]';
    browser.waitForExist(initQuotationButton, 9*navigation.seconds);
    expect(browser.element(initQuotationButton).getText()).toEqual('Iniciar Cotação');
  });
  
  this.When(/^eu clicar no botão Iniciar Cotação$/, function () {
    
    //Open Summary profile page and waiting for full loading in quotation page
    browser.url(SummaryProfileURL);
    browser.pause(5*navigation.seconds);
    
    //Click on the button
    let initQuotationButton = '//*[@id="ini"]';
    browser.waitForExist(initQuotationButton, 9*navigation.seconds);
    browser.scroll(0, 250);
    browser.moveToObject(initQuotationButton);
    browser.click(initQuotationButton);
  });
  
  this.When(/^o cliente tiver propensão para comprar o Carro Fácil$/, function () {
    
    //Not defined in BDD
    return 'ok';
  });
  
  this.Then(/^será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes perguntas na tela: "([^"]*)"$/, function (arg1) {
    
    //Waiting for nimble card and check for the argument
    //browser.pause(5*navigation.seconds);
    let nimbleQuestionCard = '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p';
    browser.waitForExist(nimbleQuestionCard, 9*navigation.seconds);
    expect(browser.element(nimbleQuestionCard).getText()).toEqual(arg1);
  });
};
