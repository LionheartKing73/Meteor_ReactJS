// ========================================================================================= //
// Use native HTTP package from meteor
// ========================================================================================= //
import { HTTP } from 'meteor/http';

// ========================================================================================= //
// BrokersManager API configurations
// ========================================================================================= //

const BROKERS_MANAGER_API_URL = `${process.env.BROKERS_MANAGER_API_URL || `http://dev-tomcat.sciensa.click:8081`}`;
const BROJERS_MANAGER_API_SRV = '/brokersmanager/service/brokerscontacts/';
const BROKERS_MANAGER_API_ENDPOINT = BROKERS_MANAGER_API_URL + BROJERS_MANAGER_API_SRV;
const BROKERS_MANAGER_API_TIMEOUT = 1800;
const BROKERS_MANAGER_FULL_DEBUG = false;

// ========================================================================================= //
// Multipart and boundary generate and handles
// ========================================================================================= //
/**
 * @return {string}
 */
function getUniqueBoundaryID() {
  return (`----${(new Date()).getTime()}`);
}
/**
 * @return {string}
 */
function MULTIPART_FORM_INS(boundary) {
  return (`--${boundary}`);
}
/**
 * @return {string}
 */
function MULTIPART_FORM_SET(fieldName) {
  return (`Content-Disposition: form-data; name="${fieldName}"`);
}
/**
 * @return {string}
 */
function MULTIPART_FORM_UPL_NAME(fieldName, fileName) {
  return (`Content-Disposition: form-data; name="${fieldName}"; filename="${fileName}"`);
}
/**
 * @return {string}
 */
function MULTIPART_FORM_UPL_TYPE(contentType) {
  return (`Content-Type: ${contentType}`);
}
/**
 * @return {string}
 */
function MULTIPART_FORM_END(boundary) {
  return (`--${boundary}--`);
}
/**
 * @return {string}
 */
function catchHttpError(error) {

  // Return error
  if (error.response) {

    return ({
      status: false,
      statusCode: error.response.statusCode,
      errorMessage: GLOBAL.httpErrorMsgs[error.code]
    });
  } else {

    return ({
      status: false,
      statusCode: error.code,
      errorMessage: GLOBAL.customHttpErrorMsgs[error.code]
    });
  }
}

