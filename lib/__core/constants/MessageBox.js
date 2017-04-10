import MessageBox from 'message-box';

global.MessageBox = MessageBox;

global.ErrorMsgs = {};
// TODO: lidar com _payload:{${JSON.stringify(PAYLOAD)}}`

ErrorMsgs.formatoInvalido = 'invalid_format';
ErrorMsgs.naoPermitido = 'no_auth';
ErrorMsgs.notFound = 'not_found';
ErrorMsgs.userNotFound = 'user_not_found';
ErrorMsgs.opTypeNotFound = 'op_type_not_found';
ErrorMsgs.parentsNotFound = 'parents_not_found';
ErrorMsgs.contratosNotFound = 'contratos_not_found';
ErrorMsgs.cadastranteNotFound = 'cadastrante_not_found';
ErrorMsgs.methodNotImplemented = 'method_not_implemented';
ErrorMsgs.methodsemRetorno = 'method_return_not_implemented';
ErrorMsgs.areaSemContorno = 'area_sem_contorno';
ErrorMsgs.APIError = 'api_error';
ErrorMsgs.TISJaExiste = 'tis_exists';
ErrorMsgs.userWithoutFacebook = 'user_facebook_not_exists';

ErrorMsgs.SchemaError = {
  notFount: 'schema_not_found',
  messageBox: 'schema_message_box_not_found',
};

ErrorMsgs.MessageBox = {
  invalid: '{{label}} inválido',
  required: '{{label}} - Campo obrigatório',
  minString: '{{label}} deve ter no mínimo {{min}} caractere(s)',
  maxString: '{{label}} não pode ter mais do que {{max}} caracteres',
  minNumber: '{{label}} deve ser ao menos {{min}}',
  maxNumber: '{{label}} não pode ser maior do que {{max}}',
  minNumberExclusive: '{{label}} deve ser maior que {{min}}',
  maxNumberExclusive: '{{label}} deve ser menor que {{max}}',
  minDate: '{{label}} deve ser igual a ou antes de {{min}}',
  maxDate: '{{label}} não pode ser depois de {{max}}',
  badDate: '{{label}} não é uma data válida',
  minCount: 'Você deve especificar no mínimo {{minCount}} valores',
  maxCount: 'Você não pode especificar mais do que {{maxCount}} valores',
  noDecimal: '{{label}} deve ser um número inteiro',
  notAllowed: '{{value}} não é um valor permitido',
  expectedString: '{{label}} deve ser uma string',
  expectedNumber: '{{label}} deve ser um número',
  expectedBoolean: '{{label}} deve ser um boolean',
  expectedArray: '{{label}} deve ser um array',
  expectedObject: '{{label}} deve ser um objeto',
  expectedConstructor: '{{label}} deve ser um(a) {{type}}',
  keyNotInSchema: '{{key}} - Campo não permitido',
  regEx: {
    0: {
      msg: '{{label}} falhou no teste de expressão regular',
    },
    1: {
      exp: 'SimpleSchema.RegEx.Email',
      msg: '{{label}} deve ser um endereço de email válido',
    },
    2: {
      exp: 'SimpleSchema.RegEx.WeakEmail',
      msg: '{{label}} deve ser um endereço de email válido',
    },
    3: {
      exp: 'SimpleSchema.RegEx.Domain',
      msg: '{{label}} deve ser um domínio válido',
    },
    4: {
      exp: 'SimpleSchema.RegEx.WeakDomain',
      msg: '{{label}} deve ser um domínio válido',
    },
    5: {
      exp: 'SimpleSchema.RegEx.IP',
      msg: '{{label}} deve ser um endereço IPv4 ou IPv6 válido',
    },
    6: {
      exp: 'SimpleSchema.RegEx.IPv4',
      msg: '{{label}} deve ser um endereço IPv4 válido',
    },
    7: {
      exp: 'SimpleSchema.RegEx.IPv6',
      msg: '{{label}} deve ser um endereço IPv6 válido',
    },
    8: {
      exp: 'SimpleSchema.RegEx.Url',
      msg: '{{label}} deve ser uma URL válida',
    },
    9: {
      exp: 'SimpleSchema.RegEx.Id',
      msg: '{{label}} deve ser um ID alfanumérico válido',
    },
  },
};
