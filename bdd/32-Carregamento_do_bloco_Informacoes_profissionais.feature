Feature: Carregamento do bloco “Informações profissionais”

  Eu como corretor
  Quero acessar o bloco “Informações profissionais”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seguir do bloco “Informações para contato” para o bloco “Informações profissionais”
Given finalizei o preenchimento de todos os campos do bloco “Informações para contato” da página de perguntas lógicas do Carro Fácil sem nenhum erro de validação
When eu clicar no botão Seguir
Then o bloco “Informações para contato” deve fechar e o bloco “Informações profissionais” deve abrir

Scenario: Carregar campos do bloco “Informações Profissionais”
Given estou na tela de Perguntas Lógicas do Carro Fácil
When o bloco "Informações Profissionais" abrir
Then os seguintes campos devem ser apresentados:
“Profissão”
“Empresa”
“Telefone Comercial”
“Ramal”
“CEP”
“Logradouro”
“Número”
“Complemento”
“Bairro”
“Cidade”
“UF”
“Salário Bruto”
“Outras Rendas”
And o botão “Seguir” deve ser apresentado
