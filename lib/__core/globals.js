import { createContainer as _createContainer } from 'meteor/react-meteor-data';

global.GLOBAL = {
  createContainer: _createContainer,

  products: ['carro-facil', 'seguro-auto', 'alarme-mais'],

  phases: ['Novo Negócio', 'Negociação', 'Proposta', 'Transmitida', 'Emitida', 'Recusa'],

  custOrigin: ['face', 'link', 'goog', 'clou', 'sky', 'soci'],

  initPhaseQuot: 'Novo Negócio',
  initStatusQuot: 'Primeiro contato',

  UFs: [{ value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' }],

  swalConfirmOptions: {
    title: 'Confirma a deleção?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim!',
    cancelButtonText: 'Não'
  },

  partialMessageSize: 84,

  httpErrorMsgs: {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported'
  },

  customHttpErrorMsgs: {
    // Default HTTP Errors
    'ECONNREFUSED': 'Conexão recusada.',
    'ETIMEDOUT': 'Limite de tempo expirado.',
    'ECONNRESET': 'Conteúdo resetado.',
    'ENETUNREACH': 'Serviço indisponível.',

    // Custom HTTP Errors
    'EUPLOAD': 'Error uploading file.',
    'ERENAMEDB': 'Error in handle for renaming database/collection.'
  },

  mapCustOrigCode: {
    face: 'Facebook',
    link:	'Linkedin',
    goog:	'Google',
    clou:	'iCloud',
    sky:	'Skype',
    soci:	'Pessoal',
    ext:	'Externo',
  },

  mapProdNames: {
    'alarme-mais': 'Alarme Mais',
    'seguro-auto': 'Seguro Auto',
    'carro-facil': 'Carro Fácil',
    "conecta":	'Conecta',
  },

  images: {
    mapProductIcons: {
      'seguro-auto': 'fa fa-credit-card-alt',
      'carro-facil': 'fa fa-car',
      'alarme-mais': 'fa fa-bell-o',
      "conecta": 'fa fa-mobile',
    },

    mapProductImages: {
      'alarme-mais': '/icons/alarme_monitoramento_b.png',
      'seguro-auto': '/icons/auto_b.png',
      'carro-facil': '/icons/carro_facil_b.png',
      "conecta":	'/icons/conecta_b.png',
    },
  },

  activities: {
    lblHeaderActivities: 'Atividades do dia',
    btnClickLead: 'Click lead',

    lblColTitleProduct: 'Produto',
    lblColTitleName: 'Nome',
    lblColTitlePhase: 'Fase',
    lblColTitleSource: 'Origem',
    lblColTitleContactTime: 'Tempo para contato',

    urlRecomendLeadUnlock: `${process.env.RECOMMENDATION_ENGINE_API_URL}/customers/{customer_id}/unlock`,
    urlRecomendClickLead: `${process.env.RECOMMENDATION_ENGINE_API_URL}/recommendations/3/click-lead`,

    mongoTimeInitExpire: 60,
    expireMinutes: [1, 15, 30, 45, 60]
  },

  customers: {
    urlServiceMLTopCustomers: `${process.env.RECOMMENDATION_ENGINE_API_URL}/recommendations/{customerId}/top-customers/{productName}`
  },

  communications: {
    lblHeaderCommunications: 'Comunicações',
  },

  gameficication: {
    lblHeaderSuperProtector: 'Super protetor',
    lblNextGoal: 'Atinja sua próxima meta!',
  },

  prodAdmin: {
    lblName: 'Nome',
    lblSystName: 'Nome de Sistema',
    lblDesc: 'Descrição',
    lblBenef: 'Benefícios',
    lblServices: 'Serviços',
    lblActualGoal: 'Objetivo atual',
    lblMonthlyGoal: 'Objetivo mensal',
    lblStartDate: 'Início da Vigência',
    lblEndDate: 'Término da Vigência',

    btnEditRow: 'Editar',
    btnRemoveRow: 'Remover',

    btnUpdate: 'Atualizar',
    btnCancel: 'Cancelar',
    btnSubmit: 'Cadastrar',
  },

  quotations: {
    lblHeaderProduct: 'Produto',
    lblColTitleName: 'Nome',
    lblColTitleSource: 'Origem',
    lblColTitleAquiredProds: 'Produtos já adquiridos',
  },

  uploads: {
    lblHeaderUpload: 'Upload',
  },

};
