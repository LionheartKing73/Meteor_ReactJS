Feature: Tela de perguntas lúdicas

  Eu como corretor
  Quero acessar o questionário lúdico do Carro Fácil
  Para iniciar a venda do produto Carro Fácil

Background:
  Given Eu corretor estou na tela de perfil resumido do cliente

Scenario: Carregamento das perguntas da tela de questionário lúdico
  When eu clicar no botão Iniciar Cotação
  And o cliente tiver propensão para comprar o Carro Fácil
  Then será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes perguntas na tela: "Você tem veículo ?"