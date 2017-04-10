function LoginNavigation() {
  this.makeLogin = function() {
    
    //Browser properties
    browser.windowHandleMaximize();
    
    //Go to main page
    browser.url(navigation.mainPageUrl);
    browser.pause(3*navigation.seconds);
    
    //Check if the user is not already logged
    let dashboardActivityLayout = '//*[@id="div-main"]/div/div[1]/div[1]/div[1]/h1';
    if (browser.isExisting(dashboardActivityLayout) == false) {
      
      //Click on the facebook login button
      let facebookLoginButton = '//*[@id="root"]/div/div/div[2]/div/a';
      browser.waitForExist(facebookLoginButton, 9*navigation.seconds);
      browser.click(facebookLoginButton);
      
      //Waiting for pop-up is open.
      for (let counterToOpenFacebookPopUp = 0; counterToOpenFacebookPopUp != 10; counterToOpenFacebookPopUp++) {
        if (browser.windowHandles().value.length == 2) {
          break;
        } else {
          browser.pause(1*navigation.seconds);
        }
      }
      
      //Handle for the windows to check for the facebook pop-up
      let windowHandles = browser.windowHandles().value;
      for (let index = 0; index < windowHandles.length; index++) {
        
        //Set the new window pop to active
        let windowHandle = windowHandles[index];
        browser.window(windowHandle);
        
        //Check for facebook pop-up login
        let facebookLoginPopup = '//*[@id="facebook"]/body';
        if (browser.element(facebookLoginPopup).type != 'NoSuchElement') {
          
          //Set the username
          let facebookLoginInput = '//*[@id="email"]';
          browser.waitForExist(facebookLoginInput, 3*navigation.seconds);
          browser.setValue(facebookLoginInput, navigation.loginName);
          
          //Set the password
          let facebookPasswordInput = '//*[@id="pass"]';
          browser.waitForExist(facebookPasswordInput, 3*navigation.seconds);
          browser.setValue(facebookPasswordInput, navigation.loginPass);
          
          //Click on the button
          let facebookLoginButton = '//*[@id="u_0_2"]';
          browser.waitForExist(facebookLoginButton, 3*navigation.seconds);
          browser.click(facebookLoginButton);
        }
      }
      
      //Set back to main window and waiting for dashboard page
      browser.window(browser.windowHandles().value[0]);
      browser.waitForExist(dashboardActivityLayout, 9*navigation.seconds);
    }
    
    //Expect in the dashboard page
    browser.waitForExist(dashboardActivityLayout, 9*navigation.seconds);
    expect(browser.element(dashboardActivityLayout).getText()).toEqual('Atividades do dia');
  }
}
navigation.login = new LoginNavigation();