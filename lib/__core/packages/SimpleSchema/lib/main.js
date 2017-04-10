import { SimpleSchema, ValidationContext } from './SimpleSchema';
import './clean.js';

global.SimpleSchema = function () {
  const schema = new SimpleSchema(...arguments);

  try {
    schema.messageBox.messageList.en = ErrorMsgs.MessageBox;
  } catch (e) {
    console.log(e);
  }

  schema.verify = function (data, options = {}) {
    try {
      schema.validate(data, options);
    } catch (e) {
      const message = e.message
        .replace('is invalid', 'inválido')
        .replace(/(emails.0.)?address/, 'E-Mail')
        .replace(/profile\.(.*)/, '$1');

      throw new Meteor.Error('400', message);
    }
  };

  return schema;
};

export default global.SimpleSchema;
export { ValidationContext };