// ========================================================================================= //
// Methods for Connector
// ========================================================================================= //
Meteor.methods({

  // ========================================================================================= //
  // Name: brokerscontacts.connector._ENGINE
  // ========================================================================================= //
  // Desc: Engine of the request and response from external BrokersManager API.
  // Data: Object
  // Object: {
  //   status: (true / false),
  //   statusCode: (result.statusCode / e.response.statusCode),
  //   data: (result.data / e.response.data)
  // }
  // ========================================================================================= //
  'brokerscontacts.connector._ENGINE': function (method, service, boundary, data) {
    console.log(arguments);

    // Try to make the request payload
    try {
      // Make request payload
      console.log(this.userId + ' [INF] [CON] Making request payload ...');
      const payload = {
        headers: {
          "Connection": 'keep-alive',
          'Content-Type': `multipart/form-data;charset=iso-8859-1; boundary=${boundary}`,
          "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Enconding': 'gzip, deflate',
          'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4',
        },
        timeout: BROKERS_MANAGER_API_TIMEOUT * 1000,
        content: data.join('\r\n'),
      };
      console.log(this.userId + ' [INF] [CON] Request struct and information ready: ');

      // Show information in the log
      console.log(this.userId + `[INF] [CON] Method   : ${method}`);
      console.log(this.userId + `[INF] [CON] Endpoint : ${BROKERS_MANAGER_API_ENDPOINT}${service}`);
      console.log(this.userId + `[INF] [CON] Timeout  : ${BROKERS_MANAGER_API_TIMEOUT}`);
      if (BROKERS_MANAGER_FULL_DEBUG == true) {
        console.log(this.userId + `[DBG] [CON] Payload  : \n${JSON.stringify(payload, null, 4)}`);
      }

      // ----------------------------------------------------------------------------------------- //
      // Call synchronous request
      // ----------------------------------------------------------------------------------------- //
      console.log(this.userId + ' [INF] [CON] Call Synchronous request call...');
      const result = HTTP.call(method, BROKERS_MANAGER_API_ENDPOINT + service, payload);

      // Sucessfulll in request
      if (BROKERS_MANAGER_FULL_DEBUG == true) {
        console.log(this.userId + `[DBG] [CON] Synchronous request response: \n${JSON.stringify(result, null, 4)})`);
      }
      console.log(this.userId + ' [INF] [CON] Synchronous request successfull!');

      // Return successfull
      return ({
        status: true,
        statusCode: result.statusCode,
        data: result.data,
      });
    } catch (e) {
      // Error in main method or in request the service (http.status_code != 200)
      console.log(this.userId + ' [ERR] [CON] Error in request of the service!');
      console.log(this.userId + ` [DBG] [CON] Error describle: \n${JSON.stringify(e, null, 4)})`);

      // Return error message
      return catchHttpError(e);
    }
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/brokers
  // ----------------------------------------------------------------------------------------- //
  // Desc: Recupera informacoes de todos os brokers.
  // Data: Array of Objects
  // Object: {
  //   "brokerCode": "1366189566747952",
  //   "brokerName": "Mohamad Jameh"
  // }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.brokers': function () {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'brokers', boundary, data);
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/createbroker(@param: brokerCode, @param: brokerName)
  // ----------------------------------------------------------------------------------------- //
  // Desc: Cria o broker no banco de dados.
  // Data: Object
  // Object: { null }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.createbroker': function (brokerCode, brokerName) {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // Broker id
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('brokerId'));
    data.push('');
    data.push(brokerCode);

    // Broker name
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('brokerName'));
    data.push('');
    data.push(brokerName);

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'createbroker', boundary, data);
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/contacts(@param: brokerCode)
  // ----------------------------------------------------------------------------------------- //
  // Desc: Recupera os contatos da tabela consolidada.
  // Data: Array of Objects
  // Object: {
  //   "brokerCode":"1366189566747952",
  //   "homeEmail":"14 de janeiro de 2016",
  //   "name":"A.I.",
  //   "originId":"face",
  //   "presentDate":"2017-01-27",
  //   "surname":"Veiculos "
  // }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.contacts': function (broker) {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // Broker id
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('broker'));
    data.push('');
    data.push(broker);

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'contacts', boundary, data);
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/savecontacts(@param: brokerCode)
  // ----------------------------------------------------------------------------------------- //
  // Desc: Transfere da tabela temporaria para a tabela consolidada efetuando merge.
  // Data: Object
  // Object: { null }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.savecontacts': function (broker) {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // Broker id
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('broker'));
    data.push('');
    data.push(broker);

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'savecontacts', boundary, data);
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/loadcontacts(@param: brokerCode)
  // ----------------------------------------------------------------------------------------- //
  // Desc: Recupera os contatos do upload da temporaria.
  // Data: Array of Objects
  // Object: {
  //   "brokerCode":"1366189566747952",
  //   "homeEmail":"14 de janeiro de 2016",
  //   "name":"A.I.",
  //   "originId":"face",
  //   "presentDate":"2017-01-27",
  //   "surname":"Veiculos "
  // }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.loadcontacts': function (broker) {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // Broker id
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('broker'));
    data.push('');
    data.push(broker);

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'loadcontacts', boundary, data);
  },

  // ----------------------------------------------------------------------------------------- //
  // Name: brokerscontacts/saveloadcontacts(@param: brokerCode, @param: social, @param: uploadFile)
  // ----------------------------------------------------------------------------------------- //
  // Desc: Upload dos arquivos para a tabela temporaria.
  // Data: Object
  // Object: { null }
  // ----------------------------------------------------------------------------------------- //
  'brokerscontacts.connector.saveloadcontacts': function (broker, social, uploadFileName, uploadFileType, uploadFileValue) {
    // Init payload data struct
    const data = [];

    // Get unique boundary id
    const boundary = getUniqueBoundaryID();

    // File to upload
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_UPL_NAME('part', uploadFileName));
    data.push(MULTIPART_FORM_UPL_TYPE(uploadFileType));
    data.push('');
    data.push(uploadFileValue);

    // Social database name
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('social'));
    data.push('');
    data.push(social);

    // Broker id
    data.push(MULTIPART_FORM_INS(boundary));
    data.push(MULTIPART_FORM_SET('broker'));
    data.push('');
    data.push(broker);

    // End boundary
    data.push(MULTIPART_FORM_END(boundary));

    // Call engine request
    return Meteor.call('brokerscontacts.connector._ENGINE', 'POST', 'saveloadcontacts', boundary, data);
  },
});
