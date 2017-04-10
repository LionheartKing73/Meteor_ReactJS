fixtures.cards = {
  'checkForThisCardWithThisNameAndSelector': function(nimbleQuestionCardSelector, nimbleQuestionCardName) {
    //Check if the questions exist in map
    if (nimbleQuestionCardSelector!= undefined) {
  
      //Check if the questions exist in page
      browser.waitForExist(nimbleQuestionCardSelector, 9 * navigation.seconds);
      let nimbleQuestionSelectorLabel = browser.element(nimbleQuestionCardSelector).getText();
  
      //Check with the label is correct;
      if (nimbleQuestionSelectorLabel == nimbleQuestionCardName) {
        return true;
      }
    }
    return false;
  },
  'checkForThisListOfQuestionCardsInNimble': function(questionListToCheck) {
    //Split array of questions to check
    var questionListToCheck = questionListToCheck.split('|');
    
    //Check in questions if is right
    var isAllQuestionCorrect = 0;
    for (let indexTablePointer = 0; indexTablePointer < questionListToCheck.length; indexTablePointer++) {
      
      //Get question to check
      let questionCardToCheck = questionListToCheck[indexTablePointer].trim();
      //console.log('questionCardToCheck => ', questionCardToCheck);
      if (questionCardToCheck != undefined) {
        
        //Get question selector
        let questionCard= fixtures.selectors.nimbleQuestionsCard[questionCardToCheck];
        if (questionCard != undefined) {
          
          //Check if question exist
          let questionCardSelector = fixtures.selectors.nimbleQuestionsCard[questionCardToCheck].selector;
          //console.log('questionCard => ', questionCardSelector);
          if (questionCardSelector != undefined) {
    
            //Check if question card selector exist
            //console.log('questionCardSelector => ', questionCardSelector);
            if (browser.isExisting(questionCardSelector) == true) {
      
              //Check if the label is the correct
              //console.log('question_table[' + browser.element(questionCardSelector).getAttribute('innerText') + '] ' + 'with split[' + questionCardToCheck + ']');
              expect(browser.element(questionCardSelector).getAttribute('innerText')).toEqual(questionCardToCheck);
              isAllQuestionCorrect++;
            }
          }
        }
      }
    }
    
    //Return with check of all questions is valid
    //console.log('Total: ' + isAllQuestionCorrect + '/' + questionListToCheck.length);
    if (isAllQuestionCorrect == questionListToCheck.length) {
      return true;
    }
    return false;
  },
};