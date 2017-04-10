const _Messages = new Mongo.Collection('messages');
export default _Messages;
global.Messages = _Messages;
