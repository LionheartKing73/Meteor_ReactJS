Feature: Carregamento da tela de seleção de veículo

  Eu como corretor
  Quero acessar a tela de seleção do veículo desejado pelo cliente
  Para obter o preço do serviço e realizar a venda do produto Carro Fácil

  Scenario: Carregamento da tela de seleção de veículo
    Given estou na tela do questionário lúdico do Carro Fácil
    When eu responder corretamente à todas as perguntas presentes na tela
    Then será exibida a tela para seleção do veículo contendo os seguintes elementos: Bloco “Veículo desejado”, que deve conter:
    And Botões com as logomarcas dos fabricantes disponíveis
    And Combo box “Modelo” que deve carregar todos os modelos de acordo com o fabricante escolhido
    And Botão “Seguir” que avança para a tela de “Oferta Final”
