function validateCPF( CPF ) {
  // remove pontos e traços
  CPF = CPF.toString();
  CPF = CPF.replace(/[^0-9]/g, ''); // remove o que não é dígito com regex

  // verificar se possui 11 dígitos, o total padrão de um CPF
  if ( CPF.length != 11 ) {
    return false; // já nã será válido
  }

  // pegando os 9 dígitos
  let codigo = CPF.substr(0, 9);

  // fazendo o cálculo para gerar o primeiro dígito
  let soma = 0; // será a soma
  let numero_calculo = 10; // começa com 10 no primeiro dígito
  for (let i=0; i < 9; i++) {
    soma += ( codigo[i]*numero_calculo-- );
  }
  let $resto = soma%11; // trabalhar com o resto
  if($resto < 2)
    codigo += "0"; // se for menor que 2 será 0
  else
    codigo += (11-$resto); // caso seja maior que 2 sera subtraído em 11

  // fazendo o cálculo para gerar o segundo dígito
  soma = 0; // zerar a soma
  numero_calculo = 11; // desta vez é 11, para o segundo dígito
  for (let i=0; i < 10; i++) {
    soma += ( codigo[i]*numero_calculo-- );
  }
  $resto = soma%11; // trabalhar com o resto novamente
  if($resto < 2)  // verifica se é maior que 2
    codigo += "0";
  else
    codigo += (11-$resto);

  // Se forem iguais é porque é válido
  if ( codigo === CPF ) {
    return true; // cpd válido!
  } else {
    return false; // cpf inválido!
  }
}


export default function schemaValidateCPF() {
  const value = this.value;
  const tipoPessoaField = this.field('tipoPessoa');

  if(tipoPessoaField && tipoPessoaField.values === 'pj') {
    return true;
  }

  if(!validateCPF(value)) return 'invalid';
}

global.validateCPF = validateCPF;
