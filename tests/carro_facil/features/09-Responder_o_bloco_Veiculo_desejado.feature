Feature: Responder o bloco “Veículo desejado”

  Eu como corretor
  Quero responder ao bloco “Veículo desejado”
  Para obter o preço do serviço e realizar a venda do produto Carro Fácil

  Scenario: Carregamento dos modelos disponíveis do fabricante escolhido
    Given estou na tela de seleção de veículo do Carro Fácil
    When eu selecionar o fabricante desejado pelo cliente
    Then o combo box “Modelo” presente na tela será carregado com todas as opções de veículo parametrizadas para aquele fabricante

  Scenario: Campo “Modelo” sem nenhuma opção selecionada
    Given estou na tela de seleção de veículo do Carro Fácil
    When eu selecionar o fabricante desejado pelo cliente
    And forem carregadas as opções de veículos disponíveis para aquele fabricante
    And eu não selecionar nenhuma opção de modelo
    And clicar no botão “Seguir”
    Then deverá ser exibida a mensagem “O campo Modelo é obrigatório
    And o campo “Modelo” deve ficar destacado em vermelho
