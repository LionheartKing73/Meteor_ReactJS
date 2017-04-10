Feature: Responder a pergunta “Quanto você roda por dia?”

  Eu como corretor
  Quero responder a pergunta “Quanto você roda por dia?” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Tratamento da resposta "Até 10 KM" para a pergunta “Quanto você roda por dia?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Quanto você roda por dia?”
    And a resposta for “Até 10 KM”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.

  Scenario: Tratamento da resposta "Até 20 KM" para a pergunta “Quanto você roda por dia?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Quanto você roda por dia?”
    And a resposta for “Até 20 KM”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.

  Scenario: Tratamento da resposta "Até 30 KM" para a pergunta “Quanto você roda por dia?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Quanto você roda por dia?”
    And a resposta for “Até 30 KM”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.

  Scenario: Tratamento da resposta "Acima de 30 KM" para a pergunta “Quanto você roda por dia?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Quanto você roda por dia?”
    And a resposta for “Acima de 30 KM”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.

  Scenario: Tratamento da resposta "Não sei informar" para a pergunta “Quanto você roda por dia?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Quanto você roda por dia?”
    And a resposta for “Não sei informar”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.
