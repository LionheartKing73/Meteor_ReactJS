// ========================================================================================= //
// Use native FS package
// ========================================================================================= //
import fs from 'fs';

// ========================================================================================= //
// BrokersManager Adapter configurations
// ========================================================================================= //
const BROKERS_MANAGER_ADP_FULL_DEBUG = false;
const BROKERS_MANAGER_ADP_DELAY_UPLOAD = 30;

var userId;

// --------------------------------------------------------------------------------- //
// Helper on debug information
// --------------------------------------------------------------------------------- //
/**
 * @return {string}
 */
function ENDLINESTRING() {
  return ('-----------------------------------------------------------------------------------------------------------');
}

// --------------------------------------------------------------------------------- //
// Helper on synch methods
// --------------------------------------------------------------------------------- //
function sleep(ms) {
  let start = new Date().getTime(),
    expire = start + ms;
  while (new Date().getTime() < expire) { }
}

// --------------------------------------------------------------------------------- //
// Register a brokers in BrokerManagerAPI
// --------------------------------------------------------------------------------- //
function _registerBrokerInBrokerManagerAPI(broker, brokerName) {
  // Try to register a broker in external BrokerManager API
  console.log(userId + ENDLINESTRING());
  console.log(userId + ' [INF] [ADP] Register a broker in external BrokerManager API...');
  console.log(userId + ENDLINESTRING());
  const response = Meteor.call('brokerscontacts.connector.createbroker', broker, brokerName);
  if (response.status == false) {
    // Error in request
    console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
    console.log(userId + ' [ERR] [ADP] Error in call <brokerscontacts.connector.contacts> ');
    return response;
  }


  // Broker id created
  console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
  console.log(userId + ' [INF] [ADP] Brokers registred, alright!');
  return response;
}

// --------------------------------------------------------------------------------- //
// Upload social file for broker in external BrokerManager API
// --------------------------------------------------------------------------------- //
function _uploadSocialFileForBrokerInBrokerManagerAPI(broker, social, uploadFileId) {
  // File struct
  let uploadFileName;
  let uploadFileType;
  let uploadFileValue;

  // Get social file for broker in server side storage
  console.log(userId + ENDLINESTRING());
  console.log(userId + ' [INF] [ADP] Get social file for broker in server side storage...');
  console.log(userId + ENDLINESTRING());
  try {
    // Find the file upload in server side
    console.log(userId + `[INF] [ADP] Find the file upload id <${uploadFileId}> in server side storage...`);
    const uploadFile = Uploads.findOne({ _id: uploadFileId });

    // Get information and file value
    console.log(userId + ' [INF] [ADP] Get file informations...');

    // Get file name
    uploadFileName = uploadFile.getFileRecord().name();
    console.log(userId + ' [INF] [ADP] File name : ', uploadFileName);

    // Get file type
    uploadFileType = uploadFile.getFileRecord().type();
    console.log(userId + ' [INF] [ADP] File type : ', uploadFileType);
    console.log(userId + ' [INF] [ADP] Fullpath with name : ', uploadFileWithFullPath);

    // Get fullpath with name
    let uploadFileWithFullPath = `${UPLOADS_DIRECTORY}/` + `uploads-${uploadFileId}-${uploadFileName}`;
    console.log(userId + ' [INF] [ADP] Fullpath with name : ', uploadFileWithFullPath);

    // Check if the file upload is complete to push (input delay)
    console.log(userId + ' [INF] [ADP] Check if the file upload is complete to push...');
    for (let timerInSeconds = 0; timerInSeconds < BROKERS_MANAGER_ADP_DELAY_UPLOAD; timerInSeconds++) {
      try {
        uploadFileValue = fs.readFileSync(uploadFileWithFullPath, 'utf8');
        console.log(userId + ' [INF] [ADP] File upload is completed');
      } catch (e) {
        console.log(userId + ' [INF] [ADP] File upload is not ready, waiting...');
        sleep(3000);
      }
    }
  } catch (e) {
    // Error in handle for upload file
    console.log(userId + ' [ERR] [ADP] Error in handle for upload file');
    console.log(userId + `[DBG] [ADP] Error describle: ${e}`);
    return {
      status: false,
      statusCode: 'EUPLOAD',
      errorMessage: 'Error in handle for upload file'
    };
  }
  // Show information in the debug

  if (BROKERS_MANAGER_ADP_FULL_DEBUG == true) {
    console.log(userId + ' [DBG] [ADP] File value: ', uploadFileValue);
  }
  console.log(userId + ' [INF] [ADP] Social file for broker sucessfull recover... alright!');

  // Upload social file for broker in external BrokerManager API
  console.log(userId + ENDLINESTRING());
  console.log(userId + ' [INF] [ADP] Upload social file for broker in external BrokerManager API...');
  console.log(userId + ENDLINESTRING());
  const response = Meteor.call('brokerscontacts.connector.saveloadcontacts', broker, social, uploadFileName, uploadFileType, uploadFileValue);
  if (response.status == false) {
    // Error in request
    console.log(userId + ' [ERR] [ADP] Error in call <brokerscontacts.connector.saveloadcontacts> ');
    console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
    return response;
  }

  // Upload social file ok
  console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
  console.log(userId + ' [INF] [ADP] Upload file sucessfull... alright!');
  return response;
}

