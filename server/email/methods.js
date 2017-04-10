import { Email } from 'meteor/email';

global.MailService = {};


function getHtmlFromData(data) {
  let { title, html = '', text = '', subject } = data;

  if (!html) html = `<h1>${subject || title}</h1> <br /> ${text.replace(/\n/mig, '<br />')}`;

  return html;
}


MailService.send = function (data = {}, cb = function () {}) {
  data = {
    ...data,
    to: data.to,
    from: `Aceleradora de Corretores <${Meteor.settings.FROM_MAIL_ADDRESS}>`,
    subject: data.subject || data.title || 'Aceleradora de Corretores',
  };

  data.html = getHtmlFromData(data);

  Meteor.setTimeout(() => {
    try {
      Email.send(data);
      cb(data);
    } catch (e) {
      console.log(e);
    }
  }, 100);
};
