fixtures.actions = {
  'clickOn': function(htmlElementToClickSelector) {
    //Click on the button
    browser.waitForExist(htmlElementToClickSelector, 2*9*navigation.seconds);
    browser.moveToObject(htmlElementToClickSelector);
    browser.click(htmlElementToClickSelector);
  },
};