// --------------------------------------------------------------------------------- //
// Request to start merge social data service in BrokerManagerAPI
// --------------------------------------------------------------------------------- //
function _requestForMergeBrokerSocialDataInBrokerManagerAPI(broker) {
  // Request to start merge social data service in BrokerManagerAPI
  console.log(userId + ENDLINESTRING());
  console.log(userId + ' [INF] [ADP] Request to start merge social data service in BrokerManagerAPI...');
  console.log(userId + ENDLINESTRING());
  const response = Meteor.call('brokerscontacts.connector.savecontacts', broker);
  if (response.status == false) {
    // Error in request
    console.log(userId + ' [ERR] [ADP] Error in call <brokerscontacts.connector.savecontacts> ');
    console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
    return response;
  }


  // Merge social data ok
  console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
  console.log(userId + ' [INF] [ADP] Merge social data finished... alright!');
  return response;
}

// --------------------------------------------------------------------------------- //
// Import Merge broker social data from BrokerManagerAPI
// --------------------------------------------------------------------------------- //
function _importMergeBrokerSocialDataFromBrokerManagerAPI(broker) {
  // Request merge broker social data from BrokerManagerAPI
  console.log(userId + ENDLINESTRING());
  console.log(userId + ' Request merge broker social data from BrokerManagerAPI ...');
  console.log(userId + ENDLINESTRING());
  const response = Meteor.call('brokerscontacts.connector.contacts', broker);
  if (response.status == false) {
    // Error in request
    console.log(userId + ' [ERR] [ADP] Error in call <brokerscontacts.connector.contacts> ');
    console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
    console.log(userId + ENDLINESTRING());
    return response;
  }


  // Merge broker social data loaded
  const totalRegisters = response.data.length;
  if (BROKERS_MANAGER_ADP_FULL_DEBUG == true) {
    console.log(userId + `[DBG] [ADP] response: \n${JSON.stringify(response, null, 4)}`);
  }
  console.log(userId + `[INF] [ADP] Merge broker social data loaded with total registers: ${totalRegisters}`);

  // Insert in the collection
  let totalRegistersInserted = 0;
  console.log(userId + ' [INF] [ADP] Insert/Update Merge broker social data in the collection...');
  response.data.map((data) => {
    Customers.upsert(data, data, (err) => {
      if (err) {
        // Error in insert
        console.log(userId + ' [ERR] [ADP] Error in insert <collection/customers> ');
        console.log(userId + `[DBG] [ADP] response: ${err}`, data);
      } else {
        // Inserted in collection
        if (BROKERS_MANAGER_ADP_FULL_DEBUG == true) {
          console.log(userId + `[DBG] [ADP] inserted in <collection/customers>: ${data}`);
        }
        totalRegistersInserted++;
      }
    });
  });

  console.log(userId + `[INF] [ADP] Total registers inserted/update in the collection: ${totalRegistersInserted}/${totalRegisters}`);

  // Rename brokerCode to brokerId
  console.log(userId + ' [INF] [ADP] Init the renaming fields in collection ...');
  try {
    // Renaming...
    console.log(userId + ' [INF] [ADP] Renaming...');
    Customers.update({}, { $rename: { brokerCode: 'brokerId' } }, false, true);
  } catch (e) {
    // Error in handle database/collection
    console.log(userId + ' [ERR] [ADP] Error in handle for renaming database/collection');
    console.log(userId + `[DBG] [ADP] Error describle: ${e}`);
    console.log(userId + ENDLINESTRING());

    return {
      status: false,
      statusCode: 'ERENAMEDB',
      errorMessage: 'Error in handle for renaming database/collection.'
    };
  }
  console.log(userId + ' [INF] [ADP] Renaming fields in collection finished');

  // Imported social data ok
  console.log(userId + ' [INF] [ADP] Merge social data finished... alright!');
  console.log(userId + ENDLINESTRING());
  return response;
}

// ========================================================================================= //
// Methods for Adapter
// ========================================================================================= //
Meteor.methods({

  // ----------------------------------------------------------------------------------------- //
  // Register a broker, upload and merge social files and import result in database
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.adapter.importCustomers': function (broker, brokerName, social, uploadFileId) {
    // Return status init
    var returnStatus;

    userId = this.userId;

    // Register a brokers in BrokerManagerAPI
    returnStatus = _registerBrokerInBrokerManagerAPI(broker, brokerName);
    if (returnStatus.status == false) {
      returnStatus.errorFunction = '_registerBrokerInBrokerManagerAPI';
    } else {
      // Upload social file for broker in external BrokerManager API
      returnStatus = _uploadSocialFileForBrokerInBrokerManagerAPI(broker, social, uploadFileId);
      if (returnStatus.status == false) {
        returnStatus.errorFunction = '_uploadSocialFileForBrokerInBrokerManagerAPI';
      } else {
        // Request to start merge social data service in BrokerManagerAPI
        returnStatus = _requestForMergeBrokerSocialDataInBrokerManagerAPI(broker);
        if (returnStatus.status == false) {
          returnStatus.errorFunction = '_requestForMergeBrokerSocialDataInBrokerManagerAPI';
        } else {
          // Import Merge broker social data from BrokerManagerAPI
          returnStatus = _importMergeBrokerSocialDataFromBrokerManagerAPI(broker);
          if (returnStatus.status == false) {
            returnStatus.errorFunction = '_importMergeBrokerSocialDataFromBrokerManagerAPI';
          }
        }
      }
    }

    // Return status
    return returnStatus;
  },
});
