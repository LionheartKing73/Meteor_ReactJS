// block facebook createUser
Accounts.validateNewUser((user) => {
  if (!user.services || !user.services.password) {
    throw new Meteor.Error('401', 'Você ainda não tem cadastro? Entre em contato com o administrador.');
  }

  return true;
});
