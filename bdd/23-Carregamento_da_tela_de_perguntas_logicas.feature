Feature: Carregamento da tela de perguntas lógicas

  Eu como corretor
  Quero acessar a tela de perguntas lógicas do Carro Fácil
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Carregar página de Perguntas Lógicas
Given cliquei no botão “Vamos em frente?” na tela Oferta Final do Carro Fácil
When prosseguir para a página de Perguntas Lógicas do Carro Fácil
Then os seguintes blocos devem ser carregados:
“Dados do cliente”
"Informações de habilitação”
“Informações da residência”
“Informações para contato”
“Informações profissionais”
And as argumentações do produto devem ser apresentadas do lado direito da tela
