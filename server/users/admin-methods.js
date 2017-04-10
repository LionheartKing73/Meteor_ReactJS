const btoa = require('btoa');

Meteor.methods({
  'admin.createUser': function (data = {}) {
    // Roles.isAdmin(this); // FIXME

    Schemas.ProfileSchema.verify(data.profile);
    Schemas.Email.verify((data.emails || [])[0] || {});

    const password = Random.id();
    const email = data.emails[0].address;
    const name = (data.profile || {}).name;

    const userId = Accounts.createUser({ email, password, profile: data.profile });
    Meteor.users.update(userId, { $set: { step: 1 } });
    Roles.addUsersToRoles(userId, 'broker');

    if (!userId) throw new Meteor.Error('400', 'Erro ao cadastrar usuário.');

    const first_login_token = btoa(encodeURIComponent(JSON.stringify({
      email,
      password,
    }))).replace(/=$/, '-_-');

    const autoLoginUrl = `${process.env.ROOT_URL.replace(/\/$/, '')}/register/1?first_token=${first_login_token}`;

    const html = `
                <p>
                  Olá, ${name || ''}. <br />
                  Acesse o link abaixo para completar seu cadastro:
                </p>
                <a href="${autoLoginUrl}">${autoLoginUrl}</a>
            `;

    const emailObj = {
      to: email,
      subject: `Bem vindo, ${name}!`,
      html,
    };

    MailService.send(emailObj);
  },
});
