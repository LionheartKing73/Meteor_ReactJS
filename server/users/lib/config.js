const FROM_FROM_MAIL_ADDRESS = Meteor.settings.FROM_MAIL_ADDRESS;

Accounts.emailTemplates.siteName = 'Aceleradora de Corretores';
Accounts.emailTemplates.from = `Aceleradora de Corretores <${FROM_FROM_MAIL_ADDRESS}>`;

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return '[Aceleradora de Corretores] Confirme seu Cadastro';
  },
  text(user, url) {
    // const emailAddress   = user.emails[0].address,
    const urlWithoutHash = url.replace('#/', '');
    const emailBody = `Para completar seu cadastro visite o seguinte link:\n\n${urlWithoutHash}\n\n`;

    return emailBody;
  },
};
