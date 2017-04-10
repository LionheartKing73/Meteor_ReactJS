import Messages from '../../lib/collections/messages';

// const types = ['prospect', 'campaign', 'facebook', 'warning', 'alert', 'information'];
// const categorias = ['alert', 'message'];

const types = ['prospect', 'campaign', 'facebook', 'information'];
const categorias = ['message'];

const usersCreate = ['ADM', 'SYS'];

const _createFakeMessage = () => ({
  category: faker.random.arrayElement(categorias),
  type: faker.random.arrayElement(types),
  to: userId,
  title: faker.lorem.paragraph().substr(0, 19),
  body: faker.lorem.text(),
  additionalInfo: faker.name.firstName(),
  action: 'Informar',
  createdBy: faker.random.arrayElement(usersCreate),
  createdAt: faker.date.recent(),
  readAt: null,
});

let intervaloParty;

Meteor.methods({
  'messages.createFake': function () {
    Messages.remove({});

    const messages = [
      {
        category: 'message',
        type: 'seeprofile',
        to: null,
        systemName: 'alarme-mais',
        title: '',
        body: '{name} curtiu sua campanha do Conecta no Facebook.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'seeprofile',
        to: null,
        systemName: 'seguro-auto',
        title: '',
        body: 'Hoje é aniversário de {name}.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'clientcall',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'O Cliente {name} tem uma propensão alta no produto Auto.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'seemore',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'A campanha do Conecta Day encerra no dia 21/05.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'putonagenda',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'O contato do usuário {name} será incluído na lista de atividades.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'putonagenda',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'O contato do usuário {name} será incluído na lista de atividades.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'putonagenda',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'O contato do usuário {name} será incluído na lista de atividades.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
      {
        category: 'message',
        type: 'putonagenda',
        to: null,
        systemName: 'carro-facil',
        title: '',
        body: 'O contato do usuário {name} será incluído na lista de atividades.',
        additionalInfo: '',
        action: 'Informar',
        createdBy: faker.random.arrayElement(usersCreate),
        createdAt: faker.date.recent(),
        readAt: null,
        hidden: false
      },
    ];

    if (!Messages.findOne()) {
      // Array.apply(null, Array(30)).map(() => {
      //   const message = _createFakeMessage();
      //   console.log(message);
      //   Messages.insert(message);
      // });
      messages.map((m) => {

        Customers.aggregate([{ $sample: { size: 1 } }]).forEach((custDoc) => {
          m.to   = custDoc._id;
          m.body = m.body.replace('{name}', custDoc.name);
          Messages.insert(m);
        });

      });
    }
  },

  'messages.goParty': function () {
    if (intervaloParty) clearInterval(intervaloParty);
    intervaloParty = Meteor.setInterval(() => {
      const message = _createFakeMessage();
      console.log(message);
      Messages.insert(message);
    }, 1000);
  },

  'messages.clearAll': function () {
    Messages.remove({});
  },

  'messages.stopParty': function () {
    if (intervaloParty) clearInterval(intervaloParty);
  },
});

if (!Messages.findOne()) {
  Meteor.call('messages.createFake');
}
