const argsCarroFacil = [];

argsCarroFacil.push({
  name: 'generic',
  questionId: 'generic',
  path: '__',
  messages: [
    "Porto Seguro Carro Fácil é um carro por assinatura.",
    "Carro novo todo ano",
    "Carro particular desvaloriza e dá muito mais trabalho para vender.",
    " IPVA, documentação, seguro e custos de manutenção, a Porto cuida para você!",
    "Carro Reserva por tempo indeterminado",
    "Fazemos a manutenção preventiva para você. Buscamos e levamos o carro na sua casa.",
    "Beneficios e Assistência 24h Porto Seguro para o veículo",
    "Serviços para a casa (chaveiro, encanador, eletricista)",
    "Descontos em estacionamentos conveniados",
    "Motorista da vez",
    "Helpdesk para o computador",
    "Consulta veterinária para o PET (Cachorro e Gato)",
  ],
});

argsCarroFacil.push({
  name: 'possuiVeiculo_nao',
  path: 'possuiVeiculo:nao',
  questionId: 'possuiVeiculo',
  responseValue: 'nao',
  messages: [],
});

argsCarroFacil.push({
  name: 'sim',
  path: 'possuiVeiculo:sim',
  questionId: 'possuiVeiculo',
  responseValue: 'sim',
  messages: [
    "Depreciação média do veículo: 20% por ano.",
    "Melhor planejamento financeiro.",
    "Não precisa retirar seus investimentos.",
  ],
});

argsCarroFacil.push({
  name: 'sim',
  path: 'possuiVeiculo:sim_usado',
  questionId: 'possuiVeiculo',
  responseValue: 'sim_usado',
  messages: [
    "Depreciação média do veículo: 20% por ano.",
    "Melhor planejamento financeiro.",
    "Não precisa retirar seus investimentos.",
  ],
});

argsCarroFacil.push({
  name: 'possuiVeiculo_simAVista',
  path: 'aVistaOuFinanciado:avista',
  questionId: 'aVistaOuFinanciado',
  responseValue: 'avista',
  messages: [
    "Investir o valor do veículo. Quanto teria de rendimento?",
    "Mantém suas reservas para emergência.",
  ],
});


argsCarroFacil.push({
  name: 'possuiVeiculo_sim_usado-avista',
  path: 'aVistaOuFinanciado:avista',
  questionId: 'aVistaOuFinanciado',
  responseValue: 'avista',
  messages: [
    "Depreciação média do veículo: 20% por ano",
    "Investir o valor do veículo. Quanto teria de rendimento?",
    "Melhor planejamento financeiro",
    "Não precisa retirar seus investimentos.",
    "Mantém suas reservas para emergência.",
  ],
});


argsCarroFacil.push({
  name: 'possuiVeiculo_sim_financiado',
  path: 'aVistaOuFinanciado:financiado',
  questionId: 'aVistaOuFinanciado',
  responseValue: 'financiado',
  messages: [
    "Juros do financiamento equivale a quase 2 carros.",
    "Você paga um valor mensal e só se preocupa em dirigir.",
    "Parcelas fixas e sem surpresas.",
  ],
});


argsCarroFacil.push({
  name: 'meioDeLocomocaoPreferido',
  path: 'meioDeLocomocaoPreferido:uberOuTaxi',
  questionId: 'meioDeLocomocaoPreferido',
  responseValue: 'uberOuTaxi',
  messages: [
    "Você já fez as contas de quanto gasta com Taxi e Uber?",
    "Você paga um valor mensal e só se preocupa em dirigir",
    "Parcelas fixas e sem surpresas.",
    "Melhor planejamento financeiro."
  ],
});


argsCarroFacil.push({
  name: 'quantoRodaPorDia',
  path: 'quantoRodaPorDia:Até 10 km',
  questionId: 'quantoRodaPorDia',
  responseValue: 'Até 10 km',
  messages: [
    "Você já fez as contas de quanto gasta com Taxi e Uber?",
    "Você paga um valor mensal e só se preocupa em dirigir.",
    "Parcelas fixas e sem surpresas",
    "Melhor planejamento financeiro"
  ],
});


argsCarroFacil.push({
  name: 'quantoRodaPorDia',
  path: 'quantoRodaPorDia:Até 20 km',
  questionId: 'quantoRodaPorDia',
  responseValue: 'Até 20 km',
  messages: [
    "Você já fez as contas de quanto gasta com Taxi e Uber?",
    "Você paga um valor mensal e só se preocupa em dirigir.",
    "Parcelas fixas e sem surpresas",
    "Melhor planejamento financeiro"
  ],
});



argsCarroFacil.push({
  name: 'quantoRodaPorDia',
  path: 'quantoRodaPorDia:Até 30 km',
  questionId: 'quantoRodaPorDia',
  responseValue: 'Até 30 km',
  messages: [
    "Você já fez as contas de quanto gasta com Taxi e Uber?",
    "Você paga um valor mensal e só se preocupa em dirigir.",
    "Parcelas fixas e sem surpresas",
    "Melhor planejamento financeiro"
  ],
});



argsCarroFacil.push({
  name: 'quantoRodaPorDia',
  path: 'quantoRodaPorDia:Acima de 30 km',
  questionId: 'quantoRodaPorDia',
  responseValue: 'Acima de 30 km',
  messages: [
    "Você já fez as contas de quanto gasta com Taxi e Uber?",
    "Você paga um valor mensal e só se preocupa em dirigir.",
    "Parcelas fixas e sem surpresas",
    "Melhor planejamento financeiro"
  ],
});


function insertInitial() {
  Argumentacoes.remove({});

  argsCarroFacil.map((argObj, argKey) => {
    argObj.messages.map((messageText, messageKey) => {
      Argumentacoes.insert({
        key: 1000 - (argKey + messageKey),
        text: messageText,
        product: 'carroFacil',
        parentName: argObj.name,
        parentPath: argObj.path,
        questionId: argObj.questionId,
        responseValue: argObj.responseValue,
      });
    })
  });
}

insertInitial();

Meteor.methods({
  'dev.resetArgumentacoes': function () {
    Argumentacoes.remove({});
    insertInitial();
  },
});
