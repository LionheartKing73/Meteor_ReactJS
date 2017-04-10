fixtures.selectors = {
  summaryProfile: {
    'Loading': {
      selector: '//*[@id="div-main"]/div/div[1]/div[2]',
    },
    'Iniciar Cotação': {
      selector: '//*[@id="ini"]',
    },
  },
  nimbleQuestionsCard: {
    'Você tem veículo ?': {
      selector: '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p',
      options: {
        'Sim, 0 KM': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
        'Sim, usado': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
        'Não': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
      },
    },
    'Qual é o seu veículo ?': {
      selector: '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p',
      options: {
        'Sim, 0 KM': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
        'Sim, usado': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
        'Não': '//*[@id="possuiVeiculo"]/div/div/div/div/div[2]/div[1]/label/input',
      },
    },
    'Você pagou este veículo à vista ou financiado ?': {
      selector: '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p',
      options: {
        'Modelo': '//*[@id="tile2"]/div/div/div[2]/div/label[1]/div/input',
        'Ano': '//*[@id="tile2"]/div/div/div[2]/div/label[2]/input',
      },
    },
    'Em média, com quanto tempo você troca de veículo ?': {
      selector: '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p',
      options: {
        '1 Ano': '//*[@id="tempoMedioEntreTrocas"]/div/div/div/div/div[2]/div[1]/label/input',
        '2 Anos': '//*[@id="tempoMedioEntreTrocas"]/div/div/div/div/div[2]/div[2]/label/input',
        '3 Anos': '//*[@id="tempoMedioEntreTrocas"]/div/div/div/div/div[2]/div[3]/label/input',
        'Acima de 3 anos': '//*[@id="tempoMedioEntreTrocas"]/div/div/div/div/div[2]/div[4]/label/input',
      },
    },
    'Qual o seu meio de locomoção preferido': {
      selector: '//*[@id="meioDeLocomocaoPreferido"]/div/div/div/div/div[1]/p',
      options : {
        'Transporte Público': '//*[@id="meioDeLocomocaoPreferido"]/div/div/div/div/div[2]/div[1]/label/input',
        'Uber ou Táxi': '//*[@id="meioDeLocomocaoPreferido"]/div/div/div/div/div[2]/div[2]/label/input',
      },
    },
    'Quanto você roda por dia ?': {
      selector: '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[1]/p',
      options: {
        'Até 10 km': '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[2]/div[1]/label/input',
        'Até 20 km': '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[2]/div[2]/label/input',
        'Até 30 km': '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[2]/div[3]/label/input',
        'Acima de 30 km': '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[2]/div[4]/label/input',
        'Não sei informar': '//*[@id="quantoRodaPorDia"]/div/div/div/div/div[2]/div[5]/label/input',
      },
    },
  },
};