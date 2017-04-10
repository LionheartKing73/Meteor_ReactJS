// ========================================================================================= //
// BrokersManager API configurations
// ========================================================================================= //

const BROKERS_MANAGER_API_URL = `${process.env.BROKERS_MANAGER_API_URL || `http://dev-tomcat.sciensa.click:8081`}`;
const BROJERS_MANAGER_API_SRV = '/brokersmanager/service/brokerscontacts/';
const BROKERS_MANAGER_API_ENDPOINT = BROKERS_MANAGER_API_URL + BROJERS_MANAGER_API_SRV;
const BROKERS_MANAGER_API_TIMEOUT = 1800;

Meteor.methods({
  
  /**
   * Create broker - {API}/createbroker
   * @param endPoint (string) API BrokersManager endpoint
   * @param params (object) POST params object
   * @response 200: true / 500: throw error
   */
  'uploads.callBrokersManager': function (endPoint = 'createbroker', params = {}) {
    const userId = this.userId;
    if (!userId)
      throw new Meteor.Error('400', ErrorMsgs.userNotFound);
    
    const user = Meteor.users.findOne(userId);
    const facebookProfile = (((user || {}).services || {}).facebook || {});
    const brokerId = facebookProfile.id;
    const brokerName = facebookProfile.name || user.profile.name || '';
    const url = BROKERS_MANAGER_API_ENDPOINT + endPoint;
    
    let response = '';
    
    //Build Params
    params = {
      ...params,
      brokerId,
      broker: brokerId, //FIXME: Padronizar parametros (API Brokersmanager)
      brokerName
    };
    let timeout = BROKERS_MANAGER_API_TIMEOUT * 1000,
        start = new Date();
    
    if(!brokerId)
      throw new Meteor.Error('500', ErrorMsgs.userWithoutFacebook);
    
    try {
      console.log('uploads.callBrokersManager', url, 'params', params);
      response = HTTP.call( 'POST', url, { params: params, timeout: timeout } );
  
      let end = new Date();
      console.log("[Upload] [uploads.callBrokersManager." + endPoint + "]" + `[${userId}]` + (end - start) + "ms");
    }
    catch (e) {
      console.log(e);
      throw new Meteor.Error('500', ErrorMsgs.APIError);
    }
    
    return response;
  },
  
  'uploads.customerInsert': function(customers) {
    const userId = this.userId;
    if (!userId)
      throw new Meteor.Error('400', ErrorMsgs.userNotFound);
    
    const user = Meteor.users.findOne(userId);
    const brokerId = (((user || {}).services || {}).facebook || {}).id;
    
    let newCustomers = 0,
      start = new Date();
    
    customers.forEach(customer => {
      let customerQuery = {
        brokerId,
        originId: customer.originId,
        name: customer.name,
        surname: customer.surname
      };
      
      const _id = (Customers.findOne(customerQuery) || {})._id;
      if (!_id) {
        newCustomers++;
        Customers.insert(customer); //Customers.update(_id, {$set: customer});
      }
    });
    
    let end = new Date();
    console.log("[Upload] [uploads.customerInsert]" + `[${userId}]` + (end - start) + "ms");
    
    return newCustomers;
  }
  
});
