// Exemplo de estrutura de dados para um form/step
export default {
  // ID local e do server (Collection Forms)
  serverId: 'gtHbIoFo9DQvtzYDM',
  reduxId: 'fXo9DQvhiKtzYDMaG_1484219664745', // Meteor.userId() + Date.now()

  // dados do formulario deste step
  question: 'Foo Bar?',
  componentName: 'BazComponent',
  stepIconComponent: 'BazIcon',

  // resultado deste step
  result: {
    a: 1,
    b: 2,
    c: 3,
  },

  // argumentos
  handles: [
    {
      text: 'Você pode ter um carro novo todo ano, sem a preocupação da depreciação e da venda do veículo antigo!',
      brokerAccepted: true,
      rating: 4, // stars
    },
  ],

  // Dados para pagination
  nextServerId: 'gtHbIoFo9DQvtzYDM', // definido, dependendo da resposta deste form
  nextReduxId: 'fXo9DQvhiKtzYDMaG_1484219664745',

  prevServerId: 'gtHbIoFo9DQvtzYDM',
  prevReduxId: 'fXo9DQvhiKtzYDMaG_1484219664745',
};
