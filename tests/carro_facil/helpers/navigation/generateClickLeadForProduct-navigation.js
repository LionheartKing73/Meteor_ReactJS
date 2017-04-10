function ClickLeadNavigation() {
  this.generateClickLeadForProduct = function () {
    
    //Setup
    const seconds = 500 * 2;
    
    //Waiting for click lead button show
    let clickLeadButton = '//*[@id="div-main"]/div/div[1]/div[1]/div[1]/div/button';
    browser.waitForExist(clickLeadButton, 3 * seconds);
    
    //Click lead button target
    let clickLeadTarget;
    
    //Search for a exists product in click-lead border
    let productImage = '//*[@id="div-acoes"]/table/tbody/tr/td[1]/img';
    if (browser.element(productImage).type != 'NoSuchElement') {
      
      //Check for the first element on the table
      let productImageSrcAttribute = browser.element(productImage).getAttribute('src');
      let productImageIconName = productImageSrcAttribute.substring(productImageSrcAttribute.lastIndexOf('/') + 1);
      if (productImageIconName == 'carro_facil_b.png') {
        
        //Element founded
        clickLeadTarget = productImage;
      }
      else {
        
        //Check for 02 to 11 elements...
        for (let counterForProductImage = 2; counterForProductImage <= 11; counterForProductImage++) {
          
          //Check if exist the button to expand product table
          let expandProductTable = '//*[@id="icon-expand"]/i';
          if (browser.element(expandProductTable).type != 'NoSuchElement' &&
            browser.element(expandProductTable).isVisible() == true) {
            browser.click(expandProductTable);
          }
          
          //Check for the next index point on the table
          productImage = '//*[@id="div-acoes"]/table/tbody/tr[' + counterForProductImage.toString() + ']/td[1]/img';
          if (browser.element(productImage).type != 'NoSuchElement') {
            
            //Check for the index point element on the table
            let productImageSrcAttribute = browser.element(productImage).getAttribute('src');
            let productImageIconName = productImageSrcAttribute.substring(productImageSrcAttribute.lastIndexOf('/') + 1);
            if (productImageIconName == 'carro_facil_b.png') {
              
              //Element founded
              clickLeadTarget = productImage;
              break;
            }
          }
        }
      }
    }
    
    //If not exist a Click-Lead product, we need to generate with the button
    if (clickLeadTarget == undefined) {
      
      //Handle for generate a carro-facil product
      let counterForProductImage = 1;
      let productImageFound = false;
      while (productImageFound != true) {
        
        //Click in the click-lead button
        browser.click(clickLeadButton);
        
        //Check if exist the button to expand product table
        let expandProductTable = '//*[@id="icon-expand"]/i';
        if (browser.element(expandProductTable).type != 'NoSuchElement' &&
          browser.element(expandProductTable).isVisible() == true) {
          browser.click(expandProductTable);
        }
        
        //Wait for product image appers
        if (counterForProductImage != 1) {
          productImage = '//*[@id="div-acoes"]/table/tbody/tr[' + counterForProductImage.toString() + ']/td[1]/img';
        }
        browser.waitForExist(productImage, 3 * seconds);
        
        //Get the product image icon name
        let productImageSrcAttribute = browser.element(productImage).getAttribute('src');
        let productImageIconName = productImageSrcAttribute.substring(productImageSrcAttribute.lastIndexOf('/') + 1);
        
        //End for the click or continue on the actions for button click-lead
        if (productImageIconName == 'carro_facil_b.png') {
          
          //Element founded
          productImageFound = true;
          clickLeadTarget = productImage;
          console.log("Element founded!!!");
        }
        else {
          counterForProductImage = parseInt(counterForProductImage) + 1;
        }
      }
    }
    
    //Click on the click-lead target
    browser.click(clickLeadTarget);
    
    //Waiting for full loading in quotation page
    let initQuotationButton = '//*[@id="ini"]';
    for (let counterToRenderQuotationPage = 0; counterToRenderQuotationPage != 10; counterToRenderQuotationPage++) {
      if (browser.element(initQuotationButton).getAttribute('ini') == 'ini') {
        break;
      }
      else {
        browser.pause(1 * seconds);
      }
    }
  }
}
navigation.clickLead = new ClickLeadNavigation();