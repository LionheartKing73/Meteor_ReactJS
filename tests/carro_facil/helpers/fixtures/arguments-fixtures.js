fixtures.arguments = {
  'checkForThisListOfArgumentsInNimble': function(argumentsToCheck) {
    //Wait for arguments load
    let argumentField = '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/div/ul/li[1]/div[1]/p';
    browser.waitForExist(argumentField, 9*navigation.seconds);
  
    //Split array of arguments to check
    var fieldsToCheck = argumentsToCheck.split('|');
  
    //Check in arguments if is right
    var isAllFieldsCorrect = 0;
    for (let indexTablePointer = 1; indexTablePointer < fieldsToCheck.length + 1; indexTablePointer++) {
  
      //Check if argument exist
      let argumentField =  '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/div/ul/li[' + indexTablePointer.toString() + ']/div[1]/p';
      if (browser.isExisting(argumentField) == true) {
  
        //Check if the label is the correct
        //console.log('argument_table[' + browser.element(argumentField).getAttribute('innerText') + '] with split[' + fieldsToCheck[indexTablePointer-1].trim() + ']');
        expect(browser.element(argumentField).getAttribute('innerText')).toEqual(fieldsToCheck[indexTablePointer-1].trim());
        isAllFieldsCorrect++;
      }
    }
    
    //Return with check of all arguments valid
    if (isAllFieldsCorrect == fieldsToCheck.length) {
      return true;
    }
    return false;
  }
};