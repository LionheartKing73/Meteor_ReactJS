function OpenSummaryProfileNavigation() {
  this.openThePageForTheProduct = function() {
    //Generate a click lead by brokerId and product name and retrieve customer id
    let clickLead = fixtures.clickLead.generateAndGetByBrokerIdAndProduct(navigation.brokerId, fixtures.productName);
    let customerIdForProduct = clickLead.customerId;
  
    //Set summary profile url for this product x customer
    let SummaryProfileUrl = navigation.mainPageUrl + 'summary-profile/' + customerIdForProduct + '/' + fixtures.productName;
  
    //Open Summary profile page and waiting for full loading in quotation page
    browser.url(SummaryProfileUrl);
    browser.waitForExist(fixtures.selectors.summaryProfile['Loading'].selector, 9*navigation.seconds, true);
  
    //Check if the the button in summary button is load
    browser.waitForExist(fixtures.selectors.summaryProfile['Iniciar Cotação'].selector, 9*navigation.seconds);
    expect(browser.element(fixtures.selectors.summaryProfile['Iniciar Cotação'].selector).getText()).toEqual('Iniciar Cotação');
  }
}
navigation.summaryProfile = new OpenSummaryProfileNavigation();