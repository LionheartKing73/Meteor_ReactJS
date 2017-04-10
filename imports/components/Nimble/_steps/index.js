export default [
  {
    question: 'Você tem veículo ?',
    id: 'possuiVeiculo',
    pngUrl: '/icones/ludicas/room-key_b.png',
    cycle: 'perguntasLudicas',
    cycleIconClass: 'fa fa-user',
    style: {
      width: '33%',
      active: {
        width: '41.7%',
      },
    },
    form: [
      {
        type: 'radio',
        name: 'possuiVeiculo',
        label: 'Sim, 0 Km',
        value: 'sim',
        className: 'radio-inline control-label',
      },

      {
        type: 'radio',
        name: 'possuiVeiculo',
        label: 'Sim, usado',
        value: 'sim_usado',
        className: 'radio-inline control-label',
      },

      {
        name: 'possuiVeiculo',
        value: 'nao',
        type: 'radio',
        label: 'Não',
        className: 'radio-inline control-label',
      },
    ],

    responses: [
      {
        regex: /sim/mig,
        goto: 'qualSeuVeiculo',
      },
      {
        regex: /n.o/mig,
        goto: 'meioDeLocomocaoPreferido',
      },
    ],

    questionsToShow: [
      'qualSeuVeiculo',
      'possuiVeiculo'
    ]
  },

  {
    question: 'Qual é o seu veículo ?',
    id: 'qualSeuVeiculo',
    pngUrl: '/icones/ludicas/car-frontal-view_b.png',
    cycle: 'perguntasLudicas',
    component: 'QualSeuVeiculo',
    goto: 'dadosDoCliente',
    style: {
      width: '25%',
      active: {
        width: '41.7%',
      },
    },
    responses: [
      {
        regex: /./,
        goto: 'aVistaOuFinanciado',
      },
    ],

    questionsToShow: [
      'qualSeuVeiculo',
      'possuiVeiculo',
    ]
  },

  {
    question: 'Você pagou este veículo à vista ou financiado ?',
    id: 'aVistaOuFinanciado',
    pngUrl: '/icones/ludicas/credit-card_b.png',
    cycle: 'perguntasLudicas',
    style: {
      width: '25%',
      active: {
        width: '33.3%',
      },
    },
    form: [
      {
        type: 'radio',
        name: 'aVistaOuFinanciado',
        label: 'À Vista',
        defaultValue: 'avista',
        className: 'radio-inline control-label',
      },

      {
        name: 'aVistaOuFinanciado',
        defaultValue: 'financiado',
        type: 'radio',
        label: 'Financiado',
        className: 'radio-inline control-label',
      },
    ],

    responses: [
      {
        regex: 'avista',
        goto: 'tempoMedioEntreTrocas',
      },
      {
        regex: 'financiado',
        goto: 'tempoMedioEntreTrocas',
      },
    ],

    questionsToShow: [
      'qualSeuVeiculo',
      'aVistaOuFinanciado',
      'possuiVeiculo',
      'tempoMedioEntreTrocas'
    ]
  },

  {
    question: 'Em média com quanto tempo você troca de veículo ?',
    id: 'tempoMedioEntreTrocas',
    pngUrl: '/icones/ludicas/calendar_b.png',
    cycle: 'perguntasLudicas',
    style: {
      width: '33.3%',
      active: {
        width: '41.7%',
      },
    },
    form: [
      {
        type: 'radio',
        name: 'tempoMedioEntreTrocas',
        label: '1 Ano',
        defaultValue: '1 Ano',
        className: 'radio-inline control-label',
      },

      {
        name: 'tempoMedioEntreTrocas',
        defaultValue: '2 Anos',
        type: 'radio',
        label: '2 Anos',
        className: 'radio-inline control-label',
      },

      {
        name: 'tempoMedioEntreTrocas',
        defaultValue: '3 Anos',
        type: 'radio',
        label: '3 Anos',
        className: 'radio-inline control-label',
      },

      {
        name: 'tempoMedioEntreTrocas',
        defaultValue: 'Acima de 3 anos',
        type: 'radio',
        label: 'Acima de 3 anos',
        className: 'radio-inline control-label',
      },
    ],
    responses: [
      {
        regex: '1 Ano',
        goto: 'veiculoDesejado',
      },
      {
        regex: '2 Anos',
        goto: 'veiculoDesejado',
      },
      {
        regex: '3 Anos',
        goto: 'veiculoDesejado',
      },
      {
        regex: 'Acima de 3 anos',
        goto: 'veiculoDesejado',
      },
    ],

    questionsToShow: [
      'qualSeuVeiculo',
      'aVistaOuFinanciado',
      'tempoMedioEntreTrocas'
    ]
  },

  {
    question: 'Qual o seu meio de locomoção preferido',
    id: 'meioDeLocomocaoPreferido',
    pngUrl: '/icones/ludicas/room-key_b.png',
    cycle: 'perguntasLudicas',
    style: {
      width: '33%',
      active: {
        width: '41.7%',
      },
    },
    form: [
      {
        type: 'radio',
        name: 'meioDeLocomocaoPreferido',
        label: 'Transporte Público',
        value: 'transportePublico',
        className: 'radio-inline control-label',
      },

      {
        type: 'radio',
        name: 'meioDeLocomocaoPreferido',
        label: 'Uber ou Táxi',
        value: 'uberOuTaxi',
        className: 'radio-inline control-label',
      },
    ],

    responses: [
      {
        regex: /transportePublico/mig,
        goto: 'veiculoDesejado',
      },
      {
        regex: /uberOuTaxi/mig,
        goto: 'quantoRodaPorDia',
      },
    ],
  },

  {
    question: 'Quanto você roda por dia ?',
    id: 'quantoRodaPorDia',
    pngUrl: '/icones/ludicas/gps-route_b.png',
    cycle: 'perguntasLudicas',
    style: {
      width: '16.7%',
      active: {
        width: '33%',
      },
    },
    form: [
      {
        type: 'radio',
        name: 'quantoRodaPorDia',
        label: 'Até 10 km',
        defaultValue: 'Até 10 km',
        className: 'radio-inline control-label',
      },

      {
        name: 'quantoRodaPorDia',
        defaultValue: 'Até 20 km',
        type: 'radio',
        label: 'Até 20 km',
        className: 'radio-inline control-label',
      },

      {
        name: 'quantoRodaPorDia',
        defaultValue: 'Até 30 km',
        type: 'radio',
        label: 'Até 30 km',
        className: 'radio-inline control-label',
      },

      {
        name: 'quantoRodaPorDia',
        defaultValue: 'Acima de 30 km',
        type: 'radio',
        label: 'Acima de 30 km',
        className: 'radio-inline control-label',
      },

      {
        name: 'quantoRodaPorDia',
        defaultValue: 'Não sei informar',
        type: 'radio',
        label: 'Não sei informar',
        className: 'radio-inline control-label',
      },
    ],

    responses: [
      {
        regex: 'Até 10 km',
        goto: 'veiculoDesejado',
      },
      {
        regex: 'Até 20 km',
        goto: 'veiculoDesejado',
      },
      {
        regex: 'Até 30 km',
        goto: 'veiculoDesejado',
      },
      {
        regex: 'Acima de 30 km',
        goto: 'veiculoDesejado',
      },
      {
        regex: 'Não sei informar',
        goto: 'veiculoDesejado',
      },
    ],
  },


  /**
   * Logicas
   */
  {
    question: 'Veículo desejado',
    id: 'veiculoDesejado',
    pngUrl: '/icones/ludicas/car-frontal-view_b.png',
    cycle: 'perguntasLogicasCarro',
    cycleIconClass: 'fa fa-car',
    component: 'VeiculoDesejado',
    goto: 'ofertaFinal',
    responses: [{ regex: /./, goto: 'ofertaFinal' }],
    style: {
      width: '50.5%%',
      active: {
        width: '50.5%%',
      },
    }
  },

  /**
   * Oferta Final
   */
  {
    question: 'Oferta Final',
    id: 'ofertaFinal',
    cycle: 'ofertaFinal',
    cycleIconClass: 'fa fa-usd',
    // pngUrl: '/icones/usuario_trabalho/usuario_trabalho_01_b.png',
    component: 'OfertaFinal',
    fullScreen: true,
    goto: 'dadosDoCliente',
    responses: [{ regex: /./, goto: 'dadosDoCliente' }],

  },

  /**
   * Lógicas Carro
   */
  {
    question: 'Dados do cliente',
    id: 'dadosDoCliente',
    pngUrl: '/icones/usuario/noun_574395_cc_01_b.png',
    cycle: 'perguntasLogicasOferta',
    cycleIconClass: 'fa fa-question',
    component: 'DadosDoCliente',
    goto: 'infosHabilitacao',
    responses: [{ regex: /./, goto: 'infosHabilitacao' }],
    questionsToShow: [
      'dadosDoCliente',
      'infosHabilitacao',
    ]
  },

  {
    question: 'Informações de habilitação',
    id: 'infosHabilitacao',
    cycle: 'perguntasLogicasOferta',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'Habilitacao',
    goto: 'infosResidencia',
    responses: [{ regex: /./, goto: 'infosResidencia' }],
    questionsToShow: [
      'dadosDoCliente',
      'infosHabilitacao',
      'infosResidencia',
    ]
  },

  {
    question: 'Informações de residência',
    id: 'infosResidencia',
    cycle: 'perguntasLogicasOferta',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'InfosResidencia',
    goto: 'infosContato',
    responses: [{ regex: /./, goto: 'infosContato' }],
    questionsToShow: [
      'dadosDoCliente',
      'infosHabilitacao',
      'infosResidencia',
      'infosContato',
    ]
  },

  {
    question: 'Informações para contato',
    id: 'infosContato',
    cycle: 'perguntasLogicasOferta',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'InfosContato',
    goto: 'atividadeProfissional',
    responses: [{ regex: /./, goto: 'atividadeProfissional' }],
    questionsToShow: [
      'dadosDoCliente',
      'infosHabilitacao',
      'infosResidencia',
      'infosContato',
      'infosProfissionais'
    ]
  },

  {
    question: 'Atividade Profissional',
    id: 'atividadeProfissional',
    cycle: 'perguntasLogicasOferta',
    pngUrl: '/icones/usuario_trabalho/usuario_trabalho_01_b.png',
    component: 'AtividadeProfissional',
    goto: 'infosProfissionais',
    responses: [{ regex: /./, goto: 'infosProfissionais' }],
  },

  {
    question: 'Informações profissionais',
    id: 'infosProfissionais',
    cycle: 'perguntasLogicasPessoais',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'InfosProfissionais',
    goto: 'adicionarCondutores',
    responses: [{ regex: /./, goto: 'adicionarCondutores' }],
    questionsToShow: [
      'dadosDoCliente',
      'infosHabilitacao',
      'infosResidencia',
      'infosContato',
      'infosProfissionais',
    ]
  },

  {
    question: 'Adicionar Condutores',
    id: 'adicionarCondutores',
    cycle: 'adicionarCondutores',
    cycleIconClass: 'fa fa-id-badge',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'AdicionarCondutores',
    fullScreen: true,
    goto: 'classificar',
    responses: [{ regex: /./, goto: 'classificar' }],
  },

  {
    question: 'Classificar',
    id: 'classificar',
    cycle: 'classificar',
    cycleIconClass: 'fa fa-share-alt',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'Classificar',
    goto: 'adicionarIndicacao',
    responses: [{ regex: /./, goto: 'adicionarIndicacao' }],
  },

  {
    question: 'Adicionar Indicações',
    id: 'adicionarIndicacao',
    cycle: 'adicionarIndicacao',
    pngUrl: '/icones/usuario/usuario_condutor_add_b_480.png',
    component: 'AdicionarIndicacao',
    goto: 'adicionarIndicacao',
    last: true, // TODO: ao chegar aqui, exibir botao `Vamos em frente ?`
    responses: [{ regex: /./, goto: '' }],
  },

  {
    question: 'Checkout',
    id: 'checkout',
    cycle: 'adicionarIndicacao',
    pngUrl: '/icones/usuario/usuario_condutor_add_b_480.png',
    component: 'Checkout',
    fullScreen: true,
    hideSteps: true,
    hideArguments: true,
    goto: 'checkout',
    responses: [{ regex: /./, goto: '' }],
  },

  {
    question: 'Feedback',
    id: 'feedback',
    cycle: 'feedback',
    cycleIconClass: 'fa fa-user',
    pngUrl: '/icones/usuario/noun_574395_cc_02_b.png',
    component: 'Feedback',
    fullScreen: true,
    hideSteps: true,
    hideArguments: true,
    goto: 'infosResidencia',
    responses: [{ regex: /./, goto: '' }],
  },
];
