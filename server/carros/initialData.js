const API_URL = 'http://fipeapi.appspot.com/api/1/carros/veiculos/';
const MARCARS_URL = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
const initialCarros = require('./carrosContrato.json');

function getVeiculosURL(n = 1) {
  return `${API_URL + n}.json`;
}

// ex = {"name": "AUDI", "fipe_name": "Audi", "order": 2, "key": "audi-6", "id": 6}

Meteor.methods({
  getVeiculos() {
    HTTP.get(MARCARS_URL, (err, res) => {
      if (res && res.content) {
        try {
          const marcas = JSON.parse(res.content);
          marcas.map((m, n) => {
            MarcasCarros.upsert({ fipe_name: m.fipe_name }, m);
            HTTP.get(getVeiculosURL(m.id), (err, res) => {
              try {
                const carros = JSON.parse(res.content);
                carros.map((carro) => {
                  const customCarro = {
                    ...carro,
                    classe: _.shuffle(['A', 'C', 'D', 'E', 'F', 'J', 'K', 'L', 'M', 'N', 'O'])[0],
                    imgPath: faker.image.transport(),
                  };
                  Carros.upsert({ id: carro.id }, customCarro);
                });
              } catch (e) {
                console.log(e);
              }
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  },
  mockCarrosContrato() {
    try {
      initialCarros.map((carro) => {
        CarrosContrato.insert(carro);
      });
    } catch (e) {
      console.log(e);
    }
  },
});

if (!Carros.findOne()) {
  Meteor.call('getVeiculos');
}

if (!CarrosContrato.findOne()) {
  Meteor.call('mockCarrosContrato');
}